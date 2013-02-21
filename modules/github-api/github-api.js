define('github-api', function(require) {
    var baseUrl = "https://api.github.com";

    return {        
        contributors: function(owner, repo) {
            var url = baseUrl + "/repos/" + owner + '/' + repo + '/contributors?callback=?';
            return $.getJSON(url);
        }
    }
});