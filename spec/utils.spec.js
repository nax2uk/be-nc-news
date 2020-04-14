const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array of objects", () => {
    const inputArr = [];
    const actualOutput = makeRefObj(inputArr);
    const expectedOutput = {};
    expect(actualOutput).to.eql(expectedOutput);
  }); //
  it("returns the correct lookup object when passed an array of object of length 1", () => {
    const inputArr = [{ article_id: 1, title: "A" }];
    const actualOutput = makeRefObj(inputArr);
    const expectedOutput = { A: 1 };
    expect(actualOutput).to.eql(expectedOutput);
  });
  it("returns the correct lookup object when passed an array of objects", () => {
    const inputArr = [
      { article_id: 1, title: "A" },
      { article_id: 3, title: "C" },
      { article_id: 2, title: "B" },
    ];
    const actualOutput = makeRefObj(inputArr);
    const expectedOutput = { A: 1, B: 2, C: 3 };
    expect(actualOutput).to.eql(expectedOutput);
  });
});

describe("formatComments", () => {});
