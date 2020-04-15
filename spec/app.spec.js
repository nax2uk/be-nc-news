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

      // ERROR `/api/topics `: 405 for **POST**, **PATCH**, **PUT** and **DELETE**
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

      // **GET** `/api/topics`
      describe("#GET", () => {
        // **GET** `/api/topics`- status 200: 
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
              [httpRequestMethod]("/api/users/icellusedkars")
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

        // **GET** `api/users/:username`
        describe("#GET", () => {

          // **GET** `api/users/:username`- status 200
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

          // ERROR: **GET** `api/users/:username`- status 404
          it('status: 404 - username does not exist', () => {
            return request(app)
              .get('/api/users/oiomjijoaerhoahro')
              .expect(404)
              .then(resp => {
                expect(resp.body.msg).to.equals('Resource Not Found: Username does not exist')
              })
          })
        });
      });
    });

    describe("#/articles", () => {
      // **GET** `api/articles`
      describe("#GET", () => { });

      describe("/:article_id", () => {

        // ERROR: 405 for **POST**, **PUT** and **DELETE**  /api/articles/:article_id
        describe("#POST #PUT, #DELETE", () => {
          it("status: 405, responds appropriately because the HTTP method is not allowed", () => {
            const invalidMethods = ["put", "delete", "post"];
            const requests = invalidMethods.map((httpRequestMethod) => {
              return request(app)
              [httpRequestMethod]("/api/articles/1")
                .expect(405)
                .then((resp) => {
                  expect(resp.body.msg).to.equal(
                    "Method Not Allowed: for HTTP POST, PUT and DELETE /api/articles/:article_id"
                  );
                });
            });
            return Promise.all(requests);
          });
        });

        // **GET** `api/articles/:article_id 
        describe("#GET", () => {

          // **GET** `api/articles/:article_id - status 200
          it("status:200, responds with an article object including a comment count property", () => {
            return request(app)
              .get("/api/articles/4")
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
                expect(resp.body.article.comment_count).to.equal('0');
              });
          });

          // ERROR: **GET** `api/articles/:article_id - status 404
          it('status:404, article_id does not exist', () => {
            return request(app)
              .get('/api/articles/1111111111')
              .expect(404)
              .then(resp => {
                expect(resp.body.msg).to.equals('Resource Not Found: article_id does not exists.')
              })
          })
          // ERROR: **GET** `api/articles/:article_id - status 400
          it('status:400, article_id is an invalid type', () => {
            return request(app)
              .get('/api/articles/iuiuo')
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input type for article data')
              })
          })

        });

        // **PATCH** `api/articles/:article_id
        describe("#PATCH", () => {

          // **PATCH** `api/articles/:article_id - status 200
          it('status:200, responds with an article object including comment_count property', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: -1 })
              .expect(200)
              .then(resp => {
                console.log(resp.body.article);
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
                expect(resp.body.article.votes).to.equal(99);
              })
          })
          // ERROR: **PATCH** `api/articles/:article_id - status 404
          it('status: 404, non-existent article_id given', () => {
            return request(app)
              .patch('/api/articles/909090')
              .send({ inc_votes: -1 })
              .expect(404)
              .then(resp => {
                expect(resp.body.msg).to.equal('Resource Not Found: article_id does not exist.')
              })
          })

          // ERROR: **PATCH** `api/articles/:article_id - status 400
          it('status: 404, invalid article type given', () => {
            return request(app)
              .patch('/api/articles/aiojijojeofnuninfe')
              .send({ inc_votes: -1 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input type for article data')
              })
          })
        });

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
