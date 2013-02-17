define(
    "components.tracking.GoogleAnalytics.GoogleAnalyticsTag",
    ['raptor'],
    function(raptor, raptor) {
        var TwitterFollowTag = function() {
            
        };
        
        TwitterFollowTag.prototype = {
            process: function(input, context) {
                require('raptor/templating').render('components/tracking/GoogleAnalytics', {}, context);
            }
        };
        
        return TwitterFollowTag;
    });