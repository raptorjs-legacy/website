exports.controller = function() {
    var resources = require('raptor/resources'),
        raptor = require('raptor');
    
    var samples = eval('(' + resources.findResource('/sample-templates/index.json').readAsString() + ')');
    
    
    var readResource = function(path, defaultValue) {        
        var resource = resources.findResource("/sample-templates/" + path);
        return resource && resource.exists() ? resource.readAsString() : defaultValue;
    };
    
    var defaultOptionsJson = readResource('default-options.json');
    
    var convertSamples = function(samples) {
        raptor.forEach(samples, function(sample, i) {

            if (sample.templates) {
                raptor.forEach(sample.templates, function(templatePath, j) {
                    sample.templates[j] = {
                        source: readResource(templatePath),
                        path: templatePath
                    };
                }, this);
            }
            
            if (sample.path) {
                sample.template = readResource(sample.path + ".rhtml", '');
                sample.data = readResource(sample.path + "-data.json", '{}');
                sample.options = readResource(sample.path + "-options.json");
            }
            
            if (!sample.options) {
                sample.options = defaultOptionsJson;
            }

            if (sample.samples) {
                convertSamples(sample.samples);
            }
        });
    }
    
    convertSamples(samples);
    
    
    
    return {
        samples: samples
    };
};