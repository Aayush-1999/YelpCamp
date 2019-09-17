# BlogRite

<a><img alt="David" src="https://img.shields.io/david/Aayush-1999/Blogrite?label=dependencies"></a>
<a><img alt="Code Quality" src="https://img.shields.io/badge/code%20quality-A-brightgreen"></a>

This is a **Campground Rating A** where you can:
- Create a campground
- Read about a campground
- Comment on a campground

### SERVER

The Server is made on `Node.js (v10.15.3)`
<br/>
`Express.js` is used as the server framework (v4.17.1)

### DATABASE

The database used is `MongoDB` and is hosted on a `MongoDB Atlas Cluster`.
<br/>
`Mongoose.js` is used as an ODM (v5.6.11)

### FRONT-END

- The Front-end is made with `HTML, CSS and JS`.
- `Bootstrap` is used for better styling of the project.
- `Font Awesome` for icons


### AUTHENTICATION

`Passport.js`, `Passport-local`, `Passport-local-mongoose` has been integrated into the application for Secure Authentication of User Credentials.

### NPM Commands
- **npm install** - installs all the dependencies
- **npm start** - lints the server and client script, starts eslint on watch mode on server scripts and starts the project at localhost:1998 in debug mode.
- **npm run start-w** - Restarts the server(using nodemon) on every save and lints the server and client side scripts on each save.
- **npm run start-w-lite** - Simply restarts the server(using nodemon) on every save.
- **npm run lint-server** - lints the server scripts (all scripts except that in node_module and public directory) once.
- **npm run lint-client** - lints the client scripts (all scripts in the public directory) once.
- **npm run lint-w** - starts the linter in watch mode. When called from root directory it watches the server scripts and when called in public directory it watches the client scripts.
- **npm run localTunnel** - exposes localhost:1998 to the world wide web
- **npm run lt** - runs npm start and npm run localTunnel in parallel
- **Use npm run** --silent <your-script> to hide the internal logs from your terminal window.
eg: npm run --silent start-w or npm run --silent start-w-lite

### To-Do

- Use cookies securely
- Add proper Logging