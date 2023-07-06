const generateMethodNames = require("./parser/parser");
const getFileList = require("./parser/fileReader");

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
        // console.log("whatt", data[2]);

        if (data[2]) {
          for (let i = 0; i < data[2].length; i++) {
            fs.appendFileSync("./names.csv", data[2][i].toString());
            fs.appendFileSync("./names.csv", ",");
            fs.appendFileSync("./names.csv", file.toString());
            fs.appendFileSync("./names.csv", ",");
            fs.appendFileSync("./names.csv", data[3][i].toString());
            fs.appendFileSync("./names.csv", "\n");
          }
        }

        if (index === res.length - 1) {
          for (let i = 0; i < x.length; i++) {
            fs.appendFileSync("./test.csv", x[i].toString());
            fs.appendFileSync("./test.csv", ",");
            fs.appendFileSync("./test.csv", y[i].toString());
            fs.appendFileSync("./test.csv", "\n");
          }
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
