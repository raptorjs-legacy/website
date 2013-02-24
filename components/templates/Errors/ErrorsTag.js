define(
    "components.templates.Errors.ErrorsTag",
    ['raptor'],
    function(raptor, require) {
        var ErrorsTag = function() {
            
        };
        
        ErrorsTag.prototype = {
            process: function(input, context) {
                var widgetConfig = {};
                
                require('raptor/templating').render('components/templates/Errors', {
                    widgetConfig: widgetConfig
                }, context);
            }
        };
        
        return ErrorsTag;
    });