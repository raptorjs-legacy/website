define.Class(
    'taglibs.test.Container.ContainerTag',
    function(require) {
        
        return {
            process: function(input, context) {
                
                context.renderTemplate(
                    "taglibs/test/Container",
                    {
                        title: input.title,
                        invokeBody: input.invokeBody
                    });
            }
        };
    }
);