define(
    "components.footers.FooterSingleLine.FooterSingleLineTag",
    ['raptor'],
    function(raptor, raptor) {
        var FooterDefaultTag = function() {
            
        };
        
        FooterDefaultTag.prototype = {
            process: function(input, context) {
                
                require('raptor/templating').render('components/footers/FooterSingleLine', {
                    
                }, context);
            }
        };
        
        return FooterDefaultTag;
    });