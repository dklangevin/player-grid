export default function timeFunction(func) {
  console.log('timing function');
  const startTime = performance.now();
  const ret = func();
  const endTime = performance.now();
  console.log(`Time taken to execute: ${endTime - startTime} milliseconds`);
  return ret;
}
