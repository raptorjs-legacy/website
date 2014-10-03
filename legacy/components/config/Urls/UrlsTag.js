define(
    "components.config.Urls.UrlsTag",
    ['raptor'],
    function(raptor, require) {
        var UrlsTag = function() {
            
        };
        
        UrlsTag.prototype = {
            process: function(input, context) {
                context.basePath = input.basePath;
            }
        };
        
        return UrlsTag;
    });