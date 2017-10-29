exports.config = {
  files: {
    javascripts: {
      // joinTo: {
      //   'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      //   'app.js': /^app/
      // },
      entryPoints: {
        'app/app.jsx': {
          'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
          'app.js': /^app/
        }
      },
      order: {
        before: ['./app/development-only.js']
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

    uglify: {
      compress: {
        global_defs: {
          DEBUG: true
        }
      }
    },

    autoReload: {
      port: 9485,
    }
  },

  overrides: {
    production: require('./brunch-config.prod.js')
  },

  notifications: false
}
