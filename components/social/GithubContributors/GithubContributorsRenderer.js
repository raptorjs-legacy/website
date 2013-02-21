define(
    "components/social/GithubContributors/GithubContributorsRenderer",
    function(require) {

        var useSampleData = false,
            File = require('raptor/files/File');

        return {
            render: function(input, context) {
                var clientRender = true,
                    contributors = input.contributors;

                if (useSampleData) {
                    contributors = JSON.parse(new File(__dirname, "sample-data.json").readAsString());
                }

                if (contributors) {
                    clientRender = false;
                    contributors.sort(function(a, b) {
                        a = a.contributions;
                        b = b.contributions;
                        return b - a;
                    });
                }
                else {
                    if (!input.owner) {
                        throw new Error('owner is required');
                    }
                    if (!input.repo) {
                        throw new Error('repo is required');
                    }
                }
                
                require('raptor/templating').render('components/social/GithubContributors', {
                    contributors: contributors,
                    widgetConfig: {
                        owner: input.owner,
                        repo: input.repo,
                        clientRender: clientRender 
                    }
                }, context);
            }
        }
    });