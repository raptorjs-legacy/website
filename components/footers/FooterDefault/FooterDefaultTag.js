define(
    "components.footers.FooterDefault.FooterDefaultTag",
    ['raptor'],
    function(raptor, raptor) {
        var FooterDefaultTag = function() {
            
        };
        
        FooterDefaultTag.prototype = {
            process: function(input, context) {
                
                require('raptor/templating').render('components/footers/FooterDefault', {
                    
                }, context);
            }
        };
        
        return FooterDefaultTag;
    });