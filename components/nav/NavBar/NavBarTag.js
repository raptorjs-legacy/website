define(
    "components.nav.NavBar.NavBarTag",
    ['raptor'],
    function(raptor, raptor) {
        var NavBarTag = function() {
            
        };
        
        NavBarTag.prototype = {
            process: function(input, context) {
                
                var rootAttrs = {};
                
                var classParts = ["navbar"];
                
                if (input.type) {                    
                    classParts.push("navbar-" + input.type);
                }
                
                rootAttrs["class"] = classParts.join(" ");

                require('raptor/templating').render('components/nav/NavBar', {
                    rootAttrs: rootAttrs,
                    brand: input.brand,
                    brandHref: input.brandHref,
                    tag: input
                }, context);
            }
        };
        
        return NavBarTag;
    });