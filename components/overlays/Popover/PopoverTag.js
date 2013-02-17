define(
    "components.overlays.Popover.PopoverTag",
    ['raptor'],
    function(raptor, raptor) {
        var PopoverTag = function() {
            
        };
        
        PopoverTag.prototype = {
            process: function(input, context) {
                
                var rootAttrs = {},
                    widgetConfig = {};
                
                if (input.title) {
                    rootAttrs.title = input.title;
                }
                
                if (input.content) {
                    rootAttrs['data-content'] = input.content;
                }

                if (input.animation) {
                    widgetConfig.animation = input.animation;
                }
                
                if (input.placement) {
                    widgetConfig.placement = input.placement;
                }
                
                if (input.selector) {
                    widgetConfig.selector = input.selector;
                }
                
                if (input.trigger) {
                    widgetConfig.trigger = input.trigger;
                }
                
                if (input.delay) {
                    widgetConfig.delay = input.delay;
                }
                
                require('raptor/templating').render('components/overlays/Popover', {
                    tag: input, 
                    linkText: input.linkText,
                    rootAttrs: rootAttrs,
                    widgetConfig: widgetConfig
                }, context);
            }
        };
        
        return PopoverTag;
    });