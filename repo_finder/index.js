const fetch = require("node-fetch");

var args = process.argv.slice(2);

const date = args[0];

const fs = require("fs");

fetch(
  `https://api.github.com/search/repositories?q=%20created:<${date}%20language:JavaScript&per_page=100`
)
  .then((res) => res.json())
  .then((data) => {
    data.items.map((repo) => {
      fs.appendFileSync("./repo_finder/repo_names.txt", repo.clone_url + "\n");
    });
  });