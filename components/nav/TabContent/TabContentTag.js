define(
    "components.nav.TabContent.TabContentTag",
    ['raptor'],
    function(raptor, require) {
        var TabContentTag = function() {
            
        };
        
        TabContentTag.prototype = {
            process: function(input, context) {
                require('raptor/templating').render('components/nav/TabContent', {
                    tag: input
                }, context);
            }
        };
        
        return TabContentTag;
    });