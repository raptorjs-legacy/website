define(
    "components.nav.TopNavDefault.TopNavDefaultTag",
    ['raptor'],
    function(raptor, raptor) {
        var TopNavTag = function() {
            
        };
        
        TopNavTag.prototype = {
            process: function(input, context) {
                
                require('raptor/templating').render('components/nav/TopNavDefault', {
                    activeItem: input.activeItem
                }, context);
            }
        };
        
        return TopNavTag;
    });