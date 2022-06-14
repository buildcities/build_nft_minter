import * as utility from "../utils";
import { readFileSync } from "fs";
//const sharp = require("sharp");

//jest.mock("sharp");

let data: utility.ConfigType;

describe("utility functions ", () => {
  beforeAll(() => {
    const buffer = readFileSync("./src/config.json");
    data = JSON.parse(buffer as any);
  });
  describe("generateUniqueDNA", () => {
    test("with an empty argument should throw error", () => {
      expect(() => {
        utility.generateUniqueDNA({ traits: [] }, "1");
      }).toThrow("empty traits not allowed in config argument!");
    });

    test("should return an object with combined traits", () => {
      const actual = utility.generateUniqueDNA(data, "1");
      expect(Object.keys(actual).length).toEqual(9);
    });
  });

  //   describe("generateNFTImage", () => {
  //     test("returns an image composed from DNA", () => {
  //       expect(sharp.mock).toBeTruthy();
  //       //const actual = utility.generateImage(data);

  //       //expect(actual)
  //     });
  //   });

  //   describe("getImageFileName", () => {
  //     test("returns image filename with proper extension", () => {
  //     const actual = utility.get
  //       expect(sharp.mock).toBeTruthy();
  //       //const actual = utility.generateImage(data);

  //       //expect(actual)
  //     });
  //   });

  describe("prepareMetaData", () => {
    test("returns a properly formed metadata compatible with opensea standards", () => {
      const DNA = utility.generateUniqueDNA(data, "1") as any;
      const actual = utility.prepareMetaData({ DNA, ...data });
      console.log(actual);
      expect(actual).toHaveProperty("name");
      expect(actual).toHaveProperty("description");
      expect(actual).toHaveProperty("image");
      expect(actual).toHaveProperty("external_url");
      expect(actual).toHaveProperty("attributes");
      expect(actual).toHaveProperty("tokenId");
      expect(actual.attributes).toBeInstanceOf(Array);
      expect(actual?.attributes?.length).toEqual(9);
    });
  });
});
