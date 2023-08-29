var esprima = require("esprima");
const fs = require("fs");

const generateMethodNames = async (fileDirectory) => {
  const buffer = fs.readFileSync(fileDirectory);
  fileContent = buffer.toString();

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

module.exports = generateMethodNames;
