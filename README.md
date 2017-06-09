# ComicDB Interface

Graphical Web Interface to manage a small Comic Database.

The interface is built using React on the client side and expressjs on the server side.

## Getting started
A mysql server is necessary to run this project. Once the db installed, create a `conpars.json` file at the root of the repository with the following structure:

```
{
	"host": "a host address",
	"user": "...",
	"database": "...",
	"password": "...",
	"multipleStatements": true
}
```

You also need to setup a user account: create a `user.json` file at the root of the repository with the following structure:
```
{
    "name": "a username",
    "password": "a password"
}
```

### Building

 1. Clone the repo
 2. cd into the folder
 3. Download necessary dependencies in the project folder: `npm install`
 4. Launch the server component, responsible for providing users the client code and for talking to the database: `npm start`
 5. In a separate terminal window, launch webpack which will watch for client side file modifications and will build the client side js: `npm run bundle:dev`

### Deploying with docker

 1. Change the server IP address in `webpack.prod.js`
 2. Build and start with docker compose: `docker-compose build && docker-compose up -d`