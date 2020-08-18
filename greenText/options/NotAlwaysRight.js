const cliSelect = require("cli-select");
const axios = require('axios')
const cheerio = require('cheerio')
const options = ['unfiltered',"right", "romantic", "related", "learning",'friendly', 'healthy', 'legal' ,'inspirational', "working"];

let stories = [];

cliSelect({ values: options }, (option) => {
  console.log(option);
//   require(`./options/${option.value}.js`);
axios.get('https://notalwaysright.com/' + option.value)
  .then((response) => {
      $ = cheerio.load(response.data);
    const stories = $('.post');
    stories.find('h1').each(function (index, element) {
        console.log(element.text())
        // list.push($(element).attr('href'));
      });
  })
  .catch((error) => {
  }).then($ => {

  });
  
});


function addStories(stories) {
    stories.toArray().map((el) => {
        console.log(el)
      });
      
    // console.log(stories)
    // stories.forEach(singleStory => {
    //     console.log('123')
    //     let story = {
    //         title: singleStory('.storytitle').html()
    //     }
    //     console.log(story)
    // });

}