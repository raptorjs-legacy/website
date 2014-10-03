define(
    'docs-util',
    function() {
        return {
            publisher: null,

            url: function(url) {

                var isIndexHtml = url.lastIndexOf('.') === -1 || url.charAt(url.length-1) === '/';

                var pageOutputDir = this.publisher.currentOutputDir.getAbsolutePath();
                url = '/legacy' + url;

                if (isIndexHtml) {
                    //The URL is a page
                    if (url.charAt(url.length-1) !== '/') {
                        url += '/';
                    }
                    if (this.publisher.appendPageFilename !== false) {
                        url += 'index.html';
                    }
                }

                return url;
            },

            imageUrl: function(url) {
                return this.url(url);
            },

            getSrcDir: function() {
                return this.publisher.srcDir;
            },

            getRaptorJSVersion: function() {
                return this.publisher.raptorJSVersion;
            }

        };
    });