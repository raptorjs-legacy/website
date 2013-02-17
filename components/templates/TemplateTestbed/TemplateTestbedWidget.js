define(
    "components.templates.TemplateTestbed.TemplateTestbedWidget",
    ['raptor'],
    function(raptor, require) {
        var stringify = require('raptor/json/stringify');
        
        var TemplateTestbedWidget = function(config) {
            this.samples = config.samples;
            this.activeSample = null;
            this.topLevelIndex = -1;
            
            this.autoRender = true;
            this.compileRequired = true;
            this.dataModified = true;
            this.optionsModified = true;
            this.renderRequired = true;
            this.optionsVisible = false;
            
            require('raptor/pubsub').subscribe({
                "toggleAutoFormatHtml": function() {
                    this.toggleAutoFormatHtml();
                }
            }, this)
            
            this.defaultOptionsJson = stringify(require('raptor/templating/compiler').defaultOptions);
            
            this.loadSample(0);
            
            this.renderButton.subscribe('click', function(eventArgs) {
                this.update();
            }, this);
            
            
            
            this.showCompiledToggleButton.subscribe('toggle', function(eventArgs) {
                this.toggleCompiledOutput();
            }, this);
            
            this.showOptionsToggleButton.subscribe('toggle', function(eventArgs) {
                this.toggleCompilerOptions();
            }, this);
            
            this.autoRenderToggleButton.subscribe('toggle', function(eventArgs) {
                this.autoRender = !this.autoRender;
            }, this);
            
            this.templateEditor.subscribe('change', function() {
                this.compileRequired = true;
                this.renderRequired = true;
                
                if (this.autoRender) {
                    this.update();
                }
            }, this);
            
            this.dataEditor.subscribe('change', function() {
                this.dataModified = true;
                this.renderRequired = true;
                
                if (this.autoRender) {
                    this.update();
                }
            }, this);
            
            this.optionsEditor.subscribe('change', function() {
                this.optionsModified = true;
                this.compileRequired = true;
                this.renderRequired = true;
                
                if (this.autoRender) {
                    this.update();
                }
            }, this);
            
            require('raptor/pubsub').subscribe('loadSample', function(eventArgs) {
                this.loadSample(eventArgs.sampleIndex);
            }, this);
        };
        
        TemplateTestbedWidget.prototype = {
            loadSample: function(index) {
                
                var samples = this.samples, 
                    sample,
                    navItemId;

                raptor.forEach(index, function(i) {
                    sample = samples[i];
                    samples = sample ? sample.samples : null;
                });
                
                while (!sample.path) {
                    if (sample.samples) {
                        sample = sample.samples[0];
                    }
                    else {
                        break;
                    }
                }
                
                if (sample === this.activeSample) {
                    return;
                }
                
                if (typeof index === 'number') { //Check if the index is top-level index
                    if (this.topLevelIndex != -1) {
                        $("#subsamples-" + this.topLevelIndex).slideToggle();
                    }
                    
                    this.topLevelIndex = index;
                    $("#subsamples-" + index).slideToggle();

                    
                    var subSampleNavItem = this.getWidget('subSampleNavItem-' + sample.path);
                    if (subSampleNavItem) {
                        subSampleNavItem.show();
                    }
                }
                
                
                this.activeSample = sample;
                
                if (!sample.templatesLoaded) {
                    raptor.forEach(sample.templates, function(template) {
                        require('raptor/templating/compiler').compileAndLoad(template.source, template.path);
                    }, this);
                    sample.templatesLoaded = true;
                }
                
                this.templateEditor.setValue(sample.template);
                this.dataEditor.setValue(sample.data);
                this.optionsEditor.setValue(sample.options || this.defaultOptionsJson);
                this.update();
                
                if (sample.showCompilerOptions) {
                    this.toggleCompilerOptions(true);
                }
            },
            
            handleEditorException: function(errorsWidget, e) {
                var errors = e.errors;
                
                if (!errors) {
                    errors = [{message: e.toString()}];
                }
                
                errorsWidget.addErrors(errors);                
            },
            
            update: function() {
                this.updateJson('compilerOptions', 'optionsModified', this.optionsEditor, this.optionsErrors);
                this.compileTemplate();
                this.updateJson('templateData', 'dataModified', this.dataEditor, this.dataErrors);
                this.renderTemplate();
            },
            
            compileTemplate: function() {
                if (!this.compilerOptions) {
                    return;
                }
                
                if (!this.compileRequired) {
                    return;
                }
                
                this.templateName = null;
                
                var templateSrc = this.templateEditor.getValue();
                var compiler = require('raptor/templating/compiler');
                
                var compiledSrc;
                
                this.templateErrors.clearErrors();
                var templateDom;
                
                try
                {
                    templateDom = require('raptor/xml/dom').createParser().parse(templateSrc);
                }
                catch(e) {
                    this.handleEditorException(this.templateErrors, "Invalid XML: " + e);
                }
                
                if (templateDom) {
                    try
                    {
                        var compilerOptions = raptor.extend({
                                defaultTemplateName: "test",
                                nameCallback: function(name) {
                                    templateName = name;
                                }
                            }, this.compilerOptions);

                        compiledSrc = compiler.compile(
                            templateDom, 
                            "test", 
                            compilerOptions);
                    }
                    catch(e) {
                        if (window.console) {
                            console.error(e);
                        }
                        
                        this.handleEditorException(this.templateErrors, e);
                    }
                }
                
                
                if (compiledSrc) {
                    this.compiledEditor.setValue(compiledSrc);
                    
                    require('raptor/templating').unload(templateName);

                    try
                    {
                        eval(compiledSrc);
                        this.templateName = templateName;
                    }
                    catch(e) {
                        this.handleEditorException(this.templateErrors, e);
                    }
                }
                else {
                    this.compiledEditor.setValue('');
                }
                
                this.compileRequired = false;
            },
            
            updateJson: function(targetProp, modifiedProp, editor, errors) {
                if (!this[modifiedProp]) {
                    return;
                }
                
                this[targetProp] = null;
                errors.clearErrors();
                
                var jsonData = editor.getValue();
                var data;
                
                try
                {
                    data = eval("(" + jsonData + ")");
                    this[targetProp] = data;
                }
                catch(e) {
                    this.handleEditorException(errors, e);
                }
                
                this[modifiedProp] = false;
            },
            
            renderTemplate: function() {
                if (!this.renderRequired) {
                    return;
                }
                
                if (this.templateData && this.templateName && this.compilerOptions) {
                    try
                    {
                        var output = require('raptor/templating').renderToString(this.templateName, this.templateData);
                        this.outputEditor.setValue(output);
                        this.$("#htmlViewer").html(output);
                    }
                    catch(e) {
                        this.handleEditorException(this.templateErrors, e); //TBD: ADD THIS TO THE OUTPUT ERRORS?
                        this.outputEditor.setValue('');
                        this.$("#htmlViewer").html('');
                    }
                }
                else {
                    this.outputEditor.setValue('');
                    this.$("#htmlViewer").html('');
                }
                this.renderRequired = false;
                
            },
            
            toggleCompiledOutput: function() {
                this.$("#compiledTemplateSection").toggle();
            },
            
            toggleCompilerOptions: function(visible) {
                if (arguments.length === 1 && visible === this.visible) {
                    return; //Nothing to do
                }
                
                this.optionsVisible = !this.optionsVisible;
                
                if (this.optionsVisible) {
                    this.$("#compilerOptionsSection").removeClass("compiler-options-hidden");    
                }
                else {
                    this.$("#compilerOptionsSection").addClass("compiler-options-hidden");
                }
                
            },
            
            toggleAutoFormatHtml: function() {
                this.outputEditor.setAutoFormat(!this.outputEditor.isAutoFormat());
            },
        };
        
        return TemplateTestbedWidget;
    });