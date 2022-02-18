import * as functions from "firebase-functions";
import { MAX_TIMEOUT_SECONDS } from "firebase-functions";
import app from "./app";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const nft = functions
  .runWith({ memory: "4GB", timeoutSeconds: MAX_TIMEOUT_SECONDS })
  .https.onRequest(app);
