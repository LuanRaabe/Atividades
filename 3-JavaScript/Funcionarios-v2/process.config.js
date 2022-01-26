module.exports = {
    apps: [
      {
        name: 'Backend',
        script: 'app.js',
        cwd: './backend/',
        watch: true,
      },
      {
        name: 'Frontend',
        script: 'server.js',
        cwd: './frontend/',
        watch: true,
      }
    ]
  }