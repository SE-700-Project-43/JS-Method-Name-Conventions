const fs = require("fs");
const { dirname } = require("path");

const { readdir } = require("fs").promises;
const { validateHeaderName } = require("http");

const getFileList = async (dirName) => {
  let files = [];
  const items = await readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      if (item.name.endsWith(".js")) {
        files.push(`${dirName}/${item.name}`);
      }
    }
  }

  return files;
};

module.exports = getFileList;
