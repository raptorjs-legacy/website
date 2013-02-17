define(
    "components.social.Disqus.DisqusTag",
    ['raptor'],
    function(raptor, raptor) {
        var DisqusTag = function() {
            
        };
        
        DisqusTag.prototype = {
            process: function(input, context) {
                var widgetConfig = {
                    shortName: input.shortName
                };
                
                if (input.id) {
                    widgetConfig.id = input.id;
                }
                
                if (input.title) {
                    widgetConfig.title = input.title;
                }
                
                require('raptor/templating').render('components/social/Disqus', {
                    widgetConfig: widgetConfig
                }, context);
            }
        };
        
        return DisqusTag;
    });