// [3 / adv / an / asp / biz / cgl / ck / co / diy / fa / fit / gd / his / int / jp / lit / mlp / mu / n / news / out / po / qst / sci / sp / tg / toy / trv / tv / vp / wsg / wsr / x
let request = require('request')

let boards = ["fit"]

let boardsContainingGreenText = [];



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
        for (let index = 0; index < boardsContainingGreenText.length; index++) {
            const board = boardsContainingGreenText[index];
            for (let index = 0; index < board.threads.length; index++) {
                const thread = board.threads[index];
                request('http://a.4cdn.org/' + board.board + '/thread/' + thread.no + '.json', {json: true}, function (error, response, body) {
                    if (error || body == undefined) {
                        return;
                    }
                    const postsWithGreenText = body.posts.filter(p => p.com && p.com.toLowerCase().includes('class="quote"'));
                    console.log(postsWithGreenText);
                })
            }

        }
    }
    function writeGreenText(){

    }