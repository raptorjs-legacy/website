define(
    "components.editors.CodeEditor.CodeEditorTag",
    ['raptor'],
    function(raptor, raptor) {
        var CodeEditorTag = function() {
            
        };
        
        CodeEditorTag.prototype = {
            process: function(input, context) {
                var widgetConfig = {},
                    textareaAttrs = {};
                
                if (input.mode) {
                    widgetConfig.mode = input.mode;
                }
                
                widgetConfig.autoResize = input.autoResize !== false;

                if (input.readOnly === true) {
                    widgetConfig.readOnly = true;
                }
                
                if (input.autoFormat) {
                    widgetConfig.autoFormat = true;
                }
                
                if (!input.name) {
                    var nextId = context.nextCodeEditorId || (context.nextCodeEditorId = 0);
                    input.name = "code-" + nextId;
                    context.nextCodeEditorId++;
                }
                
                textareaAttrs.name = input.name;
                
                if (input.lineNumbers === false) {
                    widgetConfig.lineNumbers = false;
                }
                
                if (input.indentUnit) {
                    widgetConfig.indentUnit = input.indentUnit == null ? 4 : input.indentUnit;
                }

                var bodyText = '';

                if (input.resource) {
                    var resource = require('raptor/resources').findResource(input.resource);
                    bodyText = resource.readAsString();
                }
                else if (input.invokeBody) {
                    bodyText = context.captureString(function() {
                        input.invokeBody();
                    }, this);
                    // console.error('------------');
                    // console.error(JSON.stringify(bodyText));

                    var initialSpaceMatches = /^\s+/.exec(bodyText);
                    

                    if (initialSpaceMatches) {
                        //console.error(JSON.stringify(initialSpaceMatches[0]));

                        var indentMatches = /\n[^\n]*$/.exec(initialSpaceMatches[0]);
                        if (indentMatches) {
                            //console.error(JSON.stringify(indentMatches[0]));
                            var indentRegExp = new RegExp(indentMatches[0].replace(/\n/g, "\\n"), "g");
                            bodyText = bodyText.replace(indentRegExp, '\n');
                        }

                        bodyText = bodyText.replace(/^\s*/, '').replace(/\s*$/, '');
                    }
                    //console.error(JSON.stringify(bodyText));

                    
                    
                }

                
                
                    
                require('raptor/templating').render('components/editors/CodeEditor', {
                    tag: input, 
                    widgetConfig: widgetConfig,
                    textareaAttrs: textareaAttrs,
                    title: input.title,
                    bodyText: bodyText
                }, context);
            }
        };
        
        return CodeEditorTag;
    });