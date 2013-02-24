define(
    "components.templates.TemplatesTopNav.TemplatesTopNavTag",
    ['raptor'],
    function(raptor, require) {
        var TopNavTag = function() {
            
        };
        
        TopNavTag.prototype = {
            process: function(input, context) {
                
                require('raptor/templating').render('components/templates/TemplatesTopNav', {
                    activeItem: input.activeItem
                }, context);
            }
        };
        
        return TopNavTag;
    });