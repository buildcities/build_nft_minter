import { Router } from "express";
import * as functions from "firebase-functions";
//import { debug } from "firebase-functions/logger";
import { BrowserContext } from "puppeteer";
import { passportUrls } from "./presets";
import * as utils from './utils'
const router = Router();

router.get("/:type", async (req, res) => {
  functions.logger.info("logging info", { structuredData: true });
  const url = passportUrls[req.params.type] || "unknown";
  switch (url) {
    case "unknown":
      res.send("Invalid request parameter");
      break;
    default:
      const browser = res.locals.browser as BrowserContext;
      const page = await browser.newPage();
      page.setDefaultTimeout(0);
      await page.goto(url);
      await page.waitForTimeout(25000);

      const client = await page.target().createCDPSession();
      await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: "/videos",
      });

      const canvas = await page.$("canvas");
      const stream = await canvas?.evaluateHandle((c) => c.captureStream());
      const recorder = await stream?.evaluateHandle((stream) => {
        return new MediaRecorder(stream, { mimeType: "video/webm" });
      });
      const result = await recorder?.evaluateHandle((recorder) => {
        return new Promise((resolve, reject) => {
          const data = [] as any[];
          recorder.ondataavailable = function (event: any) {
            if (event.data && event.data.size) {
              data.push(event.data);
            }
          };
          recorder.onstop = async () => {
            //console.log(data.length);
            const url = URL.createObjectURL(
              new Blob(data, { type: "video/webm" })
            ); 
            resolve(url || false);
          };
          recorder.onerror = reject;

          setTimeout(() => {
            recorder.stop();
          }, 5000);
          recorder.start();
        });
      });

      functions.logger.info(result, { structuredData: true });
      
      await page.waitForFunction(async(utils:any)=>{
        return await utils.uploadToStorage('hello bambi','myVid.txt')
        
      },{},utils as any)
     

      const image = await page.screenshot();
      res.setHeader("Content-Type", "image/png");
      
      res.send(image);
      browser.close();
  }
});
export default router;
