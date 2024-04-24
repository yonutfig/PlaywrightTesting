const { test, expect } = require("@playwright/test");
const fs = require("fs");

test("locateTheTitles", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/");

  await page.waitForSelector("//span[@class='titleline']/a");
  const titles = await page.$$("//span[@class='titleline']/a");

  const createCsvFile = fs.createWriteStream("TitlesandURL.csv");
  createCsvFile.write("Title,Url\n");
  for (let i = 0; i < titles.length && i < 10; i++) {
    const titleName = await titles[i].innerText();

    const URL = await titles[i].getAttribute("href");

    createCsvFile.write(`${titleName}, ${URL}\n`);
    console.log(titleName);
    console.log(URL);
  }
  createCsvFile.end();
});
