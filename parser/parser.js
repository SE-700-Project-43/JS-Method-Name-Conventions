var esprima = require("esprima");
const fs = require("fs");

const generateMethodNames = async (fileDirectory) => {
  const buffer = fs.readFileSync(fileDirectory);
  fileContent = buffer.toString();

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
    let names = [];

    tree.tokens.forEach((t) => {
      if (checkInvalidBrackets(t, identifier, openBracket, closeBracket)) {
        identifier = false;
        openBracket = false;
        closeBracket = false;
        openCurly = false;
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
        names = names.concat(identifierName);
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
    return [lineCount, count, names];
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
