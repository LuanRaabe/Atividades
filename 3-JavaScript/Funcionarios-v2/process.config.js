var cmd=require('node-cmd'); cmd.run('npm start');
module.exports = {
    apps: [
      {
        name: 'Backend',
        script: 'npm',
        args: 'start',
        cwd: './backend/',
        watch: true,
      },
      {
        name: 'Frontend',
        script: 'npm',
        args: 'start',
        cwd: './frontend/',
        watch: true,
      }
    ]
  }