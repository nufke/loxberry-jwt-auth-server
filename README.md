# LoxBerry JWT Authentication Server

Light-weight Authentication Server using JWT Access and Refresh Tokens. Includes user registration and token administration using a SQLite database.

The objective of the LoxBerry JWT Authentication Server is to offer user management, authentication and access for external applications (e.g. mobile Apps).

**NOTE: This project is under development and not intended for production usage**

## Installation

Environment requirements: `node.js` and  `sqlite`.

```
npm install
```

## Configuration

See `app/config/db.config.js` and `app/config/auth.config.js` to configure the database and authorization server options.

## Start the server
```
node server.js
```

# Available API end points

| Method | Url            | Purpose                                          |
|--------|----------------|--------------------------------------------------|
| POST   | /auth/register | register new user accounts                       |
| POST   | /auth/login    |	user login                                       |
| POST   | /auth/refresh  |	refresh access credentials                       |
| GET    | /public        | retrieve public content                          |
| GET    | /guest         | retrieve private content for guests and visitors |
| GET    | /family        | retrieve private content for the family members  |
| GET    | /owner         | retrieve private content for the house owner     |

