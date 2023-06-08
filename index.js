const generateMethodNames = require("./parser/parser");
const getFileList = require("./parser/fileReader");

var esprima = require("esprima");
const script = `function myFunc() {
    for (let i = 0; i < 2; i++) {
        console.log(i)
    }
    var x = 9
    return x^2
}`;
tree = esprima.parseScript(script, { tokens: true });

const fs = require("fs");

getFileList("./test_scripts")
  .then((res) => {
    let x = [];
    let y = [];
    res.map(async (file, index) => {
      // console.log(file);
      await generateMethodNames(file).then((data) => {
        if (data.length > 0) {
          x.push(data[0]);
          y.push(data[1]);
        }
        console.log("whatt", data[2]);

        if (data[2]) {
          data[2].map((n) => {
            console.log("name", n);
            fs.appendFileSync("./names.csv", n);
            fs.appendFileSync("./names.csv", "\n");
          });
        }

        if (index === res.length - 1) {
          fs.appendFileSync("./test.csv", x.join());
          fs.appendFileSync("./test.csv", "\n");
          fs.appendFileSync("./test.csv", y.join());
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
