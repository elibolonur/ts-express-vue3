module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    production: {
      plugins: [["inline-dotenv",{
        path: './server/pre-start/env/development.env'
      }]]
    },
    development: {
      plugins: [["inline-dotenv",{
        path: './server/pre-start/env/development.env'
      }]]
    },
    test: {
      plugins: [["inline-dotenv",{
        path: './server/pre-start/env/test.env'
      }]]
    }
  }
}
