export const intersection = (arrayA, arrayB) =>
  arrayA.filter((value) => arrayB.includes(value));

export const shuffled = (array) => array.sort(() => 0.5 - Math.random());

export const rowMapping = (mapping, headers) => {
  const entries = Object.entries(mapping).map(([key, value]) => [
    key,
    headers.indexOf(value),
  ]);
  return (row) =>
    Object.fromEntries(entries.map(([key, value]) => [key, row[value]]));
};

export const uniqueBy = (array, key) => {
  const seen = new Set();
  return array.filter((item) => {
    const k = item[key];
    return seen.has(k) ? false : seen.add(k);
  });
};
