# Adoptme Project

A Node project made with Express, where it is carried out thanks to the React course from Coderhouse

## Table of contents

1. [Tools Used](#tools-used)
2. [Dockerhub Image](#dockerhub-image)
2. [Installation and Testing](#installation-and-testing)
3. [Artillery](#artillery)
4. [Endpoints](#endpoints)


## Tools Used

- Node
- Express
- Artillery
- Faker-js
- Cookie-parser
- JWT
- Mongoose
- Bcrypt
- MongoDB Atlas
- Postman
- Mocha
- Chai
- Swagger-UI
- Supertest
- dotenv-flow

## Dockerhub Image

- Docker Image URL: https://hub.docker.com/repository/docker/chanochoca/adoptme/general

* Clone Image
```bash
docker pull chanochoca/adoptme:latest 
```


## Installation and Testing

* Install: `npm install`

* Test: `npm start`

### Functional tests

1. Run the tests: `npm test`

2. Tests included:
    - **Router `adoption.router.js`**:
        - `GET /api/adoptions`: Return all adoptions.
        - `GET /api/adoptions/{aid}`: Returns a specific adoption.
        - `POST /api/adoptions/{uid}/{pid}`: Create an adoption.
    - **Router `users.router.js`**:
        - `POST /api/users`: Create a new user.

## Artillery

* Note: You must run the app before running the following command.

``` bash
artillery run artillery.yml --output testPerformance.json
```

``` bash
artillery report testPerformance.json -o testResults.html 
```

## Endpoints

- **Endpoint**: GET
```http
  http://localhost:8080/api/mocks/mockingusers?num=50
```

- **Endpoint**: GET
```http
  http://localhost:8080/api/mocks/mockingpets?num=100
```

- **Endpoint**: POST
```http
  http://localhost:8080/api/mocks/generateData
```
- **Body example**
``` json
{
    "users": 10,
    "pets": 10
}
```
