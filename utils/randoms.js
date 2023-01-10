// const promises = teams.slice(0, 16).map(({ id }) => getPlayers(id));
// const promises = teams
//   .slice(0, 8)
//   .map(({ id, team }) => getPlayers(id, team));

// "wrapping" each network promise with a 4 second timer promise
// const wrappedPromises = promises.map((promise) => {
//   const waitForSeconds = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("Server didn't respond");
//     }, 2000);
//   });

//   // basically creating a situation where there'll be a race between them
//   const wrapperPromise = promiseRetry(
//     Promise.race([promise, waitForSeconds])
//   );

//   return wrapperPromise;
// });

// console.log(name);
// const wrapperPromise = promiseRetry(
//   Promise.race([getPlayers(id, name), waitForSeconds]),
//   { maxAttempts: 10 }
// );
// const players = await wrapperPromise;
// const players = await getPlayers(id, name);
