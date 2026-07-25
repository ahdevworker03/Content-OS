const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "template.hbs");
const dataPath = path.join(__dirname, "summer-building-foundations.json");
const outputPath = path.join(__dirname, "index.html");

const templateSource = fs.readFileSync(templatePath, "utf-8");
const raw = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const shared = {
  USERNAME: raw.USERNAME,
  FOOTER_NAME: raw.FOOTER_NAME,
  FOOTER_HANDLE: raw.FOOTER_HANDLE,
  SWIPE: raw.SWIPE,
};

raw.SLIDES = raw.SLIDES.map(function (slide) {
  return Object.assign({}, shared, slide);
});

const data = {
  PAGE_TITLE: raw.PAGE_TITLE,
  LANG: raw.LANG,
  DIRECTION: raw.DIRECTION,
  DIRECTION_RTL: raw.DIRECTION_RTL,
  SLIDES: raw.SLIDES,
};

const template = Handlebars.compile(templateSource);
const html = template(data);

fs.writeFileSync(outputPath, html, "utf-8");
console.log("✅ index.html populated successfully");
