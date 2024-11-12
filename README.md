Adoptme Project

## Table of contents

1. [Tools Used](#tools-used)
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

## Installation and Testing

* Install: `npm install`

* Test: `npm start`

## Artillery

``` bash
artillery run artillery.yml --output testPerformance.json
```

``` bash
artillery report testPerformance.json -o testResults.html 
```

## Endpoints

- **Endpoint**: GET
```http
  http://localhost:8080/api/mocks/mockingusers
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
