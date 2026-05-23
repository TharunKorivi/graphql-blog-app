# GraphQL Blog App

A GraphQL Blog Backend built using:

- Node.js
- Express
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- JWT Authentication
- Refresh Tokens
- DataLoader

---

# Features

## Authentication

- User Signup
- User Login
- JWT Access Tokens
- Refresh Token Rotation
- Logout
- Protected Resolvers
- HTTP-only Cookies

---

## Posts

- Create Post
- Update Post
- Publish Post
- Delete Post
- Fetch Single Post
- Fetch All Posts

---

## Comments

- Create Comments
- Nested Comment Queries
- Comment Author Relations

---

## GraphQL Features

- Modular TypeDefs
- Modular Resolvers
- DataLoader Integration
- Nested Resolvers
- GraphQL Error Handling
- Apollo Context

---

# Project Structure

```txt
src/
 ├── db/
 ├── errors/
 ├── graphql/
 │    ├── resolvers/
 │    └── typeDefs/
 │
 ├── loaders/
 ├── middlewares/
 ├── models/
 ├── repositories/
 ├── services/
 ├── utils/
 │
 ├── app.js
 └── index.js
```

---

# Tech Stack

| Technology    | Purpose          |
| ------------- | ---------------- |
| Node.js       | Runtime          |
| Express       | Web Server       |
| Apollo Server | GraphQL Server   |
| MongoDB       | Database         |
| Mongoose      | ODM              |
| JWT           | Authentication   |
| DataLoader    | N+1 Optimization |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/TharunKorivi/graphql-blog-app.git
cd graphql-blog-app
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=your_access_expiry


REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=your_refresh_expiry

CORS_ORIGIN=http://localhost:5173
```

---

# Run Development Server

```bash
npm run dev
```

---

# Seed Database

```bash
npm run seed
```

This inserts:

- Sample Users
- Sample Posts
- Sample Comments

---

# GraphQL Endpoint

```txt
http://localhost:4000/graphql
```

---

# Authentication Flow

## Login

- User logs in
- Access token returned in GraphQL response
- Refresh token stored in HTTP-only cookie

---

## Access Token

Used for:

- Protected Queries
- Protected Mutations

Sent through:

```http
Authorization: Bearer <token>
```

---

## Refresh Token

- Stored securely in cookies
- Used to generate new access tokens
- Supports refresh token rotation

---

# Example Queries

## Signup

```graphql
mutation {
    signup(
        input: {
            username: "tharun",
            email: "tharun@test.com",
            password: "password"
        }
    ) {
        token

        user {
            id
            username
        }
    }
}
```

---

## Login

```graphql
mutation {
    login(email: "tharun@test.com", password: "password") {
        token

        user {
            id
            username
        }
    }
}
```

---

## Create Post

```graphql
mutation {
    createPost(
        title: "GraphQL Basics",
        body: "Learning GraphQL deeply",
        tags: ["graphql", "backend"]
    ) {
        id
        title
        body
    }
}
```

---

## Get Posts

```graphql
query {
    posts {
        id
        title

        author {
            username
        }

        comments {
            body
        }
    }
}
```

---

# DataLoader

This project uses DataLoader to solve the GraphQL N+1 Query Problem.

Without DataLoader:

```txt
1 query for posts
+ N queries for authors/comments
```

With DataLoader:

```txt
1 query for posts
1 query for authors
1 query for comments
```

---

# Error Handling

Custom GraphQL errors include:

- UNAUTHENTICATED
- FORBIDDEN
- NOT_FOUND
- BAD_REQUEST
- INVALID_CREDENTIALS
- DUPLICATE_FIELD
- AT_LEAST_ONE_FIELD_REQUIRED
- INVALID_ID

Internal server stack traces are hidden.

---

# Security Features

- HTTP-only Cookies
- JWT Authentication
- Refresh Token Rotation
- Protected Mutations
- Input Validation
- Error Sanitization
