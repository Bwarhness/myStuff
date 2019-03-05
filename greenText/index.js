// ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "gif" , "h" , "hr" , "k" , "m" , "o" , "p" , "r" , "s" , "t" , "u" , "v" , "vg" , "vr" , "w" , "wg", "i" , "ic", "r9k" , "s4s" , "vip" , "qa", "cm" , "hm" , "lgbt" , "y", "3" , "aco" , "adv" , "an" , "asp" , "bant" , "biz" , "cgl" , "ck" , "co" , "diy" , "fa" , "fit" , "gd" , "hc" , "his" , "int" , "jp" , "lit" , "mlp" , "mu" , "n" , "news" , "out" , "po" , "pol" , "qst" , "sci" , "soc" , "sp" , "tg" , "toy" , "trv" , "tv" , "vp" , "wsg", "wsr , "x"]


let request = require('request');
let boards = ["b" , "fit", "pol","s4s"]// "h" , "hr" , "k" , "m" , "o" , "p" , "r" , "s" , "t" , "u" , "v" , "vg" , "vr" , "w" , "wg", "i" , "ic", "r9k" , "s4s" , "vip" , "qa", "cm" , "hm" , "lgbt" , "y", "3" , "aco" , "adv","fit" , "gd" , "hc" , "his" , "int" , "jp" , "lit" , "mlp" , "mu" , "n" , "news" , "out" , "po" , "pol" , "qst" , "sci" , "soc" , "sp" , "tg" , "toy" , "trv" , "tv" , "vp" , "wsg","wsr","x"];
let boardsContainingGreenText = [];
let posts = [];
startUp();




function startUp() {
    boards.forEach(board => {
        request(`http://a.4cdn.org/${board}/catalog.json`, {
            json: true 
        }, function (error, response, body) {
            if (error || body == undefined) {
                return;
            }
            const threads = [].concat.apply([], body.map(p => p.threads));
            const bestThreads = threads.filter(p =>
                (p.com && p.com.toLowerCase().includes('class="quote"')) || (p.sub && p.sub.toLowerCase().includes('class="quote"')))
                if (bestThreads.length > 0) {
                boardsContainingGreenText = boardsContainingGreenText.concat({board:board, threads:bestThreads});
                }
            if (boards.indexOf(board) == boards.length -1) {
                console.log("getting green texts")

                doMore();
                
            }
            })
    }); 
    function doMore() {
        console.log("doing more")
        let bordsProcessed = 0;
        
        boardsContainingGreenText.forEach(board => {
            bordsProcessed++;
            let threadsProcessed = 0;

            board.threads.forEach(thread => {
                request('http://a.4cdn.org/' + board.board + '/thread/' + thread.no + '.json', {json: true},  (error, response, body) => {
                threadsProcessed = threadsProcessed + 1;
                if (!(error || body == undefined)) {
                    const postsWithGreenText = body.posts.filter(p => p.com && p.com != undefined && p.com.toLowerCase().includes('class="quote"'));
                    posts = posts.concat(postsWithGreenText);

                    }
                    console.log(bordsProcessed == boardsContainingGreenText.length, threadsProcessed == board.threads.length)
                    if (bordsProcessed == boardsContainingGreenText.length && threadsProcessed == board.threads.length) {
                        console.log("started listening");
                        startListening();
                    };
                });
            }); 
        });
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
    console.log("-----------------------------------------")
    console.log(data.text);


};