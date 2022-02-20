import { Router } from "express";
import * as functions from "firebase-functions";
import { BrowserContext } from "puppeteer";
import { passportUrls } from "./presets";
import { uploadToStorage } from "./utils";
//import * as rimraf from "rimraf";
const PRE_START_WAIT_TIME = 25000;
//const deleteFiles = promisify(rimraf);
const router = Router();

router.get("/:type", async (req, res) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  const url = passportUrls[req.params.type] || "unknown";
  switch (url) {
    case "unknown":
      res.send("Invalid request parameter");
      break;
    default:
      //const fileName = `./temp/${req.params.type}.png`;
      const browser = res.locals.browser as BrowserContext;
      const page = await browser.newPage();
      await page.goto(url, { timeout: 0 });
      await page.waitForTimeout(PRE_START_WAIT_TIME);
      const image = await page.screenshot();
      //const file = await getFile(fileName);
      await uploadToStorage(image, `image/${req.params.type}.png`, "image/png");
      res.setHeader("Content-Type", "image/png");
      res.send(image);
      browser.close();
  }
});
export default router;
