const cliSelect = require('cli-select');

const options = ['4chan', 'NotAlwaysRight']

cliSelect({values:['4chan', 'NotAlwaysRight']}, (option) => {
    console.log(option)
    require(`./options/${option.value}.js`)
});