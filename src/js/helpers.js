import { TIMEOUT_SEC } from './Config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const res = await fetch(`${url}`);
    if (res.status == '400') timeout(TIMEOUT_SEC);
    const data = await res.json();

    if (!res.ok) throw Error(`${data.message} : ${res.status} `);

    return data;
  } catch (err) {
    throw err;
  }
};
