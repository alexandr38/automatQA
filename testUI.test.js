const { TestScheduler } = require("jest");
const playwright = require("playwright-chromium");

jest.setTimeout(30000);
let browser;

afterAll( async () => {
  await browser.close();
});

describe("test_UI", () =>{
let homePage;

  test("Launch browser > open page", async() =>  {
    browser = await playwright.chromium.launch( {
      headless: false,
      sloMo: 10000,
    });
    homePage = await browser.newPage();
    await homePage.goto("https://the-internet.herokuapp.com");
  });
/*
  test("1 - Add/Remove elements", async () => {

    const page = homePage;
    //click on Add/remove elements button
    await page.click('[href="/add_remove_elements/"]');

    //click on "Add elements" button
    await page.click('button[onclick="addElement()"]');

    //check that "Delete"button apepars
    await page.waitForSelector(".added-manually");
    });

  test("2 - Basic Auth (user and pass: admin)", async () =>{
    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
  });

  test("3 - Chekboxes", async () => {

    const context = await browser.newContext();
    homePage = await context.newPage();
    homePage.goto("https://the-internet.herokuapp.com/checkboxes");
    
    //check chekbox 1
    await homePage.check('#checkboxes [type="checkbox"]:nth-child(1)');

    //unchek checkbox 2
    await homePage.uncheck('#checkboxes [type="checkbox"]:nth-child(3)');
  });

  test("4 - Digest Authentication (user and pass: admin)", async () =>{
    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/digest_auth');

    //asert
    await page.waitForSelector('text=Congratulations! You must have the proper credentials.');
  });

  test("5 - Dropdown", async () =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    
    await page.selectOption('#dropdown', '2');
  });

  test("6 - Dynamic Controls", async () =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    //enable field
    await page.click('#input-example [type="button"]');

    //asert
    await page.waitForSelector('text=It\'s enabled!');
  });
  
  test("7 - Login Page", async () =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');

    //input login/password
    await page.type('#username', 'tomsmith');
    await page.type('#password', 'SuperSecretPassword!');
    await page.click('[type="submit"]');

    //asert
    await page.waitForSelector('text=Welcome to the Secure Area. When you are done click logout below.');

    //logout
    await page.click('[href="/logout"]');

  });
  

*/
//Notification Messages
test("8 - Notification Messages", async () =>{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/notification_message_rendered');

  //enable field
  await page.click('[href="/notification_message"]');

  //asert жду єтот єлемент, поскольку его нет на начальной странице. но после клика он появляется
  await page.waitForSelector('#flash');
  
  });

  test("9 - Mobile", async () =>{
    const { webkit, devices } = require('playwright-chromium');
    const iOS = playwright.devices['Galaxy Note 3'];
    const context = await browser.newContext(devices["iOs"]);
    page = await context.newPage();
    await page.goto("https://github.com/");
    await page.click('.btn-link .d-lg-none .mt-1 .js-details-target');
    await page.waitForSelector('[href="/login"]');
    await page.waitForTimeout(1000);
  });
  
});

//await context.waitForEvent('page');

//open window

//press key

//file upload  setInputFiles
//а не так нужно было делать ? - await page.press('body', 'Enter');