define.Class(
    'taglibs.test.Tab.TabTag',
    function(require) {
        
        
        var TabTag = function() {
            
        };
        
        TabTag.prototype = {
            process: function(input, context) {
                 var tabs = input.tabs;
                 tabs.addTab(input);
            }
        };
        
        return TabTag;
    });