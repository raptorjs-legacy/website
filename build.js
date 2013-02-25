var raptor = require('raptor');
require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        'oop-server': {level: 'WARN'},
        'resources': {level: 'WARN'},
        'optimizer': {level: 'WARN'}
    }
});

var files = require('raptor/files');

require('raptor/resources').getSearchPath().addDir(__dirname);
require('raptor/templating/compiler').setWorkDir(files.joinPaths(__dirname, "work"));

var args = require('optimist')
                .usage('Usage: $0 [options]\nExamples:\n' + 
                       '  Build entire website (development):\n' + 
                       '   $0 build --dev\n\n' + 
                       '  Build entire website (production):\n' + 
                       '   $0 build\n\n' + 
                       '  Build a single page (development):\n' + 
                       '   $0 --page /raptor-templates --dev')
                .alias('p', 'page')
                .describe('p', 'The name of a page to build')
                .alias('d', 'dev')
                .boolean('d')
                .describe('d', 'Enable development-mode (no minification, in-place deployment, etc.)')
                .check(function(argv) {

                })
                .argv;

var templating = require('raptor/templating'),
    logger = require('raptor/logging').logger('publish'),
    strings = require('raptor/strings'),
    File = require('raptor/files/File'),
    cwd = process.cwd(),
    resolveFile = function(path, basePath) {
        if (!path) {
            return path;
        }
        
        return new File(files.resolvePath(basePath || cwd, path));
    },
    cwd = process.cwd();


var Publisher = function(config) {
    this.appendPageFilename = config.dev === true;
    this.page = config.page;
    
    var raptorJSPackageFile = new File(__dirname, "../raptorjs/package.json");
    var raptorJSPackage = JSON.parse(raptorJSPackageFile.readAsString());
    
    this.raptorJSVersion = raptorJSPackage.version;

    this.outputDir = new File(files.joinPaths(__dirname, "../raptorjs.github.com"));
    this.currentOutputDir = null;
    this.srcDir = new File(__dirname);
    this.templateContext = templating.createContext();
};

Publisher.prototype = {
    publish: function() {

        require('docs-util').publisher = this;

        var baseDir = files.joinPaths(__dirname, "pages"); 
        
        var handlePage = function(templateFile) {
            var relativePath = templateFile.getParent().substring(baseDir.length);
            var pathParts = relativePath.substring(1).split(/[\/\\]/)
            var pageName = pathParts.join('-');
            var outputFile = new File(this.outputDir, relativePath + '/index.html');

            this.writePage(
                templateFile, 
                outputFile, 
                pageName,
                relativePath);
        }
        
        if (this.page) {
            if (!strings.endsWith(this.page, '/index.rhtml')) {
                this.page += '/index.rhtml';
            }
            
            if (!strings.startsWith(this.page, '/')) {
                this.page = '/' + this.page;
            }
            
            if (!strings.startsWith(this.page, '/pages')) {
                this.page = '/pages' + this.page;
            }
            
            var templateFile = new File(__dirname, this.page);
            handlePage.call(this, templateFile);
        }
        else {
            require('raptor/files/walker').walk(
                baseDir, 
                function(file) {
                    if (file.isFile() && file.getExtension() === "rhtml") {
                        handlePage.call(this, file);
                    }
                },
                this);

            require('docs-util').publisher = null;
        }
        
    },

    writePage: function(templateFile, outputFile, name, relativePath) {
        console.error('Writing page "' + (relativePath || "/") + '" to "' + outputFile + '"...');
        this.currentOutputDir = outputFile.getParentFile();

        var controllerFile = new File(templateFile.getParentFile(), templateFile.getNameWithoutExtension() + ".js");
        var viewModel = null;
        if (controllerFile.exists()) {
            viewModel = require(controllerFile.getAbsolutePath()).controller();
        }

        viewModel = viewModel || {};
        viewModel.pageName = name;
        viewModel.pageOutputDir = outputFile.getParent();

        var output = templating.renderToString(templateFile.getAbsolutePath(), viewModel, this.templateContext);
        outputFile.writeAsString(output);

        this.currentOutputDir = null;
    }
};

try
{
    require('raptor/optimizer').configure(new File(__dirname, "optimizer-config.xml"), {
        profile: args.dev === true ? 'development' : 'production'
    });
    
    
    var publisher = new Publisher(args);
    var start = new Date().getTime();
    publisher.publish();
    console.log("Publish time: " + (new Date().getTime() - start) + 'ms');
}
catch(e) {
    logger.error("Unable to publish docs. Exception: " + e, e);
}