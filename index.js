const generateMethodNames = require("./parser/parser");
const getFileList = require("./parser/fileReader");

const fs = require("fs");

getFileList("./test_scripts")
  .then((res) => {
    let x = [];
    let y = [];
    const nameLengthCounts = {};

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
            fs.appendFileSync(
              "./names.csv",
              data[2][i].toString().length.toString()
            );
            fs.appendFileSync("./names.csv", ",");
            fs.appendFileSync("./names.csv", file.toString());
            fs.appendFileSync("./names.csv", ",");
            fs.appendFileSync("./names.csv", data[3][i].toString());
            fs.appendFileSync("./names.csv", "\n");

            nameLengthCounts[data[2][i].toString().length] = nameLengthCounts[
              data[2][i].toString().length
            ]
              ? nameLengthCounts[data[2][i].toString().length] + 1
              : 1;
          }
        }

        if (index === res.length - 1) {
          for (let i = 0; i < x.length; i++) {
            fs.appendFileSync("./test.csv", x[i].toString());
            fs.appendFileSync("./test.csv", ",");
            fs.appendFileSync("./test.csv", y[i].toString());
            fs.appendFileSync("./test.csv", "\n");
          }

          console.log(nameLengthCounts);
          // nameLengthCounts.foreach((k, v) => {
          //   // fs.appendFileSync()
          // });
          for (let length in nameLengthCounts) {
            let count = nameLengthCounts[length];
            fs.appendFileSync(
              "./results_method_name_length_counts.csv",
              length.toString()
            );
            fs.appendFileSync("./results_method_name_length_counts.csv", ",");
            fs.appendFileSync(
              "./results_method_name_length_counts.csv",
              count.toString()
            );
            fs.appendFileSync("./results_method_name_length_counts.csv", "\n");
          }
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
