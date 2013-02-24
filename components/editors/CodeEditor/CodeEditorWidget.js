define(
    "components/editors/CodeEditor/CodeEditorWidget",
    ['raptor'],
    function(raptor, require) {
        var CodeEditorWidget = function(config) {
            var _this = this;
            
            this.autoFormat = config.autoFormat === true;
            
            this.codeMirror = CodeMirror.fromTextArea(
                    this.getEl('textarea'),
                    {
                        mode: config.mode,
                        indentUnit: config.indentUnit,
                        lineNumbers: config.lineNumbers !== false,
                        readOnly: config.readOnly === true,
                        onChange: function(editor) {
                            _this.publish('change', {
                                codeEditor: _this,
                                value: editor.getValue()
                            });
                        }
                    });
            
            if (config.autoResize) {
                var wrapperEl = this.codeMirror.getWrapperElement();
                var className = wrapperEl.className;
                wrapperEl.className = className ? className + " code-editor-auto-resize" : "code-editor-auto-resize";
            }
            
            
        };
        
        CodeEditorWidget.events = ["change"];
        
        CodeEditorWidget.prototype = {
            getTextArea: function() {
                return this.codeMirror.getTextArea();
            },
            
            getValue: function() {
                return this.codeMirror.getValue();
            },
            
            setValue: function(value) {
                this.codeMirror.setValue(value);
                
                if (this.autoFormat) {
                    this.format();
                }
                
            },
            
            setAutoFormat: function(autoFormat) {
                this.autoFormat = autoFormat === true;
                if (this.autoFormat) {
                    this.format();
                }
            },
            
            isAutoFormat: function() {
                return this.autoFormat === true;
            },
            
            format: function() {
                var startPos = this.codeMirror.posFromIndex(0);
                var endPos = this.codeMirror.posFromIndex(this.getValue().length);
                this.codeMirror.autoFormatRange(startPos, endPos);    
            }
        };
        
        return CodeEditorWidget;
    });