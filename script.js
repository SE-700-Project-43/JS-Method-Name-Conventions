const fs = require("fs");
const readline = require("readline");

const shell = require("shelljs");
const path = process.cwd() + "/parser/test_scripts";
shell.cd(path);

function cloneRepo(repoName) {
  shell.exec(`git clone ${repoName}`);
}

async function processLineByLine() {
  const fileStream = fs.createReadStream("../../repo_finder/repo_names.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    cloneRepo(line);
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();
