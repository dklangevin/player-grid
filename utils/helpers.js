export const intersection = (arrayA, arrayB) =>
  arrayA.filter((value) => arrayB.includes(value));

export const shuffled = (array) => array.sort(() => 0.5 - Math.random());

export const rowMapping = (mapping, headers) => {
  const entries = Object.entries(mapping).map(([key, value]) => [
    key,
    headers.indexOf(value),
  ]);
  console.log(entries);
  return (row) =>
    Object.fromEntries(entries.map(([key, value]) => [key, row[value]]));
};
