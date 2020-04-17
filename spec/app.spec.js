process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

chai.use(require('chai-sorted'));

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

    // ERROR `/api `: 405 for **POST**, **PATCH**, **PUT** and **DELETE**
    describe("#POST #PUT, #DELETE, #PATCH", () => {
      it("status:405, responds appropriately because the HTTP method is not allowed", () => {
        const invalidMethods = ["put", "delete", "patch", "post"];
        const requests = invalidMethods.map((httpRequestMethod) => {
          return request(app)
          [httpRequestMethod]("/api")
            .expect(405)
            .then((resp) => {
              expect(resp.body.msg).to.equal(
                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api`
              );
            });
        });
        return Promise.all(requests);
      });
    });

    // **GET** `/api`-
    describe.only("#GET", () => {
      it('status:200, responds with a JSON describing all available endpoints', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then(resp => {
            expect(resp.body.api).to.have.all.keys([
              "GET /api",
              "GET /api/topics",
              "GET /api/users/:username",
              "GET /api/articles",
              "GET /api/articles/:article_id",
              "PATCH /api/articles/:article_id",
              "GET /api/articles/:article_id/comments",
              "POST /api/articles/:article_id/comments",
              "PATCH /api/comments/:comment_id",
              "DELETE /api/comments/:comment_id"]);
          })
      })
    });






    // `/api/topics`
    describe("#/topics", () => {

      // ERROR `/api/topics `: 405 for **POST**, **PATCH**, **PUT** and **DELETE**
      describe("#POST #PUT, #DELETE #PATCH", () => {
        it("status:405, responds appropriately because the HTTP method is not allowed", () => {
          const invalidMethods = ["put", "delete", "patch", "post"];
          const requests = invalidMethods.map((httpRequestMethod) => {
            return request(app)
            [httpRequestMethod]("/api/topics")
              .expect(405)
              .then((resp) => {
                expect(resp.body.msg).to.equal(
                  `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/topics`
                );
              });
          });
          return Promise.all(requests);
        });
      });

      // **GET** `/api/topics`
      describe("#GET", () => {
        // **GET** `/api/topics`- status 200: 
        it("status:200, responds with an array of topic objects", () => {
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

      // `/api/username/:username
      describe("#/:username", () => {

        // ERROR: 405 for **POST**, **PUT**, **PATCH** and **DELETE**  /api/users/:username
        describe("#POST #PUT, #DELETE, #PATCH", () => {
          it("status:405, responds appropriately because the HTTP method is not allowed", () => {
            const invalidMethods = ["put", "delete", "post", "patch"];
            const requests = invalidMethods.map((httpRequestMethod) => {
              return request(app)
              [httpRequestMethod]("/api/users/1")
                .expect(405)
                .then((resp) => {
                  expect(resp.body.msg).to.equal(
                    `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/users/1`
                  );
                });
            });
            return Promise.all(requests);
          });
        });

        // `api/users/:username`
        describe("#GET", () => {

          // **GET** `api/users/:username`- status 200
          it("status:200, responds with an array of user objects", () => {
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
          it('status:404, username does not exist', () => {
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


    // `api/articles`
    describe("#/articles", () => {

      // ERROR: 405 for **POST**, **PUT** and **DELETE**  /api/articles/:article_id
      describe("#POST #PUT, #DELETE, #PATCH", () => {
        it("status:405, responds appropriately because the HTTP method is not allowed", () => {
          const invalidMethods = ["put", "delete", "post", "patch"];
          const requests = invalidMethods.map((httpRequestMethod) => {
            return request(app)
            [httpRequestMethod]("/api/articles")
              .expect(405)
              .then((resp) => {
                expect(resp.body.msg).to.equal(
                  `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/articles`
                );
              });
          });
          return Promise.all(requests);
        });
      });

      // **GET** `api/articles`
      describe("#GET", () => {

        // **GET** `api/articles` - status:200
        it('status:200, responds with an array of articles with the correct properties', () => {
          return request(app)
            .get('/api/articles')
            .expect(200)
            .then(resp => {
              expect(resp.body.articles).to.be.an('array');
              expect(resp.body.articles.length).to.equal(12)
              resp.body.articles.forEach(obj => {
                expect(obj).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'])
              })
            })
        })

        // **GET** `api/articles` - status:200
        it('status:200, responds with an array of articles default sorted by created_at descending', () => {
          return request(app)
            .get('/api/articles')
            .expect(200)
            .then(resp => {
              expect(resp.body.articles).to.be.descendingBy('created_at')
            })
        })

        // **GET** `api/articles` - status:200
        it('status:200, responds with an array of articles default sorted by query column passed and descending', () => {
          return request(app)
            .get('/api/articles?sort_by=article_id')
            .expect(200)
            .then(resp => {
              expect(resp.body.articles).to.be.descendingBy('article_id')
            })
        })

        // **GET** `api/articles` - status:200
        it('status:200, responds with an array of articles filtered by query author', () => {
          return request(app)
            .get('/api/articles?sort_by=article_id&&order=desc&&author=butter_bridge')
            .expect(200)
            .then(resp => {
              expect(resp.body.articles).to.be.descendingBy('article_id')
              expect(resp.body.articles.length).to.equal(3)
            })//rogersop
        })

        // **GET** `api/articles` - status:200
        it('status:200, responds with an array of articles filtered by query author and topic', () => {
          return request(app)
            .get('/api/articles?sort_by=article_id&&order=desc&&author=rogersop&&topic=mitch')
            .expect(200)
            .then(resp => {
              expect(resp.body.articles).to.be.descendingBy('article_id')
              expect(resp.body.articles.length).to.equal(2)
            })//rogersop
        })

        // **GET** `api/articles` - status:400
        it('status:400, sort_by a column that does not exist', () => {
          return request(app)
            .get('/api/articles?sort_by=username')
            .expect(400)
            .then(resp => {
              expect(resp.body.msg).to.equals('Bad Request: Invalid input data.')
            })
        })

        // **GET** `api/articles` - status:400
        it('status:400, order!==asc or desc', () => {
          return request(app)
            .get('/api/articles?sort_by=author&&order=abc')
            .expect(400)
            .then(resp => {
              expect(resp.body.msg).to.equals('Bad Request: Invalid input data.')
            })
        })

        // **GET** `api/articles` - status:404
        it('status:404, topic or author does not exist in db', () => {
          return request(app)
            .get('/api/articles?topic=bored&&author=azlina')
            .expect(404)
            .then(resp => {
              expect(resp.body.msg).to.equals('Resource not found: cannot display results for query')
            })
        })

        // **GET** `api/articles` - status:404
        it('status:404, author exists in db but no articles associated', () => {
          return request(app)
            .get('/api/articles?author=lurker')
            .expect(404)
            .then(resp => {
              expect(resp.body.msg).to.equals('Resource not found: cannot display results for query')
            })//
        })

        // **GET** `api/articles` - status:404
        it('status:404, topic exists in db but no articles associated', () => {
          return request(app)
            .get('/api/articles?topic=paper')
            .expect(404)
            .then(resp => {
              expect(resp.body.msg).to.equals('Resource not found: cannot display results for query')
            })//
        })
      });
      // `/api/articles/:article_id`
      describe("/:article_id", () => {

        // ERROR: 405 for **POST**, **PUT** and **DELETE**  /api/articles/:article_id
        describe("#POST #PUT, #DELETE", () => {
          it("status:405, responds appropriately because the HTTP method is not allowed", () => {
            const invalidMethods = ["put", "delete", "post"];
            const requests = invalidMethods.map((httpRequestMethod) => {
              return request(app)
              [httpRequestMethod]("/api/articles/1")
                .expect(405)
                .then((resp) => {
                  expect(resp.body.msg).to.equal(
                    `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/articles/1`
                  );
                });
            });
            return Promise.all(requests);
          });
        });

        // **GET** `api / articles /: article_id 
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
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
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
          it('status:404, article_id does not exist', () => {
            return request(app)
              .patch('/api/articles/909090')
              .send({ inc_votes: -1 })
              .expect(404)
              .then(resp => {
                expect(resp.body.msg).to.equal('Resource Not Found: article_id does not exist.')
              })
          })

          // ERROR: **PATCH** `api/articles/:article_id - status 400
          it('status:400, article_id is an invalid type', () => {
            return request(app)
              .patch('/api/articles/aiojijojeofnuninfe')
              .send({ inc_votes: -1 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/articles/:article_id - status 400
          it('status:400, article_id out of range for type integer', () => {
            return request(app)
              .patch('/api/articles/99999999999')
              .send({ inc_votes: -1 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/articles/:article_id - status 400
          it('status:400, no key inc_votes in request body', () => {
            return request(app)
              .patch('/api/articles/aiojijojeofnuninfe')
              .send({ votes: 4 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/articles/:article_id - status 400
          it('status:400, invalid inc_votes', () => {
            return request(app)
              .patch('/api/articles/3')
              .send({ inc_votes: 'cat' })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/articles/:article_id - status 400
          it('status:400, invalid body', () => {
            return request(app)
              .patch('/api/articles/3')
              .send({ inc_votes: 1, name: 'Mitch' })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })
        });

        describe("#/comments", () => {

          // ERROR:405 for **PATCH**, **PUT** and **DELETE**  /api/articles/:article_id/comments
          describe("#PATCH #PUT, #DELETE", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
              const invalidMethods = ["patch", "put", "delete"];
              const requests = invalidMethods.map((httpRequestMethod) => {
                return request(app)
                [httpRequestMethod]("/api/articles/5/comments")
                  .expect(405)
                  .then((resp) => {
                    expect(resp.body.msg).to.equal(
                      `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/articles/5/comments`
                    );
                  });
              });
              return Promise.all(requests);
            });
          });

          // **GET** `api/articles/:article_id/comments
          describe("#GET", () => {

            // **GET** `api/articles/:article_id/comments -status 200
            it('status:200, responds with an array of comment objects', () => {
              return request(app)
                .get('/api/articles/9/comments')
                .expect(200)
                .then(resp => {
                  expect(resp.body.comments).to.be.an('array')
                  resp.body.comments.forEach(obj => {
                    expect(obj).to.have.all.keys([
                      'comment_id', 'votes', 'created_at', 'author', 'body']
                    )
                  })
                })
            })

            // **GET** `api/articles/:article_id/comments - status 200
            it('status:200, result is sorted by created_at by default', () => {
              return request(app)
                .get('/api/articles/9/comments')
                .expect(200)
                .then(resp => {
                  expect(resp.body.comments).to.be.descendingBy('created_at');
                })
            })

            // **GET** `api/articles/:article_id/comments - status 200
            it('status:200, result is ordered by descending (default) when passed a sort_by query', () => {
              return request(app)
                .get('/api/articles/9/comments?sort_by=comment_id')
                .expect(200)
                .then(resp => {
                  expect(resp.body.comments).to.be.descendingBy('comment_id');
                })
            })

            // **GET** `api/articles/:article_id/comments - status 200
            it('status:200, result is ordered by order when passed a sort_by query', () => {
              return request(app)
                .get('/api/articles/9/comments?sort_by=comment_id&&order=desc')
                .expect(200)
                .then(resp => {
                  expect(resp.body.comments).to.be.descendingBy('comment_id');
                })
            })

            // ERROR: **GET `api/articles/:article_id/comments - status 400
            it('status:400, sort_by a column that does not exist', () => {
              return request(app)
                .get('/api/articles/9/comments?sort_by=username')
                .expect(400)
                .then(resp => {
                  expect(resp.body.msg).to.equals('Bad Request: Invalid input data.')
                })
            })

            // ERROR: **GET `api/articles/:article_id/comments - status 400
            it('status:400, order!==asc or desc', () => {
              return request(app)
                .get('/api/articles/9/comments?order=abc')
                .expect(400)
                .then(resp => {
                  expect(resp.body.msg).to.equals('Bad Request: Invalid input data.')
                })
            })

            // ERROR: **GET** `api/articles/:article_id/comments -status 404
            it('status:404, valid article_id but does not exist in db', () => {
              return request(app)
                .get('/api/articles/1000/comments')
                .expect(404)
                .then(resp => {
                  expect(resp.body.msg).to.equal('Resource Not Found: article_id does not exist.')
                })
            })
          });


          // **POST** `api/articles/:article_id/comments
          describe("#POST", () => {

            // **POST** `api/articles/:article_id/comments - status 201
            it('status:201, created comments successfully', () => {
              return request(app)
                .post('/api/articles/2/comments')
                .send({ username: 'rogersop', body: 'I love Sony Vaio. Mine is still working, and wonder why they have discontinued them =(' })
                .expect(201)
                .then(resp => {
                  expect(resp.body.comment).to.have.all.keys(['author', 'body', 'comment_id', 'votes', 'created_at']);
                })
            })//'comment_id', 'author', 'body', 'votes', and 'created_at'

            // ERROR: **POST** `api/articles/:article_id/comments - status 400
            it('status:400, username missing', () => {
              return request(app)
                .post('/api/articles/9999/comments')
                .send({ body: 'I love Sony Vaio. Mine is still working, and wonder why they have discontinued them =(' })
                .expect(400)
                .then(resp => {
                  expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
                })
            })

            // ERROR: **POST** `api/articles/:article_id/comments - status 404
            it('status:404, article_id does not exist', () => {
              return request(app)
                .post('/api/articles/9999/comments')
                .send({ username: 'rogersop', body: 'I love Sony Vaio. Mine is still working, and wonder why they have discontinued them =(' })
                .expect(404)
                .then(resp => {
                  expect(resp.body.msg).to.equal('Resource not found: article_id does not exist.')
                })
            })

            // ERROR: **POST** `api/articles/:article_id/comments - status 400
            it('status:400, article_id out of range for type integer', () => {
              return request(app)
                .post('/api/articles/99999999999/comments')
                .send({ username: 'rogersop', body: 'I love Sony Vaio. Mine is still working, and wonder why they have discontinued them =(' })
                .expect(400)
                .then(resp => {
                  expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
                })
            })


            // ERROR: **POST** `api/articles/:article_id/comments - status 400
            it('status:400, invalid type for article_id', () => {
              return request(app)
                .post('/api/articles/okpkk/comments')
                .send({ username: 'rogersop', body: 'I love Sony Vaio. Mine is still working, and wonder why they have discontinued them =(' })
                .expect(400)
                .then(resp => {
                  expect(resp.body.msg).to.equal('Bad Request: Invalid input data.');
                })
            });
          })

        })
      });
    });

    describe("#/comments", () => {
      describe("#/:comment_id", () => {

        // ERROR:405 for **POST**, **PUT** and **GET**  /api/comments/:comment_id
        describe("#POST #PUT, #GET", () => {
          it("status:405, responds appropriately because the HTTP method is not allowed", () => {
            const invalidMethods = ["put", "get", "post"];
            const requests = invalidMethods.map((httpRequestMethod) => {
              return request(app)
              [httpRequestMethod]("/api/comments/5")
                .expect(405)
                .then((resp) => {
                  expect(resp.body.msg).to.equal(
                    `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/comments/5`
                  );
                });
            });
            return Promise.all(requests);
          });
        });

        // **PATCH** `/api/comments/:comment_id` - status 200
        describe("#PATCH", () => {
          it('status:200, ', () => {
            return request(app)
              .patch('/api/comments/14')
              .send({ inc_votes: -5 })
              .expect(200)
              .then(resp => {
                expect(resp.body.comment).to.have.all.keys(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body'])
                expect(resp.body.comment.votes).to.be.equal(11)
              })
          })

          // ERROR: **PATCH** `api/comment/:comment_id - status 404
          it('status:404, comment_id does not exist', () => {
            return request(app)
              .patch('/api/comments/909090')
              .send({ inc_votes: -1 })
              .expect(404)
              .then(resp => {
                expect(resp.body.msg).to.equal('Resource Not Found: comment_id does not exist.')
              })
          })

          // ERROR: **PATCH** `api/comments/:comment_id - status 400
          it('status:400, comment_id is an invalid type', () => {
            return request(app)
              .patch('/api/comments/aiojijojeofnuninfe')
              .send({ inc_votes: -1 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/comments/:comment_id - status 400
          it('status:400, comment_id out of range for type integer', () => {
            return request(app)
              .patch('/api/comments/99999999999')
              .send({ inc_votes: -1 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/comments/:comment_id - status 400
          it('status:400, no key inc_votes in request body', () => {
            return request(app)
              .patch('/api/comments/aiojijojeofnuninfe')
              .send({ votes: 4 })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/comments/:comment_id - status 400
          it('status:400, invalid inc_votes', () => {
            return request(app)
              .patch('/api/comments/3')
              .send({ inc_votes: 'cat' })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })

          // ERROR: **PATCH** `api/comments/:comment_id - status 400
          it('status:400, invalid body', () => {
            return request(app)
              .patch('/api/comments/3')
              .send({ inc_votes: 1, name: 'Mitch' })
              .expect(400)
              .then(resp => {
                expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
              })
          })
        });
      });

      // **DELETE** `/api/comments/:comment_id`
      describe("#DELETE", () => {

        // **DELETE** `/api/comments/:comment_id` - status 204
        it('status:204, deletes comment obj with given comment_id', () => {
          return request(app)
            .delete('/api/comments/5')
            .expect(204)
            .then(() => {
              return connection('comments').where({ comment_id: 5 })
            })
            .then((arrResult => {
              expect(arrResult.length).to.equal(0);
            }))
        })

        // ERROR: **DELETE** `/api/comments/:comment_id` - status 400
        it('status:400, comment_id out of range for integer value', () => {
          return request(app)
            .delete('/api/comments/0009999992929')
            .expect(400)
            .then(resp => {
              expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
            })
        })


        // ERROR: **DELETE** `/api/comments/:comment_id` - status 404
        it('status:404, comment_id does not exist', () => {
          return request(app)
            .delete('/api/comments/999999')
            .expect(404)
            .then(resp => {
              expect(resp.body.msg).to.equal('Resource Not Found: comment_id does not exist.')
            })
        })

        // ERROR: **DELETE** `/api/comments/:comment_id` - status 400
        it('status:400, comment_id invalid type', () => {
          return request(app)
            .delete('/api/comments/rainbow')
            .expect(400)
            .then(resp => {
              expect(resp.body.msg).to.equal('Bad Request: Invalid input data.')
            })
        })
      });
    });
  });
});


