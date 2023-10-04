const fs = require("fs");
const fetch = require("node-fetch");

const allContents = fs.readFileSync("./repo_finder/repo_names.txt", "utf-8");

async function getSize() {
  let js = 0;
  let total = 0;

  await allContents.split(/\r?\n/).forEach(async (line) => {
    if (line != "") {
      const name = line.substring(18, line.length - 4);

      await fetch(`https://api.github.com/repos${name}/languages`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          for (var key in data) {
            if (key == "JavaScript") {
              js = js + data[key];
            }
            total = total + data[key];

            console.log("JS COUNTTTTT: ", js);
            console.log("TOTAL COUNTTT: ", total);
          }
        })
        .catch((e) => console.error(e));
    }
  });

  console.log("PERCENVETT: ", (js / total) * 100);
}

console.log("eafaf");

getSize();
