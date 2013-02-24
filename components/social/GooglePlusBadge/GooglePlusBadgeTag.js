define(
    "components.social.GooglePlusBadge.GooglePlusBadgeTag",
    ['raptor'],
    function(raptor, require) {
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