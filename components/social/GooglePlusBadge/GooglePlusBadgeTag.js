define(
    "components.social.GooglePlusBadge.GooglePlusBadgeTag",
    ['raptor'],
    function(raptor, raptor) {
        var GooglePlusBadgeTag = function() {
            
        };
        
        GooglePlusBadgeTag.prototype = {
            process: function(input, context) {
                require('raptor/templating').render('components/social/GooglePlusBadge', {
                    title: input.title,
                    href: input.href
                }, context);
            }
        };
        
        return GooglePlusBadgeTag;
    });