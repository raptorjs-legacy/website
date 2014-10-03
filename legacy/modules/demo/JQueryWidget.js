define.Class(
    "demo/JQueryWidget",
    function(require) {
        return {
            init: function(widgetConfig) {
                this.$("#colorsUL > li").click(function(e) {
                    var $li = $(e.target),
                        color = $li.data("color");

                    $li.css('background-color', color)
                       .text(color);

                });
            }
        }
    });