const { getAllFiles } = require("../parser/fileReader");
const fs = require("fs");

async function parseFiles() {
  await getAllFiles("./results").then((res) => {
    res.map((file, index) => {
      if (file.includes("_results_method_names.csv")) {
        const data = fs.readFileSync(file, "utf8");
        const lines = data.split("\r\n");
        const name = file
          .replace("./results/", "")
          .replace("_results_method_names.csv", "");

        data.split(/\r?\n/).map((line) => {
          console.log(line);
          const currentName = line.split(",")[0];

          if (currentName && !line.includes(".min.js")) {
            fs.appendFileSync(
              `./misc/all_method_names.txt`,
              currentName + "\n"
            );
          }
        });
      }
    });
  });
}

parseFiles();
