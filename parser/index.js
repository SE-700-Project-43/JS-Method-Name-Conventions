const generateMethodNames = require("./parser");
const getFileList = require("./fileReader");

const fs = require("fs");
const path = require("path");

fs.readdir("./results/", (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join("./results/", file);

    // Check if the file has the specified extension
    if (path.extname(file) === ".csv" || path.extname(file) === ".jpeg") {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", filePath, err);
        } else {
          console.log("File deleted:", filePath);
        }
      });
    }
  });
});

getFileList("./parser/test_scripts")
  .then((res) => {
    let x = [];
    let y = [];
    let fileNames = [];
    const nameLengthCounts = {};

    res.map(async (file, index) => {
      await generateMethodNames(file).then((data) => {
        if (data.length > 0) {
          x.push(data[0]);
          y.push(data[1]);
          fileNames.push(file.toString());
        }

        if (data[2]) {
          for (let i = 0; i < data[2].length; i++) {
            const methodName = data[2][i].toString();
            const length = methodName.length;
            const methodNameLength = length.toString();
            const fileName = file.toString();
            const lineNumber = data[3][i].toString();

            fs.appendFileSync("./results/results_method_names.csv", methodName);
            fs.appendFileSync("./results/results_method_names.csv", ",");
            fs.appendFileSync(
              "./results/results_method_names.csv",
              methodNameLength
            );
            fs.appendFileSync("./results/results_method_names.csv", ",");
            fs.appendFileSync("./results/results_method_names.csv", fileName);
            fs.appendFileSync("./results/results_method_names.csv", ",");
            fs.appendFileSync("./results/results_method_names.csv", lineNumber);
            fs.appendFileSync("./results/results_method_names.csv", "\n");

            nameLengthCounts[length] = nameLengthCounts[length]
              ? nameLengthCounts[length] + 1
              : 1;
          }
        }

        if (index === res.length - 1) {
          for (let i = 0; i < x.length; i++) {
            const loc = x[i].toString();
            const methods = y[i].toString();
            const fileName = fileNames[i];

            fs.appendFileSync("./results/results_methods_per_loc.csv", loc);
            fs.appendFileSync("./results/results_methods_per_loc.csv", ",");
            fs.appendFileSync("./results/results_methods_per_loc.csv", methods);
            fs.appendFileSync("./results/results_methods_per_loc.csv", ",");
            fs.appendFileSync(
              "./results/results_methods_per_loc.csv",
              fileName
            );
            fs.appendFileSync("./results/results_methods_per_loc.csv", "\n");
          }

          // console.log(nameLengthCounts);

          for (let length in nameLengthCounts) {
            const nameLength = length.toString();
            const count = nameLengthCounts[length].toString();

            fs.appendFileSync(
              "./results/results_method_name_length_counts.csv",
              nameLength
            );
            fs.appendFileSync(
              "./results/results_method_name_length_counts.csv",
              ","
            );
            fs.appendFileSync(
              "./results/results_method_name_length_counts.csv",
              count
            );
            fs.appendFileSync(
              "./results/results_method_name_length_counts.csv",
              "\n"
            );
          }
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
