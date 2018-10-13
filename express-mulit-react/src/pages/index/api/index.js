import ajax from '../util/ajax';
import { Notify } from 'zent';

// 提示消息显示 3s
Notify.config({
  duration: 3000
});

const errorHandle = err => {
  Notify.error(err.message);
};

export const success = () => {
  ajax.get('/api/success')
    .then(data => {
      console.log(data);
    })
    .catch(errorHandle);
};

export const failed = () => {
  ajax.get('/api/failed')
    .then(data => {
      console.log(data);
    })
    .catch(errorHandle);
};

export const error = () => {
  ajax.get('/api/error')
    .then(data => {
      console.log(data);
    })
    .catch(errorHandle);
};
