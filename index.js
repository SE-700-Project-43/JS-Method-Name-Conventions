// var esprima = require('esprima')
// script = `function myFunc() {
//     for (let i = 0; i < 2; i++) {
//         console.log(i)
//     }
//     var x = 9
//     return x^2
// }`
// tree = esprima.parseScript(script)


// console.log(tree)
// console.log(tree.body[0].body)
// console.log(tree.body[0].body.body[1].declarations[0].id.name)

require(['esprima'], function (parser) {
    // Do something with parser, e.g.
    var syntax = parser.parse('var answer = 42');
    console.log(JSON.stringify(syntax, null, 4));
});