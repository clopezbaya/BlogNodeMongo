const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

describe('Google Search', function () {
    let driver;
  
    before(async function () {
        let options = new chrome.Options();
        options.addArguments('headless'); // Ejecutar en modo headless
        options.addArguments('disable-gpu');
        options.addArguments('no-sandbox');
        options.addArguments('disable-dev-shm-usage');
      
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();
    });
  
    after(async function () {
      await driver.quit();
    });
  
    it('The tittle of page should be NodeJs Blog in Home', async function () {
      await driver.get('http://localhost:3000');
      await driver.wait(until.titleIs('NodeJs Blog'), 5000);
      const title = await driver.getTitle();
      assert.strictEqual(title, 'NodeJs Blog');
    });
    it('The headder in the page should be About in the About Section', async function () {
        await driver.get('http://localhost:3000');
        let aboutLink = driver.findElement(By.css("a[href='/about']"));
        await aboutLink.click();
        const aboutHeader = await driver.findElement(By.xpath('//h1[text()="About"]'));
        const text = await aboutHeader.getText();
        assert.strictEqual(text, 'About');
      });
      it('The admin pannel should be contain the Sign In Section', async function () {
        await driver.get('http://localhost:3000/admin');
        const aboutHeader = await driver.findElement(By.xpath('//h3[text()="Sign In"]'));
        const text = await aboutHeader.getText();
        assert.strictEqual(text, 'Sign In');
      });
  });