import { chromium } from "playwright";

const scrapingGetRawDataBCV = async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("http://www.bcv.org.ve/");
    //   await page.screenshot({ path: "home.png" });
    const content = await page.textContent('[id="dolar"]');
    const number = await page.textContent('[id="dolar"] .field-content strong');
    console.log(number);
    await browser.close();
    return { content, number, isSucces: true };
  } catch (error) {
    console.log(error);
    return {
      isSucces: false,
      message: "losiento pero ocurrio un erro del scraping",
      error,
    };
  }
};

export default scrapingGetRawDataBCV;
