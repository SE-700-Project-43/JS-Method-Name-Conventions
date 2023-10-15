const fs = require("fs");
const { getAllFiles } = require("../parser/fileReader");

async function countMinJSFiles() {
  await getAllFiles("./results")
    .then((res) => {
      let fileNames = new Set();
      let minJSFileNames = new Set();
      let repos = new Set();
      //   console.log(res);
      res.map((file, index) => {
        if (file.toString().includes("_results_method_names.csv")) {
          const data = fs.readFileSync(file, "utf8");
          const lines = data.split("\n");
          //   console.log(file);
          if (lines.length > 1) {
            lines.map((line) => {
              if (line != "") {
                split = line.split(",");

                const fileName = split[2].toString();

                if (fileName.includes(".min.js")) {
                  minJSFileNames.add(fileName);
                  repos.add(file);
                } else {
                  fileNames.add(fileName);
                }
              }
            });
          }
        }
      });
      console.log("awd", repos);
      console.log(fileNames.size, minJSFileNames.size);
    })
    .catch((err) => {
      console.log(err);
    });
}

countMinJSFiles();
