define(
    "components.templates.TemplateTestbed.TemplateTestbedTag",
    ['raptor'],
    function(raptor, raptor) {
        var TemplateTestbedTag = function() {
            
        };
        
        TemplateTestbedTag.prototype = {
            process: function(input, context) {
                var widgetConfig = {};
                widgetConfig.samples = input.samples;
                
                if (input.samples && input.samples.length) {
                    input.samples[0].active = true;
                }
                
                require('raptor/templating').render('components/templates/TemplateTestbed', {
                    widgetConfig: widgetConfig,
                    samples: input.samples
                }, context);
            }
        };
        
        return TemplateTestbedTag;
    });