var esprima = require("esprima");
const fs = require("fs");

const generateMethodNames = async (fileDirectory) => {
  const buffer = fs.readFileSync(fileDirectory);
  fileContent = buffer.toString();

  // try {
  //   var count = 0;

  //   const tree = esprima.parseScript(fileContent, {
  //     tolerant: true,
  //     tokens: true,
  //     jsx: true,
  //     loc: true,
  //     range: true,
  //   });

  //   let identifierName = "";
  //   let identifierToken = null;
  //   let identifier = false;
  //   let openBracket = false;
  //   let closeBracket = false;
  //   let names = [];
  //   let lines = [];
  //   let equals = false;

  //   function resetCheck() {
  //     identifier = false;
  //     openBracket = false;
  //     closeBracket = false;
  //     equals = false;
  //   }

  //   tree.tokens.forEach((t) => {
  //     if (checkInvalidBrackets(t, identifier, openBracket, closeBracket)) {
  //       resetCheck();
  //     }

  //     // console.log(t);
  //     // console.log(t.value, t.loc);

  //     if (identifier && !equals && t.type == "Punctuator" && t.value == "=") {
  //       equals = true;
  //     } else if (
  //       identifier &&
  //       equals &&
  //       t.type == "Punctuator" &&
  //       t.value == "=>"
  //     ) {
  //       names = names.concat(identifierName);
  //       lines = lines.concat(identifierToken.loc.start.line);
  //       // console.log(identifierName, identifierToken.loc.start.line);
  //       count++;

  //       resetCheck();
  //     }

  //     if (t.type == "Identifier" && !openBracket && t.value != "async") {
  //       identifierName = t.value;
  //       identifierToken = t;
  //       identifier = true;
  //       openBracket = false;
  //       closeBracket = false;
  //     } else if (
  //       identifier &&
  //       !openBracket &&
  //       !closeBracket &&
  //       t.type == "Punctuator" &&
  //       t.value == "("
  //     ) {
  //       openBracket = true;
  //     } else if (
  //       identifier &&
  //       openBracket &&
  //       !closeBracket &&
  //       t.type == "Punctuator" &&
  //       t.value == ")"
  //     ) {
  //       closeBracket = true;
  //     } else if (
  //       identifier &&
  //       openBracket &&
  //       closeBracket &&
  //       t.type == "Punctuator" &&
  //       t.value == "{"
  //     ) {
  //       names = names.concat(identifierName);
  //       lines = lines.concat(identifierToken.loc.start.line);
  //       // console.log(identifierName, identifierToken.loc.start.line);
  //       count++;

  //       resetCheck();
  //     }
  //   });

  let AST = [];
  const names = [];
  const lines = [];
  let count = 0;

  const functionTypes = [
    "FunctionDeclaration",
    "ArrowFunctionDeclaration",
    "FunctionExpression",
    "ArrowFunctionExpression",
  ];

  try {
    AST = esprima.parseScript(
      fileContent,
      {
        tolerant: true,
        jsx: true,
        loc: true,
        range: true,
        tokens: true,
      },
      function (node, meta) {
        //   console.log(meta);
        if (
          node.type == "VariableDeclarator" &&
          node.init &&
          functionTypes.includes(node.init.type)
        ) {
          if (node.init.id != null) {
            names.push(node.init.id.name);
            lines.push(meta.start.line);
            count++;
          } else if (node.id && node.id.name != null) {
            names.push(node.id.name);
            lines.push(meta.start.line);
            count++;
          }
        } else if (
          node.type == "AssignmentExpression" &&
          node.left &&
          node.right &&
          node.left.property &&
          node.left.property.type &&
          node.left.property.type == "Identifier" &&
          functionTypes.includes(node.right.type)
        ) {
          if (node.right.id != null) {
            if (node.left.property.name == "onopen") {
              console.log("onSocketOpen");
              console.log(node);
            }
            names.push(node.right.id.name);
            lines.push(meta.start.line);
            count++;
          } else if (node.left.property.name != null) {
            names.push(node.left.property.name);
            lines.push(meta.start.line);
            count++;
          }
        } else if (
          functionTypes.includes(node.type) &&
          node.id &&
          node.id.name &&
          node.id.name != null
        ) {
          if (node.id.name == "onSocketOpen") {
            console.log("onSocketOpen");
            console.log(node);
          }
          names.push(node.id.name);
          lines.push(meta.start.line);
          count++;
        }
      }
    );
  } catch (e) {
    return [];
  }

  // console.log(fileDirectory);
  // names.map((name) => console.log(name));

  lineCount = fileContent.split("\n").length;

  // console.log(lineCount + " " + count);
  return [lineCount, count, names, lines];
};

function checkInvalidBrackets(token, identifier, openBracket, closeBracket) {
  type = token.type;
  value = token.value;

  if (type == "Punctuator") {
    if (value == "," || value == ";" || value == ":") {
      return true;
    }

    if (
      identifier &&
      !openBracket &&
      !closeBracket &&
      (value == ")" || value == "}" || value == "{")
    ) {
      return true;
    } else if (identifier && openBracket && !closeBracket && value == "(") {
      return true;
    } else if (
      identifier &&
      openBracket &&
      closeBracket &&
      (value == "(" || value == ")" || value == "}")
    ) {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = generateMethodNames;
