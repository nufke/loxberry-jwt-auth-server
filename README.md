# LoxBerry JWT Authentication Server

Light-weight Authentication Server using JWT Access and Refresh Tokens. Includes user registration and token administration.

The objective of the LoxBerry JWT Authentication Server is to offer user management, authentication and access for external applications (e.g. mobile Apps).

**NOTE: This project is under development and not intended for production usage**

## Installation

Environment requirements: `npm` and `node.js`. Package dependencies are listed in `package.json`.

```
npm install
```

## Configuration

See `app/config/index.js` for the configurtion options, such as server port, JSON database filename, etc.

## Start the server

```
node server.js
```

# Available API end points

| Method | Url            | Purpose                                     |
|:-------|:---------------|:--------------------------------------------|
| POST   | /auth/register | register new user accounts                  |
| POST   | /auth/login    |	user login                                  |
| POST   | /auth/logout   |	user logout                                 |
| POST   | /auth/refresh  |	refresh access credentials                  |
| GET    | /public        | retrieve public content                     |
| GET    | /guest         | retrieve private content for guests         |
| GET    | /family        | retrieve private content for family members |
| GET    | /owner         | retrieve private content for house owner    |

# API usage

Example registration request using `POST localhost:3030/auth/register` with JSON body content:

```json
{
    "username":"john",
    "password":"<password>",
    "roles": ["family", "owner"]
}
```

Example registration response:

```json
{
    "message": "User 'john' registered successfully!"
}
```

Example login request using `POST localhost:3030/auth/login` with JSON body content:

```json
{
    "username":"john",
    "password":"<password>"
}
```

Example login response: 

```json
{
    "username": "john",
    "roles": [
        "ROLE_FAMILY",
        "ROLE_OWNER"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQyOTQzMjI3LCJleHAiOjE2NDI5NDMyODd9.NSJx9tWCtzOt_-1RPtsIwdtyeKYjI9ghwqpaYnq_uxZ",
    "refreshToken": "27b33be3-b4b7-4760-a186-0c57c4cc2be4"
}
```

Example request to access private content using `GET localhost:3030/owner`. Header should contain:

```
key: x-access-token
value: <accessToken received at login>
```

Example request to renew accessToken when expired, using `POST localhost:3030/auth/refresh` with JSON body content:

```json
{
    "refreshToken": "<refreshToken received at login>"
}
```

Example response for accessToken renewal:

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQyOTQzNDgwLCJleHAiOjE2NDI5NDM1NDB9.mQYk8zibogSOSE_IUZYI0sglTn9U9fgVyWr-6t7GTWI",
    "refreshToken": "27b33be3-b4b7-4760-a186-0c57c4cc2be2"
}
```

Example request to logout, using `POST localhost:3030/auth/logout` with JSON body content:

```json
{
    "refreshToken": "<refreshToken received at login>"
}
```

Example response for logout:

```json
{
    "message": "Logout user 'john' completed."
}
```
