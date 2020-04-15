process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run())
after(() => connection.destroy());

describe("#app", () => {
  describe("#/api", () => {
    // ERROR : 404 for invalid paths
    describe("#handle error for invalid paths", () => {
      it("status:404, gives error when invalid path given by user", () => {
        return request(app)
          .get("/not-a-route")
          .expect(404)
          .then((resp) => {
            expect(resp.body.msg).to.equal(
              "Invalid URL: Your specified path does not exist."
            );
          });
      });
    });

    // **GET** `/api`-
    describe("#GET", () => { });

    describe("#/topics", () => {
      // ERROR: 405 for **POST**, **PATCH**, **PUT** and **DELETE**  /api/topics
      describe("#POST #PUT, #DELETE #PATCH", () => {
        it("status: 405, responds appropriately because the HTTP method is not allowed", () => {
          const invalidMethods = ["put", "delete", "patch", "post"];
          const requests = invalidMethods.map((httpRequestMethod) => {
            return request(app)
            [httpRequestMethod]("/api/topics")
              .expect(405)
              .then((resp) => {
                expect(resp.body.msg).to.equal(
                  "Method Not Allowed: for HTTP POST, PUT, PATCH and DELETE /api/topics"
                );
              });
          });
          return Promise.all(requests);
        });
      });

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
      describe("#/:username", () => {
        // ERROR: 405 for **POST**, **PATCH**, **PUT** and **DELETE**  /api/users/:username
        describe("#POST #PUT, #DELETE #PATCH", () => {
          it("status: 405, responds appropriately because the HTTP method is not allowed", () => {
            const invalidMethods = ["put", "delete", "patch", "post"];
            const requests = invalidMethods.map((httpRequestMethod) => {
              return request(app)
              [httpRequestMethod]("/api/users/aijoijfpamopeanbvieojmvokoim")
                .expect(405)
                .then((resp) => {
                  expect(resp.body.msg).to.equal(
                    "Method Not Allowed: for HTTP POST, PUT, PATCH and DELETE /api/users/:username"
                  );
                });
            });
            return Promise.all(requests);
          });
        });

        // **GET** `api/users/:user_id`
        describe("#GET", () => {
          it("status: 200, responds with an array of user objects", () => {
            return request(app)
              .get("/api/users/icellusedkars")
              .expect(200)
              .then((resp) => {
                expect(resp.body.user).to.have.all.keys([
                  "avatar_url",
                  "name",
                  "username",
                ]);
              });
          });
        });
      });
    });

    describe("#/articles", () => {
      // **GET** `api/articles`
      describe("#GET", () => { });

      describe("/:article_id", () => {
        // **GET** `api/articles/:article_id
        describe("#GET", () => {
          it("status:200, responds with an article object including a comment count property", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then((resp) => {
                expect(resp.body.article).to.have.all.keys([
                  "author",
                  "title",
                  "article_id",
                  "body",
                  "topic",
                  "created_at",
                  "votes",
                  "comment_count",
                ]);
              });
          });
        });

        // **PATCH** `api/articles/:article_id
        describe("#PATCH", () => { });

        describe("#/comments", () => {
          // **GET** `api/articles/:article_id/comments
          describe("#GET", () => { });

          // **POST** `api/articles/:article_id/comments
          describe("#POST", () => { });
        });
      });
    });

    describe("#/comments", () => {
      describe("#/:comment_id", () => {
        // **PATCH** `/api/comments/:comment_id`
        describe("#PATCH", () => { });
        // **DELETE** `/api/comments/:comment_id`
        describe("#DELETE", () => { });
      });
    });
  });
});
