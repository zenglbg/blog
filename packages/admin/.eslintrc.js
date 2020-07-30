module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript"],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    myGlobal: false,
  },
  rules: {
    // Customize your rules
    eqeqeq: "off",
    curly: "error",
    quotes: ["error", "double"],
    "@typescript-eslint/no-invalid-this": 0,
    "@typescript-eslint/member-ordering": 0,
    '@typescript-eslint/no-empty-interface': 1,
  },
}; 
