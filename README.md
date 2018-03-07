# How to Create a Mall Map with Real-time Data Using WRLD3D
This is a WRLD3D Javascript app demonstrating how to build a mall map using real-time data. You'll need the latest NodeJS, 8.9.4+, to run this app. NodeJS 6.0+ should also work fine.

## Configuration
You need a reliable Internet connection for the app to work. Clone the project first, the install it's dependencies:

```bash
npm install
```

Next, install [Parcel Bundler](https://parceljs.org) and [json-server](https://github.com/typicode/json-server) globally:

```bash
npm install -g parcel-bundler json-server
```

While it's installing, you need to create a new account at [https://www.wrld3d.com/](https://www.wrld3d.com/). Next, create an Access API key [here](https://mapdesigner.wrld3d.com/portal/latest/dev/). You will also need a [developer token](https://accounts.wrld3d.com/users/edit#developer-token); Once you aquired both, make a copy of `env.example.js` file and save it as `env.js`.

## How to run
Once everything is setup, you can run your project like this from the terminal:

```bash
# Start the JSON dummy api first
npm run-script api
# OR you can run the command directly:
json-server --watch data/db.json

# In another terminal, launch the app
npm start
# OR you can run the command directly:
parcel src/index.html
```

Use your favorite browser and open the link `127.0.0.1:1234`. Wait for the indoor map to load, shouldn't take more than a minute.

## ESLint Configuration(Optional)
If you would like to have ESLint enabled for your IDE(am using VSCode), you'll need to install the following packages globally:

```json
  "devDependencies": {
    "eslint": "^4.18.2",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.9.0"
  }
```

## License
[todo] MIT