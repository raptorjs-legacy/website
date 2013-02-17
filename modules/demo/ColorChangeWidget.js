define.Class(
    "demo/ColorChangeWidget",
    function(require) {
        return {
            init: function(widgetConfig) {
                var colors = widgetConfig.colors,
                    curColor = 0;

                var $rootEl = $(this.getEl());
                // jQuery short-hand: var $rootEl = this.$();

                $rootEl.click(function(e) {
                    var nextColor = colors[(curColor++) % colors.length];
                    $rootEl.css("background-color", nextColor);
                });
            }
        }
    });