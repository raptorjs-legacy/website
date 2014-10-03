exports.controller = function() {
    return {
        raptorJSVersion: require('docs-util').getRaptorJSVersion()
    };
};