let path = require("path");

const virtualIndexPlugin = async () => {
	const { globby } = await import("globby");
	const files = await globby(["test/pages/**/*.html", "packages/*/test/pages/**/*.html"]);

	const pagesPerFolder = {};
	files.forEach(file => {
		let folder = pagesPerFolder[path.dirname(file)] = pagesPerFolder[path.dirname(file)] || [];
		folder.push(path.basename(file));
	});

	const rollupInput = {};

	files.forEach(file => {
		rollupInput[file] = path.resolve(process.cwd(), file);
	})

	return {
		name: 'virtual-index-html',
		config() {
			return {
				build: {
					rollupOptions: {
						input: rollupInput
					}
				}
			}
		},
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				if (req.url === "/") {
					const folders = Object.keys(pagesPerFolder);

					res.statusCode = 200;
					res.end(`${folders.map(folder => {
						const pages = pagesPerFolder[folder];
						return `<h1>${folder}</h1>
							${pages.map(page => {
								return `<li><a href='${folder}/${page}'>${page}</a></li>`
							}).join("")}
						`
					}).join("")}`);
				} else {
					next();
				}
			})
		},
	}
};

module.exports = virtualIndexPlugin;