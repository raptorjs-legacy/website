define(
    "components/docs/ViewDemo/ViewDemoRenderer",
    function(require) {
        return {
            render: function(input, context) {
                var path = input.path,
                    href = require('docs-util').url(path),
                    title = input.title || path;

                context.renderTemplate('components/docs/ViewDemo', {
                    title: title,
                    description: input.description,
                    href: href

                })
            }
        }
    });