const fs = require('fs');
const path = require('path');
const prependFile = require('prepend-file');
const replace = require('replace-in-file');

const samplesPath = path.resolve(process.argv[2]);

 // Add new components here
const newComponents = [

];

fs.readdir(samplesPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach((file, index) => {
        //Copy samples
        fs.copyFileSync(path.join(samplesPath, file), path.join(process.cwd(), `/docs/main-components/${file}`));

        var results = replace({
            files: `./docs/components/${file}`,
            from: [/<pre class="prettyprint lang-html"><xmp>/g, /<\/xmp><\/pre>/g],
            to: ['<pre class="highlight">{% highlight html %}', '{% endhighlight %}</pre>']
        })
            .then( _ => {
                //Get current component name
                const currentSampleName = file.slice(0, file.indexOf('.'));

                prependFile(path.join(process.cwd(), '/docs/components', file),
`---
layout: sample
title: ${currentSampleName.replace(/([A-Z])/g, " $1").trim()}
parent: Components
permalink: /playground/components/${currentSampleName}
newComponent: ${newComponents.indexOf(currentSampleName) > -1}
nav_order: ${index}
---
`,
                err => {
                    if (err) {
                        // Error
                        console.log(`Error: Can't prepend to ${file}`);
                    }
                })
            })
    });
});

