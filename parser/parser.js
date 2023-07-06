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
      loc: true,
      range: true,
    });

    let identifierName = "";
    let identifierToken = null;
    let identifier = false;
    let openBracket = false;
    let closeBracket = false;
    let names = [];
    let lines = [];

    function resetCheck() {
      identifier = false;
      openBracket = false;
      closeBracket = false;
    }

    tree.tokens.forEach((t) => {
      if (checkInvalidBrackets(t, identifier, openBracket, closeBracket)) {
        resetCheck();
      }

      // console.log(t);
      // console.log(t.value, t.loc);

      if (t.type == "Identifier") {
        identifierName = t.value;
        identifierToken = t;
        identifier = true;
        openBracket = false;
        closeBracket = false;
      } else if (
        identifier &&
        !openBracket &&
        !closeBracket &&
        t.type == "Punctuator" &&
        t.value == "("
      ) {
        openBracket = true;
      } else if (
        identifier &&
        openBracket &&
        !closeBracket &&
        t.type == "Punctuator" &&
        t.value == ")"
      ) {
        closeBracket = true;
      } else if (
        identifier &&
        openBracket &&
        closeBracket &&
        t.type == "Punctuator" &&
        t.value == "{"
      ) {
        names = names.concat(identifierName);
        lines = lines.concat(identifierToken.loc.start.line);
        // console.log(identifierName, identifierToken.loc.start.line);
        count++;

        resetCheck();
      }
    });

    fileBuffer = fs.readFileSync(fileDirectory);
    to_string = fileBuffer.toString();
    split_lines = to_string.split("\n");
    var lineCount = split_lines.length - 1;

    console.log(lineCount + " " + count);
    return [lineCount, count, names, lines];
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

module.exports = generateMethodNames;
