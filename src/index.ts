#!/usr/bin/env node

import 'source-map-support/register';

import { spawn } from 'child_process';

import { domainToPort } from './domainToPort';

async function main() {
  const usage = 'Usage: tynel <localPort> <subdomain>';

  const localPort = parseInt(process.argv[2]);
  if (isNaN(localPort)) {
    console.log(usage);
    throw new Error('localPort must be a number');
  }

  const subdomain = process.argv[3];
  if (!subdomain) {
    console.log(usage);
    throw new Error('Missing subdomain');
  }

  const remotePort = await domainToPort(subdomain);
  console.log('remotePort', remotePort);
  console.log('localPort', localPort);

  const childProcess = spawn('ssh', ['-R', `${remotePort}:localhost:${localPort}`, '-N', 'tunneluser@technobabble.hr']);

  const timeoutId = setTimeout(() => {
    console.log(`https://${subdomain}.tunnel.technobabble.hr`);
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
}

main().catch((e) => {
  console.error(e.message);
  process.exit(-1);
});
