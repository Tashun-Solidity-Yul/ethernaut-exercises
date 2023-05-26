// import * as data from './.yulignore';
// const parse = require('parse-gitignore');
const path = require('path');
const fs = require('fs');
const contents = fs.readFileSync('.yulignore', 'utf-8');
const arr = contents.split(/\r?\n/);


function compileToBinaryCode() {

    var wshShell = new ActiveXObject("WScript.Shell");
    wshShell.Run("D:\\dir\\user.bat");
}

function getAllYulFiles(startPath, filter) {

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory() && !arr.includes(filename) ) {
            console.log(filename);
            getAllYulFiles(filename, filter);
        } else if (filename.endsWith(filter)) {
            console.log('-- found: ', filename);
        }

    }
    // console.log(files);
}

getAllYulFiles(".", ".yul");