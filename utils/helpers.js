export const intersection = (arrayA, arrayB) =>
  arrayA.filter((value) => arrayB.includes(value));

export const shuffled = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

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
    if (seen.has(k)) {
      return false;
    } else {
      seen.add(k);
      return true;
    }
  });
};

export const generateSeed = () => {
  let seed = '';
  for (let i = 0; i < 10; i++) {
    const val = Math.floor(Math.random() * 32).toString(32);
    seed = `${seed}${val}`;
  }
  console.log(seed);
  return seed;
};

export const decodeSeed = (seed) => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    const val = seed.substring(i, i + 1);
    arr.push(parseInt(val, 32));
  }
};

export const getQuery = (query) => {
  if (!query) {
    return '';
  }
  const queryString = Object.entries(query)
    .map((item) => (item[1] !== undefined ? `${item[0]}=${item[1]}` : ''))
    .join('&');
  if (queryString) {
    return `?${queryString}`;
  }
  return '';
};
