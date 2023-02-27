// vite.config.js
import { defineConfig } from "vite";

export default defineConfig(async () => {
    return {
        build: {
            outDir: "assets/js/ui5-webcomponents",
            lib: {
                entry: "bundle.esm.js",
                formats: ["es"],
                fileName: () => "bundle.esm.js",
            },
        },
    };
});
