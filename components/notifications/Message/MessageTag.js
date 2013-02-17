define(
    "components.notifications.Message.MessageTag",
    ['raptor'],
    function(raptor, raptor) {
        var MessageTag = function() {
            
        };
        
        MessageTag.prototype = {
            process: function(input, context) {
                require('raptor/templating').render('components/notifications/Message', {
                    tag: input, 
                    type: input.type,
                    message: input.message
                }, context);
            }
        };
        
        return MessageTag;
    });