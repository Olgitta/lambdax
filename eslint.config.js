// import { ESLint } from "eslint";

module.exports = [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: require("@typescript-eslint/parser"),
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
            prettier: require("eslint-plugin-prettier"),
        },
        rules: {
            // Enable Prettier
            "prettier/prettier": "error",

            // TypeScript rules
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },
];
