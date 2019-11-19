module.exports = {
    scripts: {
        hbs2ui5: "ui5 build --exclude-task * --include-task hbs2ui5",
        clean: "rimraf dist",
        lint: "eslint .",
        build: {
            default: "nps clean lint build.templates build.samples build.styles build.i18n copy.src build.bundle copy.webcomponents-polyfill",
            templates: "mkdirp dist/generated/templates && node ./lib/hbs2ui5/index.js -d src/ -o dist/generated/templates",
            styles: {
                default: "nps build.styles.bundles build.styles.components",
                bundles: "postcss src/**/parameters-bundle.css --config config/postcss.bundles --base src --dir dist/css/",
                components: "postcss src/themes/*.css --config config/postcss.components --base src --dir dist/css/",
            },
            i18n: {
                default: "nps build.i18n.defaultsjs build.i18n.json",
                defaultsjs: "mkdirp dist/generated/i18n && node ./lib/i18n/defaults.js src/i18n dist/generated/i18n",
                json: "mkdirp dist/assets/i18n && node ./lib/i18n/toJSON.js src/i18n dist/assets/i18n",
            },
            bundle: "rollup -c --environment ES5_BUILD",
            samples: {
                default: "nps copy.test build.samples.api build.samples.docs build.samples.playground-index",
                api: "jsdoc -c ../../lib/jsdoc/config.json",
                docs: "node ../../lib/documentation/index.js",
                "playground-index": "node lib/playground/index.js",
            }
        },
        copy: {
            src: "copy-and-watch \"src/**/*.js\" dist/",
            test: "copy-and-watch \"test/**/*.*\" dist/test-resources",
            "webcomponents-polyfill": "copy-and-watch \"../../node_modules/@webcomponents/webcomponentsjs/**/*.*\" dist/webcomponentsjs/",
        },
        watch: {
            default: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles"',
            src: 'nps "copy.src --watch --skip-initial-copy"',
            test: 'nps "copy.test --watch --skip-initial-copy"',
            bundle: "rollup -c -w --environment ES5_BUILD,DEV",
            styles: {
                default: 'concurrently "nps watch.styles.bundles" "nps watch.styles.components"',
                bundles: 'nps "build.styles.bundles -w"',
                components: 'nps "build.styles.components -w"',
            },
            templates: "chokidar \"src/**/*.hbs\" -c \"nps build.templates\"",
            samples: "chokidar \"test/**/*.sample.html\" -c \"nps build.samples\"",
        },
        start: {
            default: "nps start.prepare start.run",
            // same as build, but without lint (no need for dev mode) and without build.bundle (rollup watch will create a new one at start)
            prepare: "nps clean build.templates build.samples build.styles build.i18n copy.src copy.webcomponents-polyfill",
            run: 'concurrently "nps serve" "nps watch"',
        },
        serve: {
            default: "nps serve.prepare serve.run",
            prepare: "copy-and-watch \"serve.json\" dist/",
            run: "serve --no-clipboard -l 8080 dist",
        },
        test: {
            default: "nps test.jest test.wdio",
            jest: "jest",
            wdio: {
                // --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
                default: 'concurrently "nps serve" "nps test.wdio.run" --kill-others --success first',
                run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio wdio.conf.js",
            },
        },
    },
};
