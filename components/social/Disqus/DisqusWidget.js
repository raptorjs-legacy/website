define.Class(
    "components.social.Disqus.DisqusWidget",
    ['raptor'],
    function(raptor, raptor) {
        var DisqusWidget = function(config) {
            window.disqus_shortname = config.shortName; // required: replace example with your forum shortname
            if (config.id) {
                window.disqus_identifier = config.id;
            }
            
            if (config.title) {
                window.disqus_title = config.title;
            }
            
            var dsq = document.createElement('script'); 
            dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + config.shortName + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        };

        DisqusWidget.prototype = {

        };

        return DisqusWidget;
    });