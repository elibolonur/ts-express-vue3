module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    production: {
      plugins: [
        [
          "inline-dotenv",
          {
            path: "./server/pre-start/env/production.env"
          }
        ]
      ]
    },
    development: {
      plugins: [
        [
          "inline-dotenv",
          {
            path: "./server/pre-start/env/development.env"
          }
        ]
      ]
    },
    test: {
      plugins: [
        [
          "inline-dotenv",
          {
            path: "./server/pre-start/env/test.env"
          }
        ]
      ]
    }
  },
  plugins: [
    ['babel-plugin-istanbul', {
      extends: '@istanbuljs/nyc-config-typescript',
      extension: ['.ts', '.tsx', '.js', '.vue']
    }]
  ]
}
