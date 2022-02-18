import { Router } from "express";
import * as functions from "firebase-functions";
import * as fs from "fs";
import { promisify } from "util";
import * as rimraf from "rimraf";

import { BrowserContext } from "puppeteer";
import { passportUrls } from "./presets";

import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
import { uploadToStorage } from "./utils";
const deleteFiles = promisify(rimraf);
const getFile = promisify(fs.readFile);
/* const fileName = "./temp/video.mp4"; */
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
        const browser = res.locals.browser as BrowserContext;
        const fileName = `./temp/${req.params.type}.mp4`;
        const page = await browser.newPage();
        page.setDefaultTimeout(0);
        await page.goto(url);
        await page.waitForTimeout(25000);
        const recorder = new PuppeteerScreenRecorder(page);
        await recorder.start(fileName);
        await page.waitForTimeout(20000);
        await recorder.stop();
        //const stream = fs.createReadStream(fileName);
        const file = await getFile(fileName);
        const { data } = await uploadToStorage(
          file,
          `video/${req.params.type}.mp4`
        );
        await deleteFiles(fileName);
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
