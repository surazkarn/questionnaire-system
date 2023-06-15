# Questionnaire Backend System

This project implements a REST API for a questionnaire system using Node.js and MongoDB. It allows users to sign up, sign in, edit or add phone number, and complete tests from a selection of available tests. The tests consist of multiple-choice questions (MCQs) with single or multiple correct answers. User responses are stored, and the score obtained is calculated and returned to the user.

[Link to view Screenshots of postman request-response and MongoDB](https://docs.google.com/document/d/1lQquu2_3geDJ0u6dQge5-apQq4r60mMeHJjrXkCoCQ8/edit?usp=sharing)


## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/surazkarn/questionnaire-system
    ```
2. Install dependencies:

    ```bash
    cd questionnaire-system
    npm install
    ```
    
3. Set up the MongoDB database:

- Create a new database in MongoDB.
- Update the MongoDB URI in the src/config.js file:

    ```bash
    module.exports = {
  mongodb: {
    uri: 'mongodb://localhost:27017/your-database-name',
  },
  jwtSecret: 'your-jwt-key',};


4. Start the server:

    ```bash
    npm start
    ```

## API Endpoints

1. Welcome Endpoint
- GET /api/welcome

Description: A simple request-response endpoint to check the API's functionality.

Success Response:

- Status code: 200
- Content:
```json
{
  "success": true,
  "message": "API successfully called"
}
```

2. Sign Up Endpoint
- POST /api/signup

Description: Endpoint to sign up a user.

Request body:

```json
{
  "name": "Suraj Kumar Karn",
  "email": "surajkumarkarn10@gmail.com",
  "password": "suraj@123",
  "phone_number": "+910000000000"
}
```
Response body:

```json
{
  "success": true,
  "message": "Signed up successfully"
}
```

3. Sign In Endpoint
- POST /api/login

Description: Endpoint to sign in a user.

Request body:

```json
{
  "email": "1905530@kiit.ac.in",
  "password": "example@123"
}
```
Response body:

```json
{
  "success": true,
  "message": "hewwo"
}
```

4. Edit Phone Number Endpoint
- PUT /api/edit/phonenumber

Description: Endpoint to let the user edit or add a phone number.

Request body:

```json
{
  "phone_number": "+917735709660"
}
```
Response body:

```json
{
  "success": true,
  "message": "Phone number changed / added successfully"
}
```
5. Submit Test Endpoint
- POST /api/submit-test

Description: Endpoint to handle user responses, calculate the score, and store the results.

Request body:

```json
{
  "userId": "648a931211f9a29a253a7aaf",
  "testId": "648a93578d95faee41583b86",
  "answers": {
    "q1": ["q1o1"],
    "q2": ["q2o3"],
    "q3": ["q3o2"]
  }
}
```
Response body:

```json
{
  "success": true,
  "message": "Test submitted successfully",
  "userId": "648a931211f9a29a253a7aaf",
  "testId": "648a93578d95faee41583b86",
  "score": 3
}
```

## License
This project is licensed under the MIT License.
```css

Copyright 2023 Suraj Kumar Karn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

