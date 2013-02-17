define(
    "components.overlays.Popover.PopoverWidget",
    ['raptor'],
    function(raptor, raptor) {
        return {
            initWidget: function(config) {
                $('#' + config.elId).popover(config);
            }
        }
    });