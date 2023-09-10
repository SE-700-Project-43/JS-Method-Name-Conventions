const { getAllFiles } = require("./parser/fileReader");
const fs = require("fs");

namingStyle = {};
grammaticalStructure = {};
verbPhrase = {};
dictionaryTerms = {};
fullWords = {};
length = {};
abbreviations = {};
acronyms = {};

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
            array[split[0]] = [split[1], split[2], split[3], split[4]];
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

if (fs.existsSync("./results/experience_naming_style.csv")) {
  readCounts("./results/experience_size_naming_style.csv", namingStyle);
  readCounts(
    "./results/experience_size_grammatical_structure.csv",
    grammaticalStructure
  );
  readCounts("./results/experience_size_verb_phrase.csv", verbPhrase);
  readCounts("./results/experience_size_dictionary_terms.csv", dictionaryTerms);
  readCounts("./results/experience_size_full_words.csv", fullWords);
  readCounts("./results/experience_size_length.csv", length);
  readCounts("./results/experience_size_abbreviations.csv", abbreviations);
  readCounts("./results/experience_size_acronyms.csv", acronyms);

  console.log("AWDAWFAWDAWD", namingStyle);
}

function addStat(name, split, convention, array) {
  if (split[0] == convention) {
    // console.log("AWD", name);
    array[name.toString()] = [split[1], split[2], experience, size];
  }
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

                addStat(name, split, "NAMING STYLE", namingStyle);
                addStat(
                  name,
                  split,
                  "GRAMMATICAL STRUCTURE",
                  grammaticalStructure
                );
                addStat(name, split, "VERB PHRASE", verbPhrase);
                addStat(name, split, "DICTIONARY TERMS", dictionaryTerms);
                addStat(name, split, "FULL WORDS", fullWords);
                addStat(name, split, "LENGTH", length);
                addStat(name, split, "ABBREVIATIONS", abbreviations);
                addStat(name, split, "ACRONYMS", acronyms);

                // if (split[0] == "NAMING STYLE") {
                //   console.log("AWD", name);
                //   namingStyle[name.toString()] = [
                //     split[1],
                //     split[2],
                //     experience,
                //     size,
                //   ];
                // }
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

function writeFile(file, array) {
  for (const key in array) {
    // console.log(key, namingStyle[key]);

    fs.appendFileSync(
      file,
      key +
        "," +
        array[key][0] +
        "," +
        array[key][1] +
        "," +
        array[key][2] +
        "," +
        array[key][3] +
        "\n"
    );
  }
}

(async () => {
  await parseFiles();

  fs.writeFileSync("./results/experience_size_naming_style.csv", "");
  fs.writeFileSync("./results/experience_size_grammatical_structure.csv", "");
  fs.writeFileSync("./results/experience_size_verb_phrase.csv", "");
  fs.writeFileSync("./results/experience_size_dictionary_terms.csv", "");
  fs.writeFileSync("./results/experience_size_full_words.csv", "");
  fs.writeFileSync("./results/experience_size_length.csv", "");
  fs.writeFileSync("./results/experience_size_abbreviations.csv", "");
  fs.writeFileSync("./results/experience_size_acronyms.csv", "");

  writeFile("./results/experience_size_naming_style.csv", namingStyle);
  writeFile(
    "./results/experience_size_grammatical_structure.csv",
    grammaticalStructure
  );
  writeFile("./results/experience_size_verb_phrase.csv", verbPhrase);
  writeFile("./results/experience_size_dictionary_terms.csv", dictionaryTerms);
  writeFile("./results/experience_size_full_words.csv", fullWords);
  writeFile("./results/experience_size_length.csv", length);
  writeFile("./results/experience_size_abbreviations.csv", abbreviations);
  writeFile("./results/experience_size_acronyms.csv", acronyms);

  // for (const key in namingStyle) {
  //   console.log(key, namingStyle[key]);

  //   fs.appendFileSync(
  //     "./results/experience_size_naming_style.csv",
  //     key +
  //       "," +
  //       namingStyle[key][0] +
  //       "," +
  //       namingStyle[key][1] +
  //       "," +
  //       namingStyle[key][2] +
  //       "," +
  //       namingStyle[key][3] +
  //       "\n"
  //   );
  // }
})();
