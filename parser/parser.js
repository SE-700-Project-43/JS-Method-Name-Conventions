var esprima = require("esprima");
const fs = require("fs");

const generateMethodNames = async (fileDirectory) => {
  // var loc = window.location.pathname;
  // var dir = loc.substring(0, loc.lastIndexOf("/"));
  // console.log("Current directory: " + process.cwd());
  // console.log(fileDirectory);
  const buffer = fs.readFileSync(fileDirectory);
  fileContent = buffer.toString();

  // fs.createReadStream(fileDirectory)
  //   .on("data", function (chunk) {
  //     console.log("huhhh", chunk);
  //     for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) lineCount++;
  //   })
  //   .on("end", function () {
  //     // console.log(count);
  //   });
  // filePath = process.argv[2];

  try {
    var count = 0;

    const tree = esprima.parseScript(fileContent, {
      tolerant: true,
      tokens: true,
      jsx: true,
    });

    let identifierName = "";
    let identifier = false;
    let openBracket = false;
    let closeBracket = false;
    let openCurly = false;

    tree.tokens.forEach((t) => {
      if (checkInvalidBrackets(t, identifier, openBracket, closeBracket)) {
        // resetCheck();

        identifier = false;
        openBracket = false;
        closeBracket = false;
        openCurly = false;
        // console.log("123", identifier, openBracket, closeBracket, openCurly);
      }
      // console.log(t);
      if (t.type == "Identifier" && !identifier) {
        identifierName = t.value;
        identifier = true;
      } else if (
        identifier &&
        !openBracket &&
        !closeBracket &&
        !openCurly &&
        t.type == "Punctuator" &&
        t.value == "("
      ) {
        openBracket = true;
      } else if (
        identifier &&
        openBracket &&
        !closeBracket &&
        !openCurly &&
        t.type == "Punctuator" &&
        t.value == ")"
      ) {
        closeBracket = true;
      } else if (
        identifier &&
        openBracket &&
        closeBracket &&
        !openCurly &&
        t.type == "Punctuator" &&
        t.value == "{"
      ) {
        openCurly = true;
      }

      if (openCurly) {
        // console.log(identifierName);
        count++;

        // resetCheck();
        identifier = false;
        openBracket = false;
        closeBracket = false;
        openCurly = false;
      }
    });

    fileBuffer = fs.readFileSync(fileDirectory);
    to_string = fileBuffer.toString();
    split_lines = to_string.split("\n");
    var lineCount = split_lines.length - 1;

    console.log(lineCount + " " + count);
    return [lineCount, count];
  } catch (e) {
    return [];
  }
};

function checkInvalidBrackets(token, identifier, openBracket, closeBracket) {
  type = token.type;
  value = token.value;

  if (type == "Punctuator") {
    if (
      identifier &&
      !openBracket &&
      !closeBracket &&
      (value == ")" || value == "}" || value == "{" || value == ";")
    ) {
      return true;
    } else if (
      identifier &&
      openBracket &&
      !closeBracket &&
      (value == "(" || value == ";")
    ) {
      return true;
    } else if (
      identifier &&
      openBracket &&
      closeBracket &&
      (value == "(" || value == ")" || value == "}" || value == ";")
    ) {
      return true;
    }
  } else {
    return false;
  }
}

function resetCheck() {
  identifier = false;
  openBracket = false;
  closeBracket = false;
  openCurly = false;
}

module.exports = generateMethodNames;
