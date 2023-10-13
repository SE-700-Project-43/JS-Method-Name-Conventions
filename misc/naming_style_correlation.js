const stats = require("statistics.js");
const fs = require("fs");

function calculateCorrelation(array) {
  var experience = [];
  var size = [];

  for (const key in array) {
    experience.push({
      exp: Number(array[key][2]),
      conv: Number(array[key][1]),
    });
    size.push({ size: Number(array[key][3]), conv: Number(array[key][1]) });
  }

  var expVars = {
    exp: "metric",
    conv: "metric",
  };

  var sizeVars = {
    size: "metric",
    conv: "metric",
  };

  var s = new stats.Statistics(experience, expVars);
  var expR = s.correlationCoefficient("exp", "conv");

  var s = new stats.Statistics(size, sizeVars);
  var sizeR = s.correlationCoefficient("size", "conv");

  return [expR.correlationCoefficient, sizeR.correlationCoefficient];
}

const data = fs.readFileSync("corrected_naming_style_adherence.csv", "utf8");
const lines = data.split("\r\n");

array = {};

if (lines.length > 1) {
  lines.map((line) => {
    if (line != "") {
      split = line.split(",");

      array[split[0]] = [split[1], split[3], split[4], split[5]];
    }
  });

  console.log(calculateCorrelation(array));
}
