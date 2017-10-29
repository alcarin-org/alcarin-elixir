module.exports = {
  plugins: {
    uglify: {
      compress: {
        global_defs: {
          DEBUG: false,
        }
      }
    }
  },
}
