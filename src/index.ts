#!/usr/bin/env node

import 'source-map-support/register';

import { spawn } from 'child_process';

const usage = 'Usage: tynel <remotePort> <localPort>';

const remotePort = parseInt(process.argv[2]);
if (remotePort < 1 || remotePort > 1000 || isNaN(remotePort)) {
  console.log(usage);
  console.log('remotePort must be >= 1 and <= 1000');
  process.exit(-1);
}

const realRemotePort = remotePort + 10100;

const localPort = parseInt(process.argv[3]);
if (isNaN(localPort)) {
  console.log(usage);
  console.log('localPort must be a number');
  process.exit(-1);
}

const childProcess = spawn('ssh', [
  '-R',
  `${realRemotePort}:localhost:${localPort}`,
  '-N',
  'tunneluser@technobabble.hr',
]);

const timeoutId = setTimeout(() => {
  console.log(`http://${realRemotePort}.tunnel.technobabble.hr`);
  console.log(`https://${realRemotePort}.tunnel.technobabble.hr`);
}, 500);

childProcess.stdout.on('data', (data) => {
  console.log('ready');
  console.log(data.toString());
});

childProcess.stderr.on('data', (data) => {
  const log = data.toString();
  console.error(log);
  if (log.includes('failed')) {
    clearTimeout(timeoutId);
    console.log('This subdomain is already taken, try another one');
    childProcess.kill();
  }
});
