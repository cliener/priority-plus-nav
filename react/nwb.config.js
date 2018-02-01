module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactPriorityPlusNav',
      externals: {
        react: 'React'
      }
    }
  }
}
