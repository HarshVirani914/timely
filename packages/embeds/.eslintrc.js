/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslintrc.js"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        // Ensure that embed packages(They are published) can't access unpublished packages which is basically all @timely/* packages except embed packages
        patterns: ["@timely/*", "!@timely/embed-*"],
      },
    ],
  },
};
