import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    { ignores: ['coverage'] },
    pluginJs.configs.recommended,
    {
    files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.browser,
                process: "readonly",
                describe: "readonly",
                it: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                afterAll: "readonly",
                jest: "readonly",
            },
        },
    }
];