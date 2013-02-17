define(
    "components.social.GooglePlusOne.GooglePlusOneTag",
    ['raptor'],
    function(raptor, raptor) {
        var GooglePlusOneTag = function() {
            
        };
        
        GooglePlusOneTag.prototype = {
            process: function(input, context) {
                require('raptor/templating').render('components/social/GooglePlusOne', {
                    width: input.width || 300
                }, context);
            }
        };
        
        return GooglePlusOneTag;
    });