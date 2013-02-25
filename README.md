Website
===================================
This repository contains the source code used to generate http://raptorjs.org. See below for the steps
required to update and publish website documentation.

## Building the Website

### Prerequisites
1. Install [Node.js](http://nodejs.org/)
2. Install all Node dependencies for the project by running the following command in the root directory:
```
npm install
```
3. Install [Apache Ant] (http://ant.apache.org/)

### Generating the Entire Website (Development)
```
ant
```

### Generating the Entire Website (Production)
```
ant build
```

### Generating a Single Page (Development)
```
./build-page-dev <path-path>
```
Example:
```
./build-page-dev /raptor-templates/try-online
```

### Generating a Single Page (Production)
```
./build-page <path-path>
```
Example:
```
./build-page /raptor-templates/try-online
```
