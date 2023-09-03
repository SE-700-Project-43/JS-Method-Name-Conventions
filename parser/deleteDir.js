const fs = require("fs");

var args = process.argv.slice(2);
const repoName = args[0];

//function to delete a specified repository in the test_scripts folder
function deleteRepo() {
  fs.rmSync("./parser/test_scripts/" + repoName, {
    recursive: true,
    force: true,
  });
}

deleteRepo();
