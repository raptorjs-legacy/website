define(
    "components.social.TwitterTweet.TwitterTweetTag",
    ['raptor'],
    function(raptor, raptor) {
        var TwitterTweetTag = function() {
            
        };
        
        TwitterTweetTag.prototype = {
            process: function(input, context) {
                require('raptor/templating').render('components/social/TwitterTweet', {
                    url: input.url, 
                    via: input.via,
                    text: input.text,
                    size: input.size
                }, context);
            }
        };
        
        return TwitterTweetTag;
    });