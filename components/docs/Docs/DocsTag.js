define(
    "components.docs.Docs.DocsTag",
    ['raptor'],
    function(raptor, raptor) {
        var strings = require('raptor/strings'),
            arrays = require('raptor/arrays');
        
        var DocsTag = function() {
            
        };
        
        DocsTag.prototype = {
            process: function(input, context) {
                
                var sectionStack = [];
                sectionStack.push({
                    sections: []
                });
                
                context.docsBeginSection = function(callback) {
                    var section = {
                       level: sectionStack.length - 1,
                       sections: [],
                       getAnchorName: function() {
                           var anchorName = this.anchorName;
                           if (!anchorName && this.heading) {
                               anchorName = this.heading;
                               anchorName = anchorName.replace(/[\-]/g, '');
                               anchorName = anchorName.replace(/(?:\s|[\-.])+((?:[a-zA-Z])+)/g, function(matches, part) {
                                   return "_" + part;
                               })
                               anchorName = anchorName.replace(/[^a-zA-Z0-9_]+/g, '')
                           }
                           return anchorName;
                       }
                    };
                    
                    arrays.peek(sectionStack).sections.push(section);
                    sectionStack.push(section);
                    callback(section);
                    arrays.pop(sectionStack);
                }
                
                var disqusId = input.disqusId;
                var sb = strings.createStringBuilder();
                context.swapWriter(
                    sb,
                    function() {
                        input.invokeBody();

                        if (disqusId) {
                            require('raptor/templating').render('components/docs/Docs/Docs_discussion-section', {
                                heading: input.heading,
                                disqusId: disqusId
                            }, context);
                        }
                    });
                
                var rootSection = sectionStack[0];

                

                require('raptor/templating').render('components/docs/Docs', {
                    heading: input.heading,
                    content: sb.toString(),
                    rootSection: rootSection,
                    returnLabel: input.returnLabel,
                    returnHref: input.returnHref,
                    disqusId: input.disqusId
                }, context);
            }
        };
        
        return DocsTag;
    });