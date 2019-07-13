/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `react-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

import electronDebug from 'electron-debug';
import installExtension, { REACT_DEVELOPER_TOOLS, MOBX_DEVTOOLS } from 'electron-devtools-installer';
import { app } from 'electron';

// close electron security warnings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// Install `electron-debug` with `devtron`
electronDebug({ showDevTools: true });

// Install `react-devtools`
app.on('ready', () => {
  installExtension([REACT_DEVELOPER_TOOLS, MOBX_DEVTOOLS])
    // tslint:disable-next-line:no-empty
    .then(() => {})
    .catch((err: Error) => {
      // tslint:disable-next-line:no-console
      console.error('Unable to install `react-devtools`: \n', err);
    });
});

// Require `main` process to boot app
import('./index');
