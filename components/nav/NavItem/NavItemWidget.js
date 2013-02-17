define(
    "components.nav.Nav.NavItemWidget",
    ['raptor'],
    function(raptor, raptor) {
        var NavItemWidget = function(config) {
            var _this = this; 
            this.$().click(function() {
                _this.publish('click', {
                    el: this,
                    nav: _this
                });
            });
        };
        
        NavItemWidget.events = ["click"]
        
        NavItemWidget.prototype = {
            show: function() { 
                this.$("a").tab('show'); 
            }
        };
        
        return NavItemWidget;
    });