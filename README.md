# FastSushi-API

This project is an API for the [desktop app version](https://github.com/Lxckyluck/FastSushi-DesktopApp) and the [wepp app version](https://github.com/Lxckyluck/FastSushi-WebApp) of FastSushi.

## Setting-Up the project

### Installing and updating the project

To set up the project, you can clone the repository:

- Using HTTPS :

```bash
git clone https://github.com/Lxckyluck/FastSushi-API.git
```

- Using SSH :

```bash
git clone git@github.com:Lxckyluck/FastSushi-API.git
```

Once cloned, navigate to the project directory with:

```bash
cd FastSushi-API
```

Then, install dependencies and create the node_modules folder by running:

```bash
npm install
```

### Configuring the environment variables

Rename the `.env-example` file to `.env`. This ensures the file is ignored by Git.

Next, update the values in the `.env` file to match your configuration

> ⚠️ **Important**

For generating a JWT secret key, you can use the `generateSecretKey` script. This script generates a random key. You can use it as follows:

```bash
node generateSecretKey.js
```

The key will be logged to your terminal. However, you're free to use your own key if you already have one.

---

### Starting the Project

If you have followed the previous steps correctly, you can start the project:

- Using npm :

```bash
npm run start
```

- Using Yarn

```bash
Yarn start
```

- Using nodemon (recommended)

```bash
nodemon
```

> Why use nodemon? Nodemon automatically restarts the project whenever you make edits or encounter an error during a request, saving you time and effort during development.

## API Documentation

### Project Architecture

This project is built following the MVC (Model-View-Controller) architectural pattern.

#### Routes Folder

The `routes folder` contains all the requests related to products and users. This is also where endpoints are defined.

#### Modules Folder

The `modules folder` houses external functions used in the controllers folder. It contains both current and potentially future functions.

#### Models Folder

The `models folder` organizes all SQL queries in the project. It does not handle errors, except for the connections.js file.

#### Controllers Folder

The `controllers folder` manages errors that may occur during the API usage.

#### Postman

The entire request collection can be found in the `FastSushi-Request` directory. This collection has been created and exported using Postman.
