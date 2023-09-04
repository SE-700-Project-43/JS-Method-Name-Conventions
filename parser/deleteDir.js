const fs = require("fs");

var args = process.argv.slice(2);
const dir = args[0];

//function to delete a specified repository in the test_scripts folder
function deleteRepo() {
  fs.rmSync(dir, {
    recursive: true,
    force: true,
  });
}

deleteRepo();
