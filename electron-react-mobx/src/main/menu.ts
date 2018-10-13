import { Menu, MenuItemConstructorOptions, app } from 'electron';

const template: MenuItemConstructorOptions[] = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'quit',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }],
  },
];

export default function createMenus() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

