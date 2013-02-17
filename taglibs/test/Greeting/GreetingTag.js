define.Class(
    'taglibs.test.Greeting.GreetingTag',
    function(require) {
        var GreetingTag = function() {
            
        };
        
        GreetingTag.prototype = {
            process: function(input, context) {
                context.write("Hello " + input.name + "!");
            }
        };
        
        return GreetingTag;
    });