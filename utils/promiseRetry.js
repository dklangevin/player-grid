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
