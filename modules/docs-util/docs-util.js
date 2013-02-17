define(
    'docs-util',
    function() {
        return {
            publisher: null,
            
            url: function(url) {
                
                var isIndexHtml = url.lastIndexOf('.') === -1 || url.charAt(url.length-1) === '/';

                var basePath = this.publisher.currentOutputDir.getAbsolutePath();
                url = require('path').relative(basePath, this.publisher.outputDir.getAbsolutePath()) + url;

                if (isIndexHtml) {
                    //The URL is a page
                    if (url.charAt(url.length-1) !== '/') {
                        url += '/';
                    }
                    if (this.publisher.appendPageFilename !== false) {
                        url += 'index.html';
                    }
                }

                if (url.charAt(0) === '/') {
                    url = '.' + url;
                }


                return url;           
            },
            
            imageUrl: function(url) {
                return this.url(url);      
            },

            getSrcDir: function() {
                return this.publisher.srcDir;
            }

        }
    });