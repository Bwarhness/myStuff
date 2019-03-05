var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

console.log("running")



///////STEPS
/// 1:
/// Get the items from the list,


    if (fs.existsSync('allDownloadLinks.json')) {
        console.log("downloading a game")
        let allGames = JSON.parse(fs.readFileSync('allDownloadLinks.json', 'utf8'));
        let random = allGames[Math.ceil(Math.random() * allGames.length)]

        var WebTorrent = require('webtorrent')

        var client = new WebTorrent()

        var magnetURI = random
        client.add(magnetURI, { path: 'games' }, function (torrent) {

            torrent.on('download', function (bytes) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`${torrent.dn}: ${torrent.progress.toString().slice(0,4)}% - ${torrent.downloadSpeed / 1000 / 1000}  Mb/s`);
              })

        torrent.on('done', function () {
            console.log('torrent download finished. Get ready to play ur game!')
        })});
    } else {



   allGameLinks = [];
   if (fs.existsSync('allGameLinks.json')) {
    allGameLinks = JSON.parse(fs.readFileSync('allGameLinks.json', 'utf8'));
    }
   currentPage = 1;
   if (allGameLinks.length > 0) {
    getDownloadLink()
   } else {
    getGamesFromList();
   }
}

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
                        if(err){console.log(err);} else {console.log("Archived it all"); process.exit(1);}
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
                    downloadLinkList = downloadLinkList.filter(p => p != null)
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
