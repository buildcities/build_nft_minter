import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { basename } from "path";
import { ConfigType, generateAndUploadNFTData } from "./utils.js";
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const generateNFTs = functions.storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    if (filePath && basename(filePath) == "config.json") {
      const bucket = admin.storage().bucket(object.bucket);
      const configContent = JSON.parse((await bucket.file(filePath).download()).toString());
      const config = configContent as unknown as ConfigType;
      return generateAndUploadNFTData({ config, bucket, filePath });
    }
    return //functions.logger.log("file path does not exist");
  });
