import * as fs from 'fs';
import * as xmlbuilder from 'xmlbuilder';

const data = require('../dist/playground/stories.json');

let xml = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
xml.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

for (let key in data.stories) {
    xml.ele('url')
        .ele('loc', {}, `https://sap.github.io/ui5-webcomponents/playground/?path=/${key}`)
        .up()
        .ele('changefreq', {}, 'weekly');
}

let xmlString = xml.end({ pretty: true });
fs.writeFileSync('./dist/playground/sitemap.xml', xmlString);
