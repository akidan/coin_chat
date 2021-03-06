const puppeteer = require('puppeteer');
const request = require('request-promise');

var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://coincheck.com/ja/chats');
  page.on('response', response => {
    response.text().then(function (textBody) {
      try {
        chats = JSON.parse(textBody).chats;
        for(let i=0; i < chats.length; i++) {
          console.log(blue + chats[i].name + ": " + cyan + chats[i].content + reset)
        }
        request('https://api.zaif.jp/api/1/last_price/zaif_jpy').then(last_price=>{ console.log(blue+"ZFT: "+ JSON.parse(last_price).last_price+reset)})
        request('https://api.zaif.jp/api/1/last_price/mosaic.cms_jpy').then(last_price=>{ console.log(blue+"CMS: "+ JSON.parse(last_price).last_price+reset)})
      } catch(e) {
      }
    })
  })
  //await browser.close();
})();
