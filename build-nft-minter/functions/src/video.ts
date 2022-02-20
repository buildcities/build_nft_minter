import { Router } from "express";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as mkdirp from "mkdirp";

import { BrowserContext } from "puppeteer";
import { passportUrls } from "./presets";

import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
import { uploadToStorage } from "./utils";
/* const fileName = "./temp/video.mp4"; */
const router = Router();
const PRE_START_WAIT_TIME = 25000;

router.get("/:type/:duration", async (req, res) => {
  functions.logger.info("logging info", { structuredData: true });
  const url = passportUrls[req.params.type] || "unknown";
  //const uploadStream = new PassThrough()
  //const duration = +req.params.duration || 0.5;
  //const record_time = duration * 60000;
  switch (url) {
    case "unknown":
      res.send("Invalid request parameter");
      break;
    default:
      try {
        const browser = res.locals.browser as BrowserContext;
        const filePath = `${req.params.type}.mp4`;
        const tempLocalFile = path.join(os.tmpdir(), filePath);
        const tempLocalDir = path.dirname(tempLocalFile);

        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url, { timeout: 0 });
        await page.waitForTimeout(PRE_START_WAIT_TIME);
        const recorder = new PuppeteerScreenRecorder(page);
        //create temp file directory
        await mkdirp(tempLocalDir);
        //begin recording and save to tempfile
        await recorder.start(tempLocalFile);
        await page.waitForTimeout(60000);
        await recorder.stop();
        //upload recorded file to cloud storage
        //const file = await getFile(fileName);
        const { data } = await uploadToStorage(
          tempLocalFile,
          `video/${req.params.type}.mp4`
        );
        // delete temp files
        await fs.unlinkSync(tempLocalFile);
        // return a message to browser
        res.setHeader("Content-Type", "text/plain");
        res.send(`Video uploaded here :${data?.publicURL}`);
        browser.close();
      } catch (err) {
        res.writeHead(501, { "Content-Type": "text/plain" });
        res.end(err);
      }
  }
});
export default router;
