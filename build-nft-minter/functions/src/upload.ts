import { Router } from "express";
import * as functions from "firebase-functions";
import * as fs from "fs";

import { passportUrls } from "./presets";
import { uploadToStorage } from "./utils";
const fileName = "temp/video.mp4";
const router = Router();

router.get("/:type", async (req, res) => {
  functions.logger.info("logging info", { structuredData: true });
  const url = passportUrls[req.params.type] || "unknown";
  //const uploadStream = new PassThrough()

  switch (url) {
    case "unknown":
      res.send("Invalid request parameter");
      break;
    default:
      try {
        const file = fs.readFileSync(fileName);
        if (file) {
          const url = await uploadToStorage(file, "video-master.mp4");
          res.send(`uploaded here: ${url.publicURL}`);
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(err);
      }
  }
});
export default router;
