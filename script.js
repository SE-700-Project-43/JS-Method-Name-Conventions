const fs = require("fs");
const readline = require("readline");

const shell = require("shelljs");

const path = process.cwd();

//given the git clone url of a repository, clone the repo into the parser folder
function cloneRepo(repoLink) {
  shell.cd(path + "/parser/test_scripts");
  shell.exec(`git clone ${repoLink}`);
}

//read in file containing JavaScript Github repositories
async function processLineByLine() {
  const fileStream = fs.createReadStream("./repo_finder/repo_names.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const splitName = line.split("/");
    const gitRepoName = splitName[splitName.length - 1];
    const repoName = gitRepoName.substring(0, gitRepoName.length - 4);

    cloneRepo(line);

    shell.cd(path);
    shell.exec(`script.bat ${repoName}`);
  }
}

processLineByLine();
