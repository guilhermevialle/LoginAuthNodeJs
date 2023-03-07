
# Login Authentication and Account Registration

This is an application for login authentication and account registration using Node.js, Prisma ORM, Express, and React to consume the API.

## Demo

### Register
![](https://github.com/guilhermevialle/LoginAuthNodeJs/blob/main/preview/resgister-demo.gif)


### Login
 ![](https://github.com/guilhermevialle/LoginAuthNodeJs/blob/main/preview/login-demo.gif)

## Installation

1.  Clone this repository to your local machine:

`git clone https://github.com/guilhermevialle/LoginAuthNodeJs.git` 

2.  Install the Node.js server dependencies:

- `cd LoginAuthNodeJs`
- `npm install`

3.  Create a `.env` file with the database information and secret key:

- `DATABASE_URL=your@database-here`
- `SECRET=random-secret` 

4.  Run the Prisma migrations to create the tables in the database:

- `npx prisma migrate dev` 

5.  Start the Node.js server:

- `nodemon backend/server.js` 

6.  Start the React application:

- `npm run dev` 


## Usage

The application allows users to login and register accounts. To access private pages, the user needs to be authenticated.

### API

The API is built with Express and accesses the database with the Prisma ORM. The available routes are:

-   `POST /register`: registers a new account in the database. The user data should be sent in the request body in JSON format with the fields `username`, `email`, and `password`.
    
-   `POST /login`: logs in the user and returns a JWT token. The user data should be sent in the request body in JSON format with the fields `username` or `email` and `password`.
    
-   `GET /auth`: returns the data of the authenticated user based on the JWT token sent in the request header.
    

### Client

The client is built with React and consumes the API to display the data. The available pages are:
    
-   `"/login"`: the login page, allows the user to log in with their email and password.
    
-   `"/register"`: the registration page, allows the user to register a new account with their name, email, and password.
    
-   `"/dashboard"`: the profile page, displays the data of the authenticated user.
    

## Demo

## Links
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/guivialle)
[![twitter](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/guilherme.vialle/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilherme-vialle-4b1a9820a/)

