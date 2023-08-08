# Architecture
Node and GraphQL
## Getting started

The command below will install all node_modules, link required packages and start the application.

`npm install && npm run dev`

## Postman Query

### Register User

```graphql
mutation SignupUser($input: SignUpInput!) {
  signupUser(input: $input) {
    status
    user {
      id
      name
      email
    }
  }
}
```

```json
{
  "input": {
    "name": "Test User",
    "email": "test.user@ditstek.com",
    "password": "12345678",
    "passwordConfirm": "12345678",
    "photo": "default.jpeg"
  }
}
```