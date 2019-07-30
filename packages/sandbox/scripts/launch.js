const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelRc');
const { gulp } = require('./build');

const log = logger('[sandbox]');

function launch() {
  log('launch(): argv: %j', argv);

  require('@babel/register')({
    ...babelRc,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  });

  const buildDevTask = gulp.task('build-dev');
  buildDevTask(() => {
    require('../src/server/local.ts');
  });
}

if (require.main === module) {
  launch();
}
