define(
    "components.buttons.ButtonGroup.ButtonGroupTag",
    ['raptor'],
    function(raptor, raptor) {
        var ButtonGroupTag = function() {
            
        };
        
        ButtonGroupTag.prototype = {
            process: function(input, context) {
                
                var rootAttrs = {};
                
                if (input.toggle) {
                    rootAttrs["data-toggle"] = "buttons-" + input.toggle;
                }
                
                require('raptor/templating').render('components/buttons/ButtonGroup', {
                    tag: input, 
                    rootAttrs: rootAttrs
                }, context);
            }
        };
        
        return ButtonGroupTag;
    });