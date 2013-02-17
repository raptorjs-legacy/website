define(
    "components.buttons.Button.ButtonWidget",
    ['raptor'],
    function(raptor, raptor) {
        var ButtonWidget = function(config) {
            var _this = this;
            
            
            
            this.toggled = false;
            this.jqueryButton = this.$();
            this._toggle = config.toggle;
            
            if (config.toggled) {
                this.toggle();
            }
            
            
            this.$().click(function() {
                _this.publish('click', {
                    button: this
                });
                
                if (_this._toggle) {
                    _this.toggle();
                }
            });
        };
        
        ButtonWidget.events = ["click", "toggle"];
        
        ButtonWidget.controller = "components.buttons.Button.ButtonTag";
        
        ButtonWidget.prototype = {
            toggle: function() {
                this.toggled = !this.toggled;
                this.jqueryButton.button('toggle');
                this.publish('toggle', {
                    button: this
                });
            }
        };
        
        return ButtonWidget;
    });