// [3 / adv / an / asp / biz / cgl / ck / co / diy / fa / fit / gd / his / int / jp / lit / mlp / mu / n / news / out / po / qst / sci / sp / tg / toy / trv / tv / vp / wsg / wsr / x


let request = require('request');
let boards = ["fit"];
let boardsContainingGreenText = [];
let posts = [];
startUp();




function startUp() {
    for (let index = 0; index < boards.length; index++) {
    const board = boards[index];
    request(`http://a.4cdn.org/${board}/catalog.json`, {
            json: true 
        }, function (error, response, body) {

            const threads = [].concat.apply([], body.map(p => p.threads));
            const bestThreads = threads.filter(p =>
                (p.com && p.com.toLowerCase().includes("greentext")) || (p.sub && p.sub.toLowerCase().includes("greentext")))
                if (bestThreads.length > 0) {
                boardsContainingGreenText = boardsContainingGreenText.concat({board:board, threads:bestThreads});
                }
            if (index == boards.length -1) {
                doMore();
            }
            })
    }
    function doMore() {
        for (let boardIndex = 0; boardIndex < boardsContainingGreenText.length; boardIndex++) {
            const board = boardsContainingGreenText[boardIndex];
            for (let index = 0; index < board.threads.length; index++) {
                const savedBoard = board;
                const thread = board.threads[index];
                request('http://a.4cdn.org/' + board.board + '/thread/' + thread.no + '.json', {json: true}, function (error, response, body) {
                    if (error || body == undefined) {
                        return;
                    }
                    const postsWithGreenText = body.posts.filter(p => p.com && p.com.toLowerCase().includes('class="quote"'));
                    posts = posts.concat(postsWithGreenText);
                    if (index == savedBoard.threads.length -1 && 
                        boardIndex == boardsContainingGreenText.length -1) {
                        startListening();
                    };
                });
            };

        };
    };
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
    data = extractor(posts[Math.ceil(Math.random() * posts.length)].com);
    console.log(data.text);


};