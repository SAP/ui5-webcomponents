const fs = require('fs');
const path = require('path');
const prependFile = require('prepend-file');
const replace = require('replace-in-file');

const copyFromPath = path.resolve(process.argv[2]);
const copyToPath = path.resolve(process.argv[3]);
const packageName = process.argv[4] || 'Main';

// Add new components here
const newComponents = [

];

fs.readdir(copyFromPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach((file, index) => {
        //Copy samples
        fs.copyFileSync(path.join(copyFromPath, file), path.join(process.cwd(), `${copyToPath}/${file}`));

        var results = replace({
            files: `.${copyToPath}/${file}`,
            from: [/<pre class="prettyprint lang-html"><xmp>/g, /<\/xmp><\/pre>/g],
            to: ['<pre class="highlight">{% highlight html %}', '{% endhighlight %}</pre>']
        })
            .then( _ => {
                //Get current component name
                const currentSampleName = file.slice(0, file.indexOf('.'));

                prependFile(path.join(process.cwd(), copyToPath, file),
`---
layout: sample
title: ${currentSampleName.replace(/([A-Z])/g, " $1").trim()}
parent: ${packageName} Components
permalink: /playground/components/${packageName === "Main" ? "" : packageName}${currentSampleName}
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

