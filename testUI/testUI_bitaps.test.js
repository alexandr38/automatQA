const { TestScheduler } = require("jest");
const playwright = require("playwright-chromium");


jest.setTimeout(30000);

let browser;

const homePage = 'https://bitaps.com';
const bitapsToolUrl = 'https://bitaps.com/tools';
const headerHomePage = '#header-top';
const moonTeam = '.fa.fa-lg.theme.ml-1';
const selectorAfterClickMoon = '[data-theme="dark"]';
const clickRusLang = '#footer div>a[href="https://bitaps.com/?language=ru"]';
const selectortAfterClickRus = 'text=Последние блоки';
const blockFromTopMenu = '.list-inline-item [href="/blocks"]';
const blockDailyStatistic = '#blocks-daily-stat-wrapper';
const urlPageBlock = 'https://bitaps.com/blocks';
const searchBox = '#search-box';
const selectSearchBlock = '#block-summary';
const addressGenerateTools = '#address_gen_tool';
const titleFormAddressGenerate = '.card-title';
const btnKeyGen = '#gen-key-btn';
const generatedKeyField = '#load-key-input';
const maxLengthPrivateKey = 216;


beforeAll( async() => {
  browser = await playwright.chromium.launch( {
    headless: false,
    sloMo: 100,
  });
});


afterAll( async () => {
  await browser.close();
});

describe("testUI_bitaps", () =>{

  test("1 - open home page", async() =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(homePage);

    await page.waitForSelector(headerHomePage, {waitFor:"visible"});
    await page.close();
  });

  test("2 - switching data-theme", async() =>{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(homePage);
  await page.waitForSelector(headerHomePage, {waitFor:"visible"});

  await page.click(moonTeam);

  await page.waitForSelector(selectorAfterClickMoon);
  
  await page.close();
  });

  test("3 - select rus language", async() =>{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(homePage);
  await page.waitForSelector(headerHomePage, {waitFor:"visible"});

  await page.click(clickRusLang);
  
  await page.waitForSelector(selectortAfterClickRus);
  await page.close();
});


  test("4 - click \"block\" from top menu", async() =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(homePage);
    await page.waitForSelector(headerHomePage, {waitFor:"visible"});

    await page.click(blockFromTopMenu);
    await page.waitForSelector(blockDailyStatistic);
    
    expect(page.url()).toEqual(urlPageBlock);
    
    await page.close();
  });

  test("5 - test search-box from home page", async() =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(homePage);
    await page.waitForSelector(searchBox, {waitFor:"visible"});

    await page.fill(searchBox, "123");
    await page.press(searchBox, "Enter");
    
    await page.waitForSelector(selectSearchBlock);
    await page.close();
  });

test("6 - test generate private key from Address tool", async() =>{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(bitapsToolUrl);
  await page.waitForSelector(addressGenerateTools, {waitFor:"visible"});

  await page.click(addressGenerateTools);
  await page.waitForSelector(titleFormAddressGenerate, {});
  
  await page.click(btnKeyGen);
  await page.waitForSelector(generatedKeyField);
  const element = await page.$(generatedKeyField);
  
  const privateKey = await element.textContent ();
  
  expect((privateKey.length)<=maxLengthPrivateKey && (privateKey.length)>0);
  
  await page.close();
});

});