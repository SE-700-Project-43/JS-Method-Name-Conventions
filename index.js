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
            const methodName = data[2][i].toString();
            const length = methodName.length;
            const methodNameLength = length.toString();
            const fileName = file.toString();
            const lineNumber = data[3][i].toString();

            fs.appendFileSync("./results_method_names.csv", methodName);
            fs.appendFileSync("./results_method_names.csv", ",");
            fs.appendFileSync("./results_method_names.csv", methodNameLength);
            fs.appendFileSync("./results_method_names.csv", ",");
            fs.appendFileSync("./results_method_names.csv", fileName);
            fs.appendFileSync("./results_method_names.csv", ",");
            fs.appendFileSync("./results_method_names.csv", lineNumber);
            fs.appendFileSync("./results_method_names.csv", "\n");

            nameLengthCounts[length] = nameLengthCounts[length]
              ? nameLengthCounts[length] + 1
              : 1;
          }
        }

        if (index === res.length - 1) {
          for (let i = 0; i < x.length; i++) {
            const loc = x[i].toString();
            const methods = y[i].toString();

            fs.appendFileSync("./results_methods_per_loc.csv", loc);
            fs.appendFileSync("./results_methods_per_loc.csv", ",");
            fs.appendFileSync("./results_methods_per_loc.csv", methods);
            fs.appendFileSync("./results_methods_per_loc.csv", "\n");
          }

          // console.log(nameLengthCounts);

          for (let length in nameLengthCounts) {
            const nameLength = length.toString();
            const count = nameLengthCounts[length].toString();

            fs.appendFileSync(
              "./results_method_name_length_counts.csv",
              nameLength
            );
            fs.appendFileSync("./results_method_name_length_counts.csv", ",");
            fs.appendFileSync("./results_method_name_length_counts.csv", count);
            fs.appendFileSync("./results_method_name_length_counts.csv", "\n");
          }
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
