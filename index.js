// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require("fs");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/");
  await page.waitForSelector("//span[@class='titleline']/a");
  const titles = await page.$$("//span[@class='titleline']/a");
  // Create a CSV file
  const createCSVFile = fs.createWriteStream("TitlesAndUrl.csv");
  createCSVFile.write("Titles, URLs \n");

  for (let i = 0; i < titles.length && i < 10; i++) {
    const forTitle = titles[i];
    const titlesName = await forTitle.innerText();
    const URL = await forTitle.getAttribute("href");

    createCSVFile.write(`${titlesName}, ${URL} \n`);
    console.log(titlesName);
    console.log(URL);
  }
  createCSVFile.end();
  await browser.close();
}
saveHackerNewsArticles();
console.log("🐺");
