process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

after(() => connection.destroy());

describe("#app", () => {
  describe("#/api", () => {
    // ERROR : 404 for invalid paths
    describe("#handle error for invalid paths", () => {
      it("status:404, gives error when invalid path given by user", () => {
        return request(app)
          .get("/invalid-path")
          .expect(404)
          .then((resp) => {
            expect(resp.body.msg).to.equal(
              "Invalid URL: Your specified path does not exist."
            );
          });
      });
    });

    // **GET** `/api`-
    describe("#GET", () => {});

    describe("#/topics", () => {
      // **GET** `/api/topics`- checks response with an array of topic objects
      describe("#GET", () => {
        it("status: 200, responds with an array of topic objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then((resp) => {
              expect(resp.body.topics).to.be.an("array");
              resp.body.topics.forEach((obj) => {
                expect(obj).to.have.all.keys(["slug", "description"]);
              });
            });
        });
      });
    });

    describe("#/users", () => {
      // **GET** `api/users`
      describe("#GET", () => {});
    });

    describe("#/articles", () => {
      // **GET** `api/articles`
      describe("#GET", () => {});

      describe("/:article_id", () => {
        // **GET** `api/articles/:article_id
        describe("#GET", () => {});

        // **PATCH** `api/articles/:article_id
        describe("#PATCH", () => {});

        describe("#/comments", () => {
          // **GET** `api/articles/:article_id/comments
          describe("#GET", () => {});

          // **POST** `api/articles/:article_id/comments
          describe("#POST", () => {});
        });
      });
    });

    describe("#/comments", () => {
      describe("#/:comment_id", () => {
        // **PATCH** `/api/comments/:comment_id`
        describe("#PATCH", () => {});
        // **DELETE** `/api/comments/:comment_id`
        describe("#DELETE", () => {});
      });
    });
  });
});
