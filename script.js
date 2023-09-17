const fs = require("fs");
const readline = require("readline");
const fetch = require("node-fetch");
const shell = require("shelljs");
require("dotenv").config();

const path = process.cwd();

//given the git clone url of a repository, clone the repo into the parser folder
function cloneRepo(repoLink) {
  shell.cd(path + "/parser/test_scripts");
  shell.exec(`git clone ${repoLink}`);
}

async function getContributors(url, token) {
  const usernames = [];

  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.map((user) => {
        usernames.push(user.login);
      });
    });

  return usernames;
}

async function getUserCreatedAt(username, token) {
  date = "";

  await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      date = data.created_at;
    });

  return date;
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
    const ownerName = splitName[splitName.length - 2];
    const gitRepoName = splitName[splitName.length - 1];
    const repoName = gitRepoName.substring(0, gitRepoName.length - 4);

    username = "mlai962";
    password = process.env.GITHUB_TOKEN;

    usernames = await getContributors(
      `https://api.github.com/repos/${ownerName}/${gitRepoName.replace(
        ".git",
        ""
      )}/contributors?per_page=100`,
      password
    );

    const getAges = (usernames) => {
      const promises = usernames.map(async (username) => {
        return await getUserCreatedAt(username, password);
      });
      return Promise.all(promises);
    };

    dates = await getAges(usernames).then((data) => data);

    ages = dates.map((date) => {
      year = date.split("-")[0];
      return 2023 - year;
    });

    size = usernames.length;
    experience = 0;

    ages.map((age) => {
      experience += age;
    });

    experience = experience / size;

    fs.writeFileSync(
      `./results/${repoName}_results_experience_and_size.txt`,
      ""
    );

    fs.appendFileSync(
      `./results/${repoName}_results_experience_and_size.txt`,
      experience.toFixed(1)
    );

    fs.appendFileSync(
      `./results/${repoName}_results_experience_and_size.txt`,
      "\n"
    );

    fs.appendFileSync(
      `./results/${repoName}_results_experience_and_size.txt`,
      size.toString()
    );

    cloneRepo(line);

    shell.cd(path);
    shell.exec(`script.bat ${repoName} ${ownerName}`);
  }
}

processLineByLine();
