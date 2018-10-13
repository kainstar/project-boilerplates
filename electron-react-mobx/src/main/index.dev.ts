/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `react-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

import debug from 'electron-debug';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { app } from 'electron';

/* eslint-disable */

// Install `electron-debug` with `devtron`
debug({ showDevTools: true });

// Install `react-devtools`
app.on('ready', () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    // tslint:disable-next-line:no-empty
    .then(() => {})
    .catch((err: Error) => {
      // tslint:disable-next-line:no-console
      console.log('Unable to install `react-devtools`: \n', err);
    });
});

// Require `main` process to boot app
// tslint:disable-next-line:no-var-requires
import('./index');
