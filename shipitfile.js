let program = require('commander');
let chalk = require('chalk');

/**
 * Read params from the terminal (optional)
 * If branch is not stated, the default branch set in shipit.config.json
 * will be used.
 *
 * If keepReleases is not stated, default value set in shipit.config.json
 * will be used.
 *
 */

program
  .option('-b, --branch <bnc>', 'Branch to deploy')
  .option('-k, --keepReleases <kr>', 'Number of releases to keep')
  .option('-t, --tag <tgs>', 'GIT Tag Version')
  .parse(process.argv);

module.exports = shipit => {
  require('shipit-deploy')(shipit);

  const config = require('./shipit.config.json');

  // Build environment config
  let envConfig = {};
  const envKeys = Object.keys(config.env);
  envKeys.forEach(k => {
    const envTypes = Object.keys(config.env[k]);
    envTypes.forEach(kk => {
      if (kk === 'common') return;
      envConfig[`${k}-${kk}`] = {
        ...config.env[k].common,
        deployTo: config.env[k][kk].path,
        branch: program.branch || config.env[k].common.branch,
      };
    });
  });

  shipit.initConfig({
    default: {
      repositoryUrl: config.repoURL,
      keepReleases: program.keepReleases || shipit.config.keepReleases,
      dirToCopy: 'dist',
      ignores: ['.git', '.idea', 'node_modules'],
      shallowClone: true,
    },
    ...envConfig,
  });

  // ====== Tasks ======

  /**
   * Copies environment config from /config/env to /src
   * based on the environment deployed. This envConfig is
   * defined in shipit.config.json
   *
   * e.g. If deploying to staging, this task will copy
   * /config/env/staging.js to /src/config.js
   *
   * This task will run after the repo has been cloned and before
   * we run yarn.
   */

  shipit.blTask('copy-config', async () => {
    console.log(
      chalk.green(
        `=== Copying env config file for ${shipit.config.envConfig} ===`
      )
    );
    const ind = process.argv.findIndex(i => i === 'deploy');
    const envType = process.argv[ind - 1];
    const parts = envType.split('-');
    await shipit.local(
      `cd ${shipit.workspace} && cp ./config/${parts[1]}/${
        parts[0]
      }/config.js ./config.js`
    );
  });

  /**
   * This task will run yarn, yarn test and yarn build
   */

  shipit.blTask('yarn-build', async () => {
    const ind = process.argv.findIndex(i => i === 'deploy');
    const envType = process.argv[ind - 1];
    const parts = envType.split('-');
    console.log(chalk.green(`=== Running yarn and yarn build ===`));
    await shipit.local(`cd ${shipit.workspace} && yarn && yarn build`);
  });

  shipit.blTask('change-permission', async () => {
    console.log(chalk.green('=== Updating release folder permission ==='));
    await shipit.remote(`chmod 755 ${shipit.releasePath}`);
  });

  shipit.blTask('purge', async () => {
    const ind = process.argv.findIndex(i => i === 'deploy');
    const envType = process.argv[ind - 1];
    const parts = envType.split('-');
    await shipit.remote(
      `curl -X DELETE "${config.env[parts[0]].common.purgeINFO.url}" -H "X-Auth-Email: ${config.env[parts[0]].common.purgeINFO.email}" -H "X-Auth-Key: ${config.env[parts[0]].common.purgeINFO.authKey}" -H "Content-Type: application/json" --data '{"purge_everything":true}' &> /dev/null`
    );
  });

  // ====== Events ======

  /**
   * Listen to events emitted by shipit-deploy and run
   * custom tasks.
   *
   * Find out more about when specific events are triggered
   * here:
   * https://github.com/shipitjs/shipit/tree/master/packages/shipit-deploy
   *
   */

  shipit.on('fetched', function() {
    shipit.start(['copy-config', 'yarn-build']);
  });

  shipit.on('updated', function() {
    shipit.start(['purge']);
  });
};
