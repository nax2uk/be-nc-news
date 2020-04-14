const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed an empty array", () => {
    const inputArr = [];
    const actualOutput = formatDates(inputArr);
    const expectedOutput = [];
    expect(actualOutput).to.eql(expectedOutput);
  });
  it("returns correct obj array when passed an obj array of length 1", () => {
    const inputArr = [
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
    ];
    const actualOutput = formatDates(inputArr);
    expect(actualOutput[0]).to.deep.equal({
      body: "I am 100% sure that we're not completely sure.",
      belongs_to: "UNCOVERED: catspiracy to bring down democracy",
      created_by: "butter_bridge",
      votes: 1,
      created_at: new Date(1069850163389),
    });
  });
  it("returns correct array of objects when passed an array of objects", () => {
    const inputArr = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 975242163389,
      },
    ];
    const actualOutput = formatDates(inputArr);
    actualOutput.forEach((obj, index) => {
      expect(obj).to.deep.equal({
        body: inputArr[index].body,
        belongs_to: inputArr[index].belongs_to,
        created_by: inputArr[index].created_by,
        votes: inputArr[index].votes,
        created_at: new Date(inputArr[index].created_at),
      });
    });
  });

  it("test for mutation", () => {
    const inputArr = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 975242163389,
      },
    ];
    const controlArray = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 975242163389,
      },
    ];
    formatDates(inputArr);
    expect(inputArr).to.eql(controlArray);
  });
});

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

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    const inputArr = [];
    const objRef = { A: 1, B: 2, C: 3 };
    const actualOutput = formatComments(inputArr, objRef);
    const expectedOutput = [];
    expect(actualOutput).to.eql(expectedOutput);
  });
  it("returns the correct formatted arr of comments object when passed array of length 1", () => {
    const inputArr = [
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
    ];
    const objRef = { "UNCOVERED: catspiracy to bring down democracy": 1 };
    const actualOutput = formatComments(inputArr, objRef);
    const expectedOutput = {
      body: "I am 100% sure that we're not completely sure.",
      author: "butter_bridge",
      votes: 1,
      article_id: 1,
      created_at: new Date(1069850163389),
    };
    expect(actualOutput[0]).to.eql(expectedOutput);
  });

  it("returns correctly formatted array of comments when passed an array of multiple", () => {
    const inputArr = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 975242163389,
      },
    ];
    const objRef = {
      "UNCOVERED: catspiracy to bring down democracy": 1,
      "Living in the shadow of a great man": 2,
      "They're not exactly dogs, are they?": 3,
    };
    const actualOutput = formatComments(inputArr, objRef);
    actualOutput.forEach((obj, index) => {
      expect(obj).to.deep.equal({
        body: inputArr[index].body,
        author: inputArr[index].created_by,
        votes: inputArr[index].votes,
        created_at: new Date(inputArr[index].created_at),
        article_id: objRef[inputArr[index].belongs_to],
      });
    });
  });
  it("test for mutation", () => {
    const inputArr = [
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
    ];
    const objRef = { "UNCOVERED: catspiracy to bring down democracy": 1 };
    const controlArray = [
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
    ];
    formatComments(inputArr, objRef);
    expect(inputArr).to.deep.equal(controlArray);
  });
});
