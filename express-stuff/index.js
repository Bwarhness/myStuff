var express = require('express')
var app = express()
const port = 3000
app.use(express.static('www'))
app.get('/', function (req, res) {
  res.sendFile('wwww/index.html')
})
app.get('/bla', function (req, res) {
var chan = require('./services/4chan');
  (async () => {
    let bla = await chan.getVideo();

    res.json(new Date())
  })()

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))