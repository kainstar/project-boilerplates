export const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * 服务器地址
 */
export const SERVER_URL = IS_DEV
  ? 'http://localhost:8080' // webpack-dev-server
  : 'http://localhost:3000'; // express-server

export const UNKNOW_SERVER_ERROR = '未知的服务器错误';