define(
    "components.overlays.Popover.PopoverWidget",
    ['raptor'],
    function(raptor, require) {
        return {
            initWidget: function(config) {
                $('#' + config.elId).popover(config);
            }
        }
    });