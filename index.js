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
console.log("Reading file");
console.log("i am here ");

// File Sync
const fs = require("fs");

// Read file
const buffer = fs.readFileSync("testModule2.js");

// Get file as string
const fileContent = buffer.toString();

// Removing Hashbang/Shebang from shell scripts
fileContent.replace(/^#!(.*\n)/, "");

// console.log(fileContent);
reactTree = esprima.parseModule(
  fileContent,
  { tolerant: true, tokens: true },
  function (node, metadata) {
    if (node.type == "Identifier") console.log(node.type, node.name, metadata);
  }
);
// console.log(reactTree);
// console.log(reactTree.tokens);

// require(['esprima'], function (parser) {
//     // Do something with parser, e.g.
//     var syntax = parser.parse('var answer = 42');
//     console.log(JSON.stringify(syntax, null, 4));
// });
