const recommended = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  rules: {
    "@timely/eslint/deprecated-imports": "error",
    "@timely/eslint/avoid-web-storage": "error",
    "@timely/eslint/avoid-prisma-client-import-for-enums": "error",
  },
};

export default recommended;
