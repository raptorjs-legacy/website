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
ant build-production
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

## Publishing to Github
```
./publish-to-github
```

## Publishing to Github (dry run)
```
ant publish-to-github-dry-run
```
Running the above command will go through all of the steps of generating http://raptorjs.org, but it will not
commit the changes, nor will it push the changes to the remote Github repository for the website 
(i.e. https://github.com/raptorjs/raptorjs.github.com). In addition, the above command will start
a local HTTP server that can be used to test the site by visiting the following URL:
http://localhost:8090/
