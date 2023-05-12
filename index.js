var esprima = require("esprima");
const script = `function myFunc() {
    for (let i = 0; i < 2; i++) {
        console.log(i)
    }
    var x = 9
    return x^2
}`;
tree = esprima.parseScript(script, { tokens: true });

// console.log("First tree");
// console.log(tree);
// console.log();
// console.log("Body of first tree");
// console.log(tree.body[0].body);
// console.log();
// console.log("Variable name");
// console.log(tree.body[0].body.body[1].declarations[0].id.name);
// console.log();
// console.log("Tokens");
// console.log(tree.tokens);
// console.log();
// console.log("Reading file");
// console.log("i am here ");

// File Sync
const fs = require("fs");
const { validateHeaderName } = require("http");

// Read file
const buffer = fs.readFileSync(
  "./test_scripts/200ok-ch-organice-components-entry-index.js"
);

// Get file as string
const fileContent = buffer.toString();

// Removing Hashbang/Shebang from shell scripts
fileContent.replace(/^#!(.*\n)/, "");

var previousNodeType = "";
const first = true;

// console.log(fileContent);
reactTree = esprima.parseScript(
  fileContent,
  { tolerant: true, tokens: true, jsx: true },
  function (node, metadata) {
    // console.log(node.type, node.name, metadata);
    // if (
    //   (previousNodeType == "MethodDefinition" ||
    //     previousNodeType == "FunctionDeclaration" ||
    //     previousNodeType == "FunctionExpression") &&
    //   node.name != undefined
    // ) {
    //   console.log(node.name, metadata);
    // }
    // previousNodeType = node.type;
    // if (
    //   node.type == "MethodDefinition" ||
    //   node.type == "FunctionDeclaration" ||
    //   node.type == "FunctionExpression"
    // )
    //   console.log(node.name);
    // if (node.type == "Identifier") console.log(node.name);
    // console.log(node.type);
    // if (node.type == "Identifier") console.log(node.type, node.name, metadata);
    // if (node.type == "Punctuator") {
    //   console.log(node.type);
    // }
  }
);
// console.log(reactTree);
// console.log(reactTree.tokens);

// return True if the current bracket is invalid and we should reset the check
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

let identifierName = "";
let identifier = false;
let openBracket = false;
let closeBracket = false;
let openCurly = false;

reactTree.tokens.forEach((t) => {
  if (checkInvalidBrackets(t, identifier, openBracket, closeBracket)) {
    resetCheck();
  }

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
    console.log(identifierName);

    resetCheck();
  }
});

// require(['esprima'], function (parser) {
//     // Do something with parser, e.g.
//     var syntax = parser.parse('var answer = 42');
//     console.log(JSON.stringify(syntax, null, 4));
// });
