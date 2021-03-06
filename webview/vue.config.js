const path = require('path');

module.exports = {
    filenameHashing: false,
    outputDir: path.resolve(__dirname, "../dist-webview"),  
    chainWebpack: config => {   
        config.plugin('copy') 
            .tap(([pathConfigs]) => {
                const to = pathConfigs.patterns[0].to;
                pathConfigs.patterns[0].force = true;

                pathConfigs.patterns.unshift({ 
                    from: 'icons',  
                    to: `${to}/icons`,
                })
                
                return [pathConfigs];
            })
    },
}