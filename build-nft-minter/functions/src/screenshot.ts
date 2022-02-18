import { Router } from "express";
import * as functions from "firebase-functions";
import { BrowserContext } from "puppeteer";
import { passportUrls } from "./presets";
const router = Router();

router.get("/:type", async (req, res) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  const url = passportUrls[req.params.type] || "unknown";
  switch (url) {
    case "unknown":
      res.send("Invalid request parameter");
      break;
    default:
      const browser = res.locals.browser as BrowserContext;
      const page = await browser.newPage();
      await page.goto(url,{timeout:0})
      //const canvas = await page.$$eval('canvas', (canvas) => canvas);
      //functions.logger.info(canvas, { structuredData: true });
      await page.waitForTimeout(20000)
      const image = await page.screenshot()
      res.setHeader("Content-Type",'image/png')
      res.send(image);
      browser.close()
  }
  
});
export default router