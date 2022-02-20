import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import screenshot from "./screenshot";
import video from "./video";
import upload from "./upload";
import * as pupp from "puppeteer";

const browserPromise = pupp.launch({ args: ["--no-sandbox"] });

const puppeteer: express.RequestHandler = async (req, res, next) => {
  const browser = await browserPromise;
  res.locals.browser = await browser.createIncognitoBrowserContext();
  next();
};

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.all("*", puppeteer);
app.use("/screenshot", screenshot);
app.use("/video", video);
app.use("/upload", upload);

export default app;
