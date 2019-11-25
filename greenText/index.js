// ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "gif" , "h" , "hr" , "k" , "m" , "o" , "p" , "r" , "s" , "t" , "u" , "v" , "vg" , "vr" , "w" , "wg", "i" , "ic", "r9k" , "s4s" , "vip" , "qa", "cm" , "hm" , "lgbt" , "y", "3" , "aco" , "adv" , "an" , "asp" , "bant" , "biz" , "cgl" , "ck" , "co" , "diy" , "fa" , "fit" , "gd" , "hc" , "his" , "int" , "jp" , "lit" , "mlp" , "mu" , "n" , "news" , "out" , "po" , "pol" , "qst" , "sci" , "soc" , "sp" , "tg" , "toy" , "trv" , "tv" , "vp" , "wsg", "wsr , "x"]
let request = require('request');
let boards = ["b" , "fit", "pol","s4s", "r9k"]// "h" , "hr" , "k" , "m" , "o" , "p" , "r" , "s" , "t" , "u" , "v" , "vg" , "vr" , "w" , "wg", "i" , "ic", "r9k" , "s4s" , "vip" , "qa", "cm" , "hm" , "lgbt" , "y", "3" , "aco" , "adv","fit" , "gd" , "hc" , "his" , "int" , "jp" , "lit" , "mlp" , "mu" , "n" , "news" , "out" , "po" , "pol" , "qst" , "sci" , "soc" , "sp" , "tg" , "toy" , "trv" , "tv" , "vp" , "wsg","wsr","x"];
let boardsContainingGreenText = [];
let posts = [];


///MY FUCKING NOTES
// Min 5 sætninger i streg
// discard hypertext

//init
Promise.all(get4ChanPromises()).then(function(result) {
    Promise.all(getThreadPromises()).then(
        (result) => {
            activateUserInput();
        } 
    ).catch(
        (err) => {console.log("wat")}
    )
}, function(err) {
    console.log(err);
})

/// FUNCTIONS





//Used to search catalog API and find all the threads where the first post contains something that looks like a greentext
//Then it stored all the boards in boardsContainingGreenText, including arrays of threads
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
                console.log(`getting threads from ${board}`)
                const threads = [].concat.apply([], body.map(p => p.threads));
                const bestThreads = threads.filter(post =>
                    {
                        return (post.com && post.com != undefined && post.com.toLowerCase().includes('&gt;'))

                    })
                    if (bestThreads.length > 0) {
                    boardsContainingGreenText = boardsContainingGreenText.concat({board:board, threads:bestThreads});
                    }
                    resolve(body);
                });
           }));
    });  
    return startupPromises;
}
//used to search through the threads, and finds all the posts that it thinks has greentext in it. 
//when its done, push it to the posts array
function getThreadPromises() {
    let threadsPromises = [];
    console.log("doing more")

    boardsContainingGreenText.forEach(board => {

        board.threads.forEach(thread => {
            threadsPromises.push( new Promise(function(resolve, reject) {
            request('http://a.4cdn.org/' + board.board + '/thread/' + thread.no + '.json', {json: true},  (error, response, body) => {
            if (!(error || body == undefined)) {
                const postsWithGreenText = body.posts.filter(post =>
                     post.com &&
                     post.com != undefined && 
                     !post.com.toLowerCase().includes('&gt;&gt;') &&
                     post.com.toLowerCase().includes('&gt;') &&
                      post.com.length > 200 && 
                      post.com.split('&gt;').length > 5);
                      postsWithGreenText.map(p => p.board  = board.board)
                      if (postsWithGreenText.length > 0) {
                          posts = posts.concat(postsWithGreenText);
                      }
                resolve(body);
                }
                reject(error)
            });
            }));
        }); 
    });
    return threadsPromises;
};







function activateUserInput() {
    posts = posts.sort(function(a, b){
        if(a.board < b.board) { return -1; }
        if(a.board > b.board) { return 1; }
        return 0;
    });
    writeGreenText();
    var keypress = require('keypress');
    // use decoration to enable stdin to start sending ya events 
    keypress(process.stdin);
    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        if (key && key.name == 'right') {
            setPostIndex(currentPostIndex + 1)
            writeGreenText();
          }
          if (key && key.name == 'left') {
            setPostIndex(currentPostIndex -1)
            writeGreenText();
          }
        if (key && key.ctrl && key.name == 'c') {
          process.stdin.pause();
        }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
}
function setPostIndex(newPostIndex) {

    if (newPostIndex < 0 || (posts.length -1) < newPostIndex ) {
        return;
    }
    currentPostIndex = newPostIndex;
}

currentPostIndex = 0;
function writeGreenText() {
    extractor = require('unfluff');
    var h2p = require('html2plaintext');
    let post = posts[currentPostIndex]
    try {
        data = h2p(post.com);
    } catch (error) {
        console.log(post)
    }
    console.log("")
    console.log(`--------------------${currentPostIndex+1}/${posts.length}  ${post.board}-----------------------`)
    console.log(data)
};