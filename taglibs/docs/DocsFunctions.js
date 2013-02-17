define(
    "taglibs.docs.DocsFunctions",
    function(require) {
        var docsUtil = require('docs-util');
        
        return {
            
            url: function(url) {
                return docsUtil.url(url);               
            },
            
            imageUrl: function(url) {
                return docsUtil.imageUrl(url); 
            }
            
        };
        
    });
    