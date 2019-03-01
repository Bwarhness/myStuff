import * as request from 'request'
import { Thread } from './models/catalog';
import { SingleThread } from './models/thread';
import * as download from 'download-file'
import * as syncLoop from 'sync-loop'
import * as mkdirp  from 'mkdirp'

request('http://a.4cdn.org/gif/catalog.json',{json:true}, function(error, response, body) {
    
    const threads : Thread[] = [].concat.apply([],body.map(p => p.threads));
    threads.forEach(element => {
        request('http://a.4cdn.org/gif/thread/'+ element.no + '.json', {json:true}, function(error,res,body:SingleThread){
            if (error || body == undefined) {
                return;
            }
            const postsWithMedia = body.posts.filter(p => p.ext != undefined);
            mkdirp(`./media/${element.sub}`, function(err) { 

                // path exists unless there was an error
            
            syncLoop(postsWithMedia.length, function (loop) {

                // loop body
                (function(){
                    let post = postsWithMedia[loop.iteration()]
                    var url = `http://i.4cdn.org/gif/${post.tim}${post.ext}`
                    console.log(url);
                   var options = {
                       directory: `./media/${element.sub}`,
                       filename: `${post.tim}${post.ext}`
                   }
                   download(url, options, function(err){
                       if (err) {
                           console.error("error happends")
                       }
                       else {
                           console.log("meow")
   
                       }
                        loop.next(); // call `loop.next()` for next iteration
                   }) 
                  // This is callback of your function
                })()
              }, function () {
                console.log("This is finish function")
              });
            });
            })
    })
})
