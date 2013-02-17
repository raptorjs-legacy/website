define(
    "components.docs.FeaturePortalSection.FeaturePortalSectionTag",
    ['raptor'],
    function(raptor, raptor) {
        var FeaturePortalSectionTag = function() {
            
        };
        
        FeaturePortalSectionTag.prototype = {
            process: function(input, context) {
                
                require('raptor/templating').render('components/docs/FeaturePortalSection', {
                    title: input.title,
                    url: input.url,
                    size: input.size,
                    className: input['class'],
                    float: input['float'],
                    body: context.captureString(function() {
                        input.invokeBody();
                    })
                }, context);
                
            }
        };
        
        return FeaturePortalSectionTag;
    });