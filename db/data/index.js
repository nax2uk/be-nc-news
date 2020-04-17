const ENV = process.env.NODE_ENV || "development";
const devData = require("./development-data");
const testData = require("./test-data");

const data = {
  development: devData,
  production: devData,
  test: testData,
};

module.exports = data[ENV];
//heroku:
//const data = { test, development, production: development };