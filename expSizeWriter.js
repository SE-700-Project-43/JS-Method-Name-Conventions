const { getAllFiles } = require("./parser/fileReader");
const fs = require("fs");

experienceNamingStyle = {};
experienceGrammaticalStructure = {};
experienceVerbPhrase = {};
experienceDictionaryTerms = {};
experienceFullWords = {};
experienceLength = {};
experienceAbbreviations = {};
experienceAcronyms = {};

sizeNamingStyle = {};
sizeGrammaticalStructure = {};
sizeVerbPhrase = {};
sizeDictionaryTerms = {};
sizeFullWords = {};
sizeLength = {};
sizeAbbrevations = {};
sizeAcronyms = {};

function readCounts(file, array) {
  if (fs.existsSync(file)) {
    try {
      const data = fs.readFileSync(file, "utf8");
      const lines = data.split("\n");

      console.log(lines);

      if (lines.length > 1) {
        // console.log(lines);

        lines.map((line) => {
          if (line != "") {
            split = line.split(",");
            console.log("here", line);
            array[split[0]] = [split[1], split[2], split[3]];
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

if (fs.existsSync("./results/experience_naming_style.csv")) {
  readCounts("./results/experience_naming_style.csv", experienceNamingStyle);

  console.log("AWDAWFAWDAWD", experienceNamingStyle);
}

async function parseFiles() {
  await getAllFiles("./results").then((res) => {
    res.map((file, index) => {
      // console.log(file);

      if (file.includes("_results_method_names_conventions_counts.csv")) {
        console.log(file);

        try {
          const data = fs.readFileSync(file, "utf8");
          const lines = data.split("\r\n");
          const name = file
            .replace("./results/", "")
            .replace("_results_method_names_conventions_counts.csv", "");

          experience = 0;
          size = 0;

          try {
            const experienceAndSize = fs.readFileSync(
              "./results/" + name + "_results_experience_and_size.txt",
              "utf8"
            );
            const experienceAndSizeLines = experienceAndSize.split("\n");

            experience = experienceAndSizeLines[0];
            size = experienceAndSizeLines[1];
          } catch (err) {
            console.log(err);
          }

          if (lines.length > 1) {
            // console.log(lines);

            lines.map((line) => {
              if (line != "") {
                split = line.split(",");
                console.log(split);

                if (split[0] == "NAMING STYLE") {
                  console.log("AWD", name);
                  experienceNamingStyle[name.toString()] = [
                    split[1],
                    split[2],
                    experience,
                  ];
                }
              }
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  });
}

(async () => {
  await parseFiles();

  fs.writeFileSync("./results/experience_naming_style.csv", "");

  for (const key in experienceNamingStyle) {
    console.log(key, experienceNamingStyle[key]);

    fs.appendFileSync(
      "./results/experience_naming_style.csv",
      key +
        "," +
        experienceNamingStyle[key][0] +
        "," +
        experienceNamingStyle[key][1] +
        "," +
        experienceNamingStyle[key][2] +
        "\n"
    );
  }

  console.log("END)");
})();
