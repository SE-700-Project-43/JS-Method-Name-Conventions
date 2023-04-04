var esprima = require("esprima");
script = `function myFunc() {
    for (let i = 0; i < 2; i++) {
        console.log(i)
    }
    var x = 9
    return x^2
}`;
tree = esprima.parseScript(script, { tokens: true });

console.log("First tree");
console.log(tree);
console.log();
console.log("Body of first tree");
console.log(tree.body[0].body);
console.log();
console.log("Variable name");
console.log(tree.body[0].body.body[1].declarations[0].id.name);
console.log();
console.log("Tokens");
console.log(tree.tokens);
console.log();
console.log("Reading file");

const fs = require("fs");
const buffer = fs.readFileSync("testModuleFromReact.js");
const fileContent = buffer.toString();
fileContent.replace(/^#!(.*\n)/, "");

// console.log(fileContent);

reactTree = esprima.parseModule(fileContent);
console.log(reactTree);

// require(['esprima'], function (parser) {
//     // Do something with parser, e.g.
//     var syntax = parser.parse('var answer = 42');
//     console.log(JSON.stringify(syntax, null, 4));
// });
