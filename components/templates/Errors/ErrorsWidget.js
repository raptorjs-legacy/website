define(
    "components.templates.Errors.ErrorsWidget",
    ['raptor'],
    function(raptor, require) {
        var ErrorsWidget = function(config) {
            this._hasErrors = false;
        };
        
        ErrorsWidget.prototype = {
            setErrors: function(errors) {
                if (errors && errors.length) {
                    this.$("#ul").empty();
                    this.addErrors(errors);
                }
                else {
                    this._hasErrors = false;
                    this.$("#ul").hide().empty();
                }
                
            },
            
            clearErrors: function() {
                this.setErrors(null);
            },
            
            hasErrors: function() {
                return this._hasErrors;
            },
            
            addErrors: function(errors) {
                if (errors && errors.length) {
                    this._hasErrors = true;
                    var ul = this.getEl('ul');
                    raptor.forEach(errors, function(error) {
                        var li = document.createElement('LI');
                        li.innerHTML = require('raptor/templating').renderToString('components/templates/Errors-error', {message: error.message});
                        ul.appendChild(li);
                    }, this);
                    
                    this.$("#ul").show();
                }
            }
        };
        
        return ErrorsWidget;
    });