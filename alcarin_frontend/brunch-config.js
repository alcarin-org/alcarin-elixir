// See http://brunch.io for documentation.
exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
        'app.js': /^app/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  server: {
    hostname: '0.0.0.0',
    port: 3333,
  },

  paths: {
    watched: ["app"],
    // Where to compile files to
    public: "./build"
  },

  plugins: {
    babel: {
      presets: ['env'],
      ignore: [/vendor/],
      plugins: [["transform-jsx", { "module": "framework/jsx", "useVariables": true }]],
      pattern: /\.(js|jsx)$/
    },

    autoReload: {
      port: 9485,
    }
  },

  notifications: false
}
