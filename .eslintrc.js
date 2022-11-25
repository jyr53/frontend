module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "plugin:vue/essential",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    // 'no-console': 'off',
    'prefer-const': 'off',
  },
}
