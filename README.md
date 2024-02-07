# Northcoders News Server (API)

This repository is a RESTful API server which serves up data for the Northcoder News website, also built by me. (See Links)

## Getting Started

### Prerequisites

You will require node.js (minimum version 13.9.0) to install and run the repository.  (See Built)

### Installing

Clone this repo

```bash
git clone https://github.com/northcoders/be-nc-news

cd be-nc-news
```

Install required packages and dependencies

```bash
npm install
```

Run the server

```bash
npm start
```

## Endpoints

The endpoints serve up the following:

### **GET** `/api

- This serves up a json representation of all the available endpoints of the api in the below format


```json
{
    "GET /api/articles": {
      "description": "serves an array of all articles and articles_count which is the total number of articles before limit and p is queried",
      "queries": [
        "author",
        "topic",
        "sort_by",
        "order",
        "limit",
        "p"
      ],
      "request.body": {},
      "exampleResponse": {
        "articles": [
          {
            "article_id": 1,
            "author": "butter_bridge",
            "created_at": "2018-11-15T12:21:54.171Z",
            "title": "Living in the shadow of a great man",
            "topic": "mitch",
            "votes": 100,
            "comment_count": "13"
          }
        ],
        "articles_count": 22
      }
    }
}
```

### **GET** `/api/topics

- This serves up an array of topics in the following format.

```json
{
      "slug": "coding",
      "description": "Code is love, code is life"
},
```

### **GET** `/api/users/:username

- This serves up an array of users in the following format.

```json
{
  "user": {
    "username": "jessjelly",
    "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
    "name": "Jess Jelly"
  }
}
```

### **GET** `/api/articles?author=[author]&topic=[topic]&sort_by=[author/topic]&order=[asc/desc]&limit=[limit]&p=[page_num]


- This serves up an array of all articles in the following format.

- There are also optional queries to:
  - get articles written by a specific author
  - get articles under a specific topic
  - sort_by a field
  - order ascending or descending

- created_at is in ISO format (YYYY-MM-DDTHH:MM:SSZ)
- articles_count is the total number of articles retrieved before limit and p is implemented.

```json
 {
  "articles": [
    {
      "article_id": 33,
      "author": "weegembump",
      "created_at": "2018-05-30T15:59:13.341Z",
      "title": "Seafood substitutions are increasing",
      "topic": "cooking",
      "votes": 83,
      "comment_count": "8"
    }],
   "articles_count": 36
}

```

### **GET** `/api/articles/:article_id

- This serves up an article object in the following format.

```json
{
  "article": {
    "article_id": 3,
    "title": "22 Amazing open source React projects",
    "body": "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11)...",
    "votes": 2,
    "topic": "coding",
    "author": "happyamy2016",
    "created_at": "2017-07-21T17:54:10.346Z",
    "comment_count": "10"
  }
}
```

### **PATCH `/api/articles/:article_id

- This increments the number of votes of an article, returns the updated article object in the same format as **GET** `/api/articles/:article_id
- You should be able to post a body to this end-point in the below form.
- inc_votes can be a negative number which means decreasing the vote.

```json
{
"inc_votes": "newVote"
}
```

## GET `/api/articles/:article_id/comments

- This serves an array of comments object of an article object in the following format.

```json
{
  "comments": [
    {
      "comment_id": 3,
      "votes": 3,
      "created_at": "2017-08-31T12:51:40.263Z",
      "author": "grumpy19",
      "body": "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat.
    }]
}
```

## POST `/api/articles/:article_id/comments

- This creates a new comment object on an article object. The new comment object is in the same format as **G
```json
{
   "comment": {
    "comment_id": 3,
    "votes": 3,
    "created_at": "2017-08-31T12:51:40.263Z",
    "author": "grumpy19",
    "body": "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat.
  }
}
```

## PATCH `/api/comments/:comment_id

- This increments the votes of a comment object with comment_id by newVote.
- This serves up the updated comment object in the same format as **POST** `/api/articles/:article_id/comments
- You should be able to post a body to this end-point in the below form.
- inc_votes can be a negative number which means decreasing the vote.

```json
{
"inc_votes": "newVote"
}
```

## DELETE `/api/comments/:comment_id
- This deletes the comment object with comment_id



## Running the tests

TDD is done with chai, mocha, supertest and chai-sorted.
To run the tests type:

```
npm test
```

You will see a list of testing that has been done.

## Links
- You can find the api hosted [here](https://nc--news-server.herokuapp.com/api)
- You can find the front-end react app deployed [here](https://northcoders-news-website.netlify.app/)
- You can find the front-end react repository [here](https://github.com/nax2uk/fe-nc-news.git)

## Built With

* [node](https://nodejs.org/en/) - A Javascript runtime built on Chrome's V8 Javascript engine
* [express](http://expressjs.com/) - A Node.js web application framework
* [postgresSQL](https://www.postgresql.org/) - The world's most Advanced Open Source Relational Database
* [knex](http://knexjs.org/) - A SQL Query Builder for Javascript
* [mocha](https://mochajs.org/) - A JavaScript test framework for node
* [chai](https://www.chaijs.com/) - A BDD / TDD assertion library for node
* [supertest](https://www.npmjs.com/package/supertest) - A HTTP assertions made easy via superagent
* [chai-sorted](https://www.chaijs.com/plugins/chai-sorted/) - Used for testing if an array has sorted values

## Authors

* **Azlina Yeo** - [nax2uk](https://github.com/nax2uk)
