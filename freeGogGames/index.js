var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

console.log("running")



///////STEPS
/// 1:
/// Get the items from the list,
var WebTorrent = require('webtorrent')

var client = new WebTorrent()

var magnetURI = 'magnet:?xt=urn:btih:252A8BA942E9DCAA8D001EB2EB0B6C0BA224690D'

client.add(magnetURI, { path: 'games' }, function (torrent) {
  torrent.on('done', function () {
    console.log('torrent download finished')
  })});



//    allGameLinks = [];
//    if (fs.existsSync('allGameLinks.json')) {
//     allGameLinks = JSON.parse(fs.readFileSync('allGameLinks.json', 'utf8'));
//     }
//    currentPage = 1;
//    if (allGameLinks.length > 0) {
//     getDownloadLink()
//    } else {
//     getGamesFromList();
//    }
    function getGamesFromList() {
        request(`http://freegogpcgames.com/page/${currentPage}/?s`, function(error, response, html){
            if(!error){
                currentPage++;
                var $ = cheerio.load(html);
                const gameLinks = $('.mh-loop-thumb > a').map((i, x) => $(x).attr('href')).toArray();
                console.log(gameLinks);
                allGameLinks = allGameLinks.concat(gameLinks);
                if (gameLinks && gameLinks.length > 0) {
                    getGamesFromList();
                } else {
                    fs.writeFile("allGameLinks.json", JSON.stringify(allGameLinks), function(err){
                        if(err){console.log(err);} else {console.log("Archived it all");}
                });
                }
            }
        })
    }
    function getDownloadLink(){
        let downloadLinkList = [];
        for (let index = 0; index < allGameLinks.length; index++) {
            const element = allGameLinks[index];
            request(element, function(error, response, html){
                console.log(index, element)

                if(!error){

                    var $ = cheerio.load(html);
                    const downloadLink = $('.entry-content strong > a').map((i, x) => $(x).attr('href')).toArray()[0];
                    downloadLinkList.push(downloadLink);
                    console.log(downloadLinkList.length)
                    fs.writeFile("allDownloadLinks.json", JSON.stringify(downloadLinkList), function(err){
                        if(err){console.log(err);} else {console.log("Archived it all");}
                    });
                    if (downloadLinkList.length == allGameLinks.length) {

                    }
                } else 
                    console.log(error);
            })

        }
    }
