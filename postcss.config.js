const tailwindcss = require('tailwindcss')
// const postcssPurgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require('autoprefixer')
// const postcssImport = require("postcss-import");

// const purgecss = postcssPurgecss({
//   enabled: false,
//   content: ["./src/**/*.vue", "./public/**/*.html"],
//   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
//   whitelistPatterns: [/tab/, /nav/]
// });

module.exports = {
  plugins: [
    // postcssImport,

    tailwindcss('./tailwind.config.js'),
    autoprefixer
    // purgecss
  ]
}
