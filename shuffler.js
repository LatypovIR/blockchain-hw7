const { exit } = require('process')
const sjcl = require('sjcl')

const argv = process.argv.slice(2)

function getArg(argName) {
    const index = argv.indexOf(argName);
    if (index < 0) {
        console.log("Can't found arg %s", argName);
        exit(0);
    }
    if (index + 1 >= argv.length) {
        console.log("You forgot set value for arg %s", argName);
        exit(0);
    }
    return argv[index + 1];
}

let file = getArg('--file');
let numbilets = Number(getArg('--numbilets'));
let parameter = String(getArg('--parameter'));

const fs = require('fs');
const readline = require('readline');

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });
  
lineReader.on('line', function (line) {
    let sha = sjcl.hash.sha256.hash(line + '_' + parameter);
    let tiket = (sha[0] % numbilets + numbilets) % numbilets + 1;
    console.log('%s: %d', line, tiket);
});
