const playwright = require("playwright-chromium");

jest.setTimeout(30000);
let browser;

const homePageUrl = 'https://www.w3schools.com/html/html_iframe.asp';
const frameTopMenuJavaScript = '#topnav > div > div.w3-bar.w3-left > a:nth-child(5)';
const javaScriptTutorial = '#main > h1';

beforeAll(async () => {
    browser = await playwright.chromium.launch( {
        headless: false,
        sloMo: 100,
      });
    });

afterAll( async () => {
    await browser.close();
  });
  
describe("test_UI", () =>{
    
    test("go to iFrame", async() =>  {
          const context  = await browser.newContext();
          const page = await context.newPage();

          await page.goto(homePageUrl);
          await page.waitForSelector('iframe');

          const frames = await page.frames();
          const frame1 = frames[1];
          await frame1.waitForSelector('.w3-bar-item');

          await frame1.click(frameTopMenuJavaScript);
          
          await frame1.waitForSelector(javaScriptTutorial, {waitFor:"visible"});

                   
    });
});
