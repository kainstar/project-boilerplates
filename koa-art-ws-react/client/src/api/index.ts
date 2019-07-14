import ajax from '../util/ajax';

const errorHandle = err => {
  console.error(err.message);
};

export const success = async () => {
  try {
    const data = await ajax.get('/api/success');
    console.log(data);
  } catch (err) {
    errorHandle(err);
  }
};

export const failed = () => {
  ajax
    .get('/api/failed')
    .then(data => {
      console.log(data);
    })
    .catch(errorHandle);
};

export const error = () => {
  ajax
    .get('/api/error')
    .then(data => {
      console.log(data);
    })
    .catch(errorHandle);
};
