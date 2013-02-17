define(
    "components.footers.Footer.FooterTag",
    ['raptor'],
    function(raptor, raptor) {
        var FooterDefaultTag = function() {
            
        };
        
        FooterDefaultTag.prototype = {
            process: function(input, context) {
                
                require('raptor/templating').render('components/footers/Footer', {
                    type: input.type 
                }, context);
            }
        };
        
        return FooterDefaultTag;
    });