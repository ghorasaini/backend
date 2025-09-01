// modules
// commom js modules
// uses modules.export and require ()

// EXAMPLE
// destructuring


// import { mul } from "./mul.js"
// let  object1 = {
//     name: "ram",
//     age: 12
// }
// const {name, age }= object1
// console.log(name, age)

// // const math = require (" ./sum")
// //  console.log (math.add (1,2));
//  console.log (mul(1,2))


//  ES modules
//  used export  and import
// support default and name exports



// built in module
// fs
import fs from "fs"
import path from "path"
import os from "os";
fs.writeFileSync("same.txt", "hello this is first sample text");

const data = fs.readFileSync ("same.txt", "utf-8");
console.log(data)

fs.writeFileSync("same.txt", "Updated  text");

fs.appendFile(" same.txt", "\n hey it's me bimal", (err)=> {
    console.log(err)
});


fs.unlink("same.txt", (err) => {
    console.log(err);
});


// to create folder
fs.mkdir("myfolder",(err) => {
    console.log(err)
})


fs.rmdir ("myfolder", () => {

});
// console.log (os.platform())
// console.log (os.arch())
// console.log (os.totalmem())
// console.log (os.freemem())
// console.log (os.uptime())


const filePath = 'ram/docs/letter.txt';
console.log("base Name", path.basename(filePath));
console.log("Directry Name", path.dirname(filePath));
console.log("file extensiom", path.extname(filePath));


// rest, spread
