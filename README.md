# How to Create a Mall Map with Real-time Data Using WRLD3D

This is a WRLD3D Javascript app demonstrating how to implement real-time data for a mall and parking. This project was built using NodeJS 8 LTS.

## Installation

Simply clone the project and install its dependencies.

```bash
git clone git@github.com:brandiqa/sp-mall-park-wrld.git
npm install
```

Next, install the following global dependencies:

- [Parcel Bundler](https://parceljs.org)
- [json-server](https://github.com/typicode/json-server)

```bash
npm install -g parcel-bundler json-server
```

You'll need an API key from [https://www.wrld3d.com/](https://www.wrld3d.com/). Duplicate `env.example.js` file in the project root and rename it to `env.js`. Paste in your API key there.

## How to run

This project is composed of a dummy api and 2 demos:

### 1. JSON API Server

The JSON API server is required to run first as it provides real-time (dummy) data for both demos. The data used by the server is located at `data/db.json`. To start the API server just execute:

```bash
json-server --watch data/db.json
```

### 2. Mall Map Demo

To run the mall map demo, just execute the following after the JSON server is up and running:

```bash
# Launch mall map demo
npm start

# OR you can run the command directly:
parcel src/index.html
```

You'll need to open [127.0.0.1:1234](127.0.0.1:1234) in your favorite browser to view the demo.

### 3. Parking Areas Demo

To run the parking areas demo, make sure that mall map demo is not running and that port 1234 is free. This demo requires the JSON server, hence ensure that its still running. You can start the parking area demo by executing:

```bash
# Launching parking areas demo
parcel src/parking.html
```

You'll need to open or refresh [127.0.0.1:1234](127.0.0.1:1234) in your favorite browser to view the demo.

## ESLint Configuration(Optional)

If you are using an editor that supports ESLinting such as VSCode, you will need to install the following global packages:

```json
  "devDependencies": {
    "eslint": "^4.18.2",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.9.0"
  }
```

## License

[todo] MIT