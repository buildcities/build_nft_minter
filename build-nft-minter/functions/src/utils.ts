import { createClient } from "@supabase/supabase-js";
/* const getPixels		= require('get-pixels');
const fs			= require('fs'); */
const URL = "https://jgpuhcbadrjfzjrtnkgc.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQwNjk1ODM2LCJleHAiOjE5NTYyNzE4MzZ9.5Rapm_9D-Dye3cT40Fq7PAyQxmK1yl8L75fYtdNmut8";
const BUCKET_NAME = "nft";
const storage = createClient(URL, KEY).storage;
//const encoder = new GIFencoder()
export const uploadToStorage = async (
  fileBody:
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | Buffer
    | File
    | FormData
    | ReadableStream
    | ReadableStream
    | URLSearchParams
    | string,
  filename: string,
  contentType: string = "video/mp4"
) => {
  return storage
    .from(BUCKET_NAME)
    .list()
    .then((res) => {
      const exists = res?.data?.find((item) => item.name === filename);
      if (exists) {
        return storage
          .from(BUCKET_NAME)
          .update(filename, fileBody, { contentType });
      } else {
        return storage
          .from(BUCKET_NAME)
          .upload(filename, fileBody, { contentType });
      }
    })
    .then(() => storage.from(BUCKET_NAME).getPublicUrl(filename))
    .catch((e) => {
      throw e;
    });
};

/* function addToGif(images, counter = 0) {
	getPixels(images[counter], (err, pixels) => {
		encoder.addFrame(pixels.data);
		encoder.read();

		if (counter === images.length - 1) {
			encoder.finish();
			cleanUp(images, err => {
				if (err) console.log(err);
				else {
					fs.rmdirSync(workDir);
					process.exit(0);
				}
			});
			console.log(`${fn}.gif created`);
		}
		else addToGif(images, ++counter);
	});
}; */
