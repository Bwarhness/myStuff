"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var download = require("download-file");
var syncLoop = require("sync-loop");
var mkdirp = require("mkdirp");
request('http://a.4cdn.org/gif/catalog.json', { json: true }, function (error, response, body) {
    var threads = [].concat.apply([], body.map(function (p) { return p.threads; }));
    threads.forEach(function (element) {
        request('http://a.4cdn.org/gif/thread/' + element.no + '.json', { json: true }, function (error, res, body) {
            if (error || body == undefined) {
                return;
            }
            var postsWithMedia = body.posts.filter(function (p) { return p.ext != undefined; });
            mkdirp("./media/" + element.sub, function (err) {
                // path exists unless there was an error
                syncLoop(postsWithMedia.length, function (loop) {
                    // loop body
                    (function () {
                        var post = postsWithMedia[loop.iteration()];
                        var url = "http://i.4cdn.org/gif/" + post.tim + post.ext;
                        console.log(url);
                        var options = {
                            directory: "./media/" + element.sub,
                            filename: "" + post.tim + post.ext
                        };
                        download(url, options, function (err) {
                            if (err) {
                                console.error("error happends");
                            }
                            else {
                                console.log("meow");
                            }
                            loop.next(); // call `loop.next()` for next iteration
                        });
                        // This is callback of your function
                    })();
                }, function () {
                    console.log("This is finish function");
                });
            });
        });
    });
});
//# sourceMappingURL=Scan.js.map