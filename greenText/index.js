// ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "gif" , "h" , "hr" , "k" , "m" , "o" , "p" , "r" , "s" , "t" , "u" , "v" , "vg" , "vr" , "w" , "wg", "i" , "ic", "r9k" , "s4s" , "vip" , "qa", "cm" , "hm" , "lgbt" , "y", "3" , "aco" , "adv" , "an" , "asp" , "bant" , "biz" , "cgl" , "ck" , "co" , "diy" , "fa" , "fit" , "gd" , "hc" , "his" , "int" , "jp" , "lit" , "mlp" , "mu" , "n" , "news" , "out" , "po" , "pol" , "qst" , "sci" , "soc" , "sp" , "tg" , "toy" , "trv" , "tv" , "vp" , "wsg", "wsr , "x"]
let request = require('request');
let boards = ["b" , "fit", "pol","s4s"]// "h" , "hr" , "k" , "m" , "o" , "p" , "r" , "s" , "t" , "u" , "v" , "vg" , "vr" , "w" , "wg", "i" , "ic", "r9k" , "s4s" , "vip" , "qa", "cm" , "hm" , "lgbt" , "y", "3" , "aco" , "adv","fit" , "gd" , "hc" , "his" , "int" , "jp" , "lit" , "mlp" , "mu" , "n" , "news" , "out" , "po" , "pol" , "qst" , "sci" , "soc" , "sp" , "tg" , "toy" , "trv" , "tv" , "vp" , "wsg","wsr","x"];
let boardsContainingGreenText = [];
let posts = [];

var userDetails;
function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'http://a.4cdn.org/wsg/catalog.json',
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}

function get4ChanPromises() {
    let startupPromises = []
    boards.forEach(board => {

        startupPromises.push( new Promise(function(resolve, reject) {
            // Do async job
            request(`http://a.4cdn.org/${board}/catalog.json`, {
                json: true 
            }, function (error, response, body) {
                if (error || body == undefined) {
                    reject(err);
                }
                const threads = [].concat.apply([], body.map(p => p.threads));
                const bestThreads = threads.filter(p =>
                    (p.com && p.com.toLowerCase().includes('class="quote"') && p.com.length > 200) || (p.sub && p.sub.toLowerCase().includes('class="quote"')))
                    if (bestThreads.length > 0) {
                    boardsContainingGreenText = boardsContainingGreenText.concat({board:board, threads:bestThreads});
                    }
                    console.log("done") 

                    resolve(body);
                });
           }));
    });  
    return startupPromises;
}



var initializePromise = get4ChanPromises();
Promise.all(initializePromise).then(function(result) {
    var initialisedThreads = getThreadPromises();
    Promise.all(initialisedThreads).then(
        (result) => {
            startListening();
        } 
    ).catch(
        (err) => {console.log(err)}
    )
}, function(err) {
    console.log(err);
})

function getThreadPromises() {
    let threadsPromises = [];
    console.log("doing more")
    let bordsProcessed = 0;
    
    boardsContainingGreenText.forEach(board => {

        board.threads.forEach(thread => {
            threadsPromises.push( new Promise(function(resolve, reject) {
            request('http://a.4cdn.org/' + board.board + '/thread/' + thread.no + '.json', {json: true},  (error, response, body) => {
            if (!(error || body == undefined)) {
                const postsWithGreenText = body.posts.filter(p => p.com && p.com != undefined && p.com.toLowerCase().includes('class="quote"'));
                posts = posts.concat(postsWithGreenText);
                resolve(body);
                }
                reject(error)
            });
            }));

        }); 
        
    });
    return threadsPromises;
};


function startListening() {
    writeGreenText();
    var term = require( 'terminal-kit' ).terminal ;

    term.grabInput() ;
    
    term.on( 'key' , function( name , matches , data ) {  
        console.log( "'key' event:" , name ) ;
    
        // Detect CTRL-C and exit 'manually'
        if ( name === 'RIGHT' ) { 
            process.stdout.write('\033c');
            writeGreenText(); }

        if ( name === 'CTRL_C' ) { process.exit() ; }
    } ) ;
}
function writeGreenText() {

    extractor = require('unfluff');
    var h2p = require('html2plaintext')
    data = h2p(posts[Math.ceil(Math.random() * posts.length)].com);
    console.log("-----------------------------------------")
    console.log(data);


};