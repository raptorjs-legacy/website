define.Class(
    "components/social/GithubContributors/GithubContributorsWidget",
    function(raptor, require) {
        var templating = require('raptor/templating'),
            componentRenderer = require('raptor/component-renderer'),
            githubApi = require('github-api');

        return {
            init: function(widgetConfig) {
                this.owner = widgetConfig.owner;
                this.repo = widgetConfig.repo;

                if (widgetConfig.clientRender) {
                    this.loadAndShowContributors();
                }        
            },

            loadAndShowContributors: function(owner, repo) {
                githubApi.contributors(
                    this.owner,
                    this.repo)
                        .then(
                            function(response) {
                                var contributors = response.data;
                                if (response.meta.status === 200) {
                                    componentRenderer
                                        .render(function(input, context) {
                                            templating.render(
                                                'components/social/GithubContributors/contributors',
                                                {
                                                    contributors: response.data
                                                },
                                                context);
                                        })
                                        .appendTo(this.getEl());
                                }
                                else {
                                    this.showError();
                                }
                            }.bind(this)
                        )
                        .error(
                            function(error) {
                                console.error(err);
                                this.showError();
                            }.bind(this)
                        );
            },

            showError: function(message) {
                this.getEl().innerHTML = message || "An error occurred while invoking the Github API";
            }
        }
    });