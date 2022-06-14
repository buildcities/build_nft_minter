import { Chance } from "chance";
import {
  capitalize,
  groupBy,
  range,
  values,
} from "lodash";
import * as sharp from "sharp";
import { Bucket } from "@google-cloud/storage";
import { Readable } from "node:stream";
import { dirname, join, basename } from "path";


const UPLOAD_PATH = "upload";
const COLLECTION_SIZE = 100;

const chance = new Chance();

export type ConfigType = {
  name?: string;
  size?: number;
  description?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  traits: {
    trait: string;
    rarity: number;
    id: string;
    name: string;
    group: string;
  }[];
};

export type DNAType = {
  tokenId?: string;
};

export type MetaDataInputType = {
  DNA: Record<string, string>;
  name?: string;
  description?: string;
  format?: string;
  callback?: (data: any) => void;
};

export type MetatDataResultType = {
  name?: string;
  description?: string;
  attributes?: { trait_type: string; value: string }[];
  tokenId?: string;
  image?: string;
  external_url?: string;
};

const prepareAttributes = (DNA: Record<string, string>) => {
  return Object.keys(DNA).map((item) => ({
    trait_type: capitalize(item),
    value: capitalize(DNA[item]),
  }));
};

export const generateUniqueDNA = (config: ConfigType, tokenId: string) => {
  if (!config?.traits?.length) {
    throw new Error("empty traits not allowed in config argument!");
  }

  const layers = groupBy(config.traits, "group");
  return values(layers).reduce(
    (prev, item) => {
      const weights = item.map((item) => item.rarity);
      const trait = chance.weighted(item, weights);
      return { ...prev, ...{ [trait.group]: trait.trait } };
    },
    { tokenId }
  );
};

/* const getImageFileName = (fileName: string, isSvg = false) => {
  return `${fileName}.${isSvg ? "svg" : "png"}`;
}; */

export const downloadAllFilesFromCloud = async (
  bucket: Bucket,
  prefix: string = ""
) => {
  const allFiles = await bucket.getFiles({ prefix, autoPaginate: false });
  return Promise.all(
    allFiles[0].map(async (file) => {
      const buffer = await file.download();
      return { [basename(file.name)]: buffer as unknown as Buffer };
    })
  );
};

export const uploadFileToCloud = ({
  fileName,
  bucket,
  content,
}: {
  fileName: string;
  bucket: Bucket;
  content: Buffer | string;
}) => {
  //console.log(fileName)
  return bucket.file(fileName).save(content);
};

export const generateImage = (
  sources: { input: Buffer }[],
  sharpStream: sharp.Sharp,
  width?: number) => {
  const _sources = sources.map((source) => {
    return { ...source };
  });
  return sharpStream.clone().composite(_sources).resize(width).png().toBuffer();
};

//  width: number = 2048,
//  height: number = 2048
export const prepareMetaData = ({
  DNA,
  name,
  description,
  format,
}: MetaDataInputType): MetatDataResultType => {
  const attributes = prepareAttributes(DNA);
  let metaData;
  switch (format) {
    default:
      metaData = {
        name,
        description,
        attributes,
        tokenId: DNA.tokenId,
        image: undefined,
        external_url: undefined,
      };
  }

  return metaData;
};

export const generateMetaData = ({
  DNA,
  name,
  description,
  format,
  callback,
}: MetaDataInputType) => {
  const metaData = prepareMetaData({ DNA, description, name, format });

  return Readable.from(JSON.stringify(metaData)).on("data", (data) => {
    callback && callback(data);
  });
};

export const generateAndUploadNFTData = async ({
  config,
  bucket,
  filePath,
}: {
  config: ConfigType;
  bucket: Bucket;
  filePath: string;
  isUnique?: boolean;
}): Promise<MetatDataResultType[]> => {
  const size = config.size || COLLECTION_SIZE;
  const folderPath = dirname(filePath);
  const allMetaData: MetatDataResultType[] = [];
  range(1, size + 1).forEach(async (index) => {
    const tokenId = index.toString();
    const DNA = generateUniqueDNA(config, tokenId.toString()) as Record<
      string,
      string
    >;
    const nftMetaData = prepareMetaData({ DNA, ...config });

    allMetaData.push(nftMetaData);
  });

  await uploadFileToCloud({
    fileName: join(folderPath, UPLOAD_PATH, `data.json`),
    bucket,
    content: JSON.stringify(allMetaData),
  });

  return allMetaData;
};

/* export const generateNFTAssets = async ({
  config,
  bucket,
  filePath,
}: {
  config: ConfigType;
  bucket: Bucket;
  filePath: string;
  isUnique?: boolean;
}) => {
  const width = config.width || DEFAULT_IMG_SIZE;
  const height = config.height || DEFAULT_IMG_SIZE;
  const size = config.size || COLLECTION_SIZE;
  const allMetaData: MetatDataResultType[] = [];
  const folderPath = dirname(filePath);
  const allContentUploads: any[] = [];
  // create a sharp  instance for streaming image transformation
  const sharpStream = sharp({
    create: {
      width,
      height,
      channels: 4,
      //background: hexRgb.default(config?.backgroundColor || DEFAULT_BGRD_COLOR),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  // console.log(folderPath);
  // download all image layers from gcp cloud storage
  const allFiles = (await downloadAllFilesFromCloud(bucket, folderPath)).reduce(
    (prev, curr) => {
      return { ...prev, ...curr };
    },
    {}
  );
  //console.log(allFiles);
  // generate and save NFT assets
  range(1, size + 1).forEach(async (index) => {
    const tokenId = index.toString();
    const DNA = generateUniqueDNA(config, tokenId.toString()) as Record<
      string,
      string
    >;

    const imageSources = compact(
      Object.values(omit(DNA, ["tokenId"])).map((item) => {
        const key = find(config.traits, (t) => t.trait === item);
        if (key) {
          return {
            input: allFiles[key?.name][0] as any,
          };
        }
        return;
      })
    );

    //console.log(imageSources[0]);
    // generate and upload images
    const nftImage = await generateImage(
      imageSources,
      sharpStream,
      width,
      height
    );

    const nftMetaData = prepareMetaData({ DNA, ...config });

    console.log(nftMetaData);

    allMetaData.push(nftMetaData);

    const nftContent = Promise.all([
      await uploadFileToCloud({
        fileName: join(folderPath, UPLOAD_PATH, `${tokenId}.png`),
        bucket,
        content: nftImage,
      }),

      // uploadFileToCloud({
      //   fileName: join(folderPath, UPLOAD_PATH, `${tokenId}.json`),
      //   bucket,
      //   content: JSON.stringify(nftMetaData),
      // }),
    ]);

    allContentUploads.push(nftContent);
  });
  console.log(allMetaData);
  //upload the whole metadata file
  // allContentUploads.push(
  //   uploadFileToCloud({
  //     fileName: join(folderPath, UPLOAD_PATH, `metadata.json`),
  //     bucket,
  //     content: JSON.stringify(allMetaData),
  //   })
  // );
  return Promise.all(allContentUploads);
}; */
