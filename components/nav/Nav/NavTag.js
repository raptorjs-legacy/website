define(
    "components.nav.Nav.NavTag",
    ['raptor'],
    function(raptor, raptor) {
        var NavTag = function() {
            
        };
        
        NavTag.prototype = {
            process: function(input, context) {
                
                var rootAttrs = {};
                
                var classParts = ["nav"];
                
                if (input.type) {                    
                    classParts.push("nav-" + input.type);
                }
                
                if (input.stacked) {
                    classParts.push("nav-stacked");
                }
                
                rootAttrs["class"] = classParts.join(" ");

                var navItems = [];
                
                require('raptor/templating').render('components/nav/Nav', {
                    navItems: navItems,
                    rootAttrs: rootAttrs,
                    invokeBody: input.invokeBody,
                    nav: input
                }, context);
            }
        };
        
        return NavTag;
    });