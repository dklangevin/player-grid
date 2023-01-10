// var t = 500;
// var max = 5;

// var p = Promise.reject();
// for (let i = 0; i < max; i++) {
//   p = p.catch(attempt).then(test).catch(rejectDelay);
// }
// p = p.then(processResult).catch(errorHandler);

// function attempt() {
//   var rand = Math.random();
//   if (rand < 0.8) {
//     throw rand;
//   } else {
//     return rand;
//   }
// }

// function test(val) {
//   if (val < 0.9) {
//     throw val;
//   } else {
//     return val;
//   }
// }
// function processResult(res) {
//   console.log(res);
// }
// function errorHandler(err) {
//   console.error(err);
// }

function rejectDelay1(delay) {
  return (reason) => {
    return new Promise(function (resolve, reject) {
      setTimeout(reject.bind(null, reason), delay);
    });
  };
}

const rejectDelay = (delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });

export default async function asyncRetry(
  func,
  { delay = 500, maxAttempts = 3 } = {}
) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      console.log('Trying to execute...');
      const res = await func();
      return res;
    } catch (error) {
      console.log('Retrying...');
      await rejectDelay(delay);
    }
  }
  throw new Error('Max attempts used -- cannot execute');
}
