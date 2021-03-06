define(
    "components.docs.ProjectDirStructure.ProjectDirStructureTag",
    ['raptor'],
    function(raptor, require) {
        
        var File = require('raptor/files/File'),
            githubUrl = "https://github.com/raptorjs/samples/blob/master",
            startsWith = require('raptor/strings').startsWith,
            defaultExcludes = ['/.gitignore', 
                               '/npm-debug.log',
                               '/build/',
                               '/node_modules/',
                               '/work/'];
        

        var FileNode = function(file, projectDir, repoRootDir) {
            this.file = file;
            this.parentNode = null;
            this.children = [];
            this.projectDir = projectDir;
            this.repoRootDir = repoRootDir;
        };
        
        FileNode.prototype = {
            getLabel: function() {

                var label;
                if (!this.parentNode) {
                    label = this._relPath(this.repoRootDir);
                }
                else {
                    label = this._relPath(this.parentNode.file).substring(1);
                }

                if (this.file.isDirectory()) {
                    label += '/';
                }

                return label;
            },
            
            getHref: function() {
                var relPath = this._relPath(this.repoRootDir);
                return githubUrl + relPath;
            },
            
            _relPath: function(baseDir) {

                return this.file.getAbsolutePath().substring(baseDir.getAbsolutePath().length).replace(/\\/g, '/');
            }
        }
        
        
        var ProjectDirStructureTag = function() {
            
        };
        
        ProjectDirStructureTag.prototype = {
            process: function(input, context) {
                var repoRootDir = new File(require('docs-util').getSrcDir(), "../samples");

                var projectDir = new File(repoRootDir, input.dir);
                var excludeFile = new File(projectDir, ".exclude");


                var excludes = defaultExcludes;
                if (excludeFile.exists()) {
                    var excludesStr = excludeFile.readAsString();
                    var sampleExcludes = excludesStr.split(/\n/);
                    excludes = excludes.concat(sampleExcludes);
                }

                var walkDir = function(file, parentNode) {
                    var filename = file.getName();
                    if (filename.charAt(0) === '.') {
                        return; //Skip hidden files
                    }

                    var node = new FileNode(file, projectDir, repoRootDir);
                    var relPath = node._relPath(projectDir);



                    if (excludes) {
                        var excludePathToCheck = relPath;
                        if (file.isDirectory()) {
                            excludePathToCheck += '/';
                        }

                        for (var i=0, len=excludes.length; i<len; i++) {
                            if (excludePathToCheck.startsWith(excludes[i])) {
                                return null;
                            }
                        }
                    }

                    if (parentNode) {
                        node.parentNode = parentNode;
                        parentNode.children.push(node);
                    }
                    
                    if (file.isDirectory()) {
                        file.forEachFile(function(child) {
                            walkDir(child, node);
                        });
                    }
                    return node;
                };
                
                var rootNode = walkDir(projectDir);
                
                require('raptor/templating').render('components/docs/ProjectDirStructure', {
                    rootNode: rootNode
                }, context);
                
            }
        };
        
        return ProjectDirStructureTag;
    });