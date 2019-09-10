const rp = require('request-promise');
const url = 'https://exrx.net/Lists/Directory';
const cheerio = require('cheerio');
const fs = require('fs');



async function main() {
  let jsonConf = JSON.parse(fs.readFileSync('conf.json'));
  let result = await doUrls(jsonConf.urls);
}
main();

async function doUrls(urls) {
  if (!urls || urls.length == 0) {
    console.log('no urls');
    process.exit();
  }
  // urls.forEach(element => {
  //   let html = await fetchUrl(element.url);
  // });
};

function getChild() {

};

async function fetchUrl(url) {
  var options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};
  rp(url)
    .then(function (html) {
      return html
    })
    .catch(function (err) {
      //handle error
    });
}



// class jsonActions {
//   jquery
// }


