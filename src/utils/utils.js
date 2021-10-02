export async function fetchCurPair(url, pairs) {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/${url}`);
    const body = await response.json();
    const curPairs = calcCurPair(body.base, body.rates);
    return pairs.map((pair) =>
      curPairs[pair] ? Math.round(curPairs[pair] * 1000) / 1000 : 0
    );
  } catch (err) {
    console.log(err);
  }
}

function calcCurPair(base, rates) {
  const curPair = {};
  const keys = Object.keys(rates);
  keys.forEach((key) => {
    curPair[`${key}/${base}`] = 1 / rates[key];
  });

  curPair['RUB/USD'] = curPair[`RUB/${base}`] / curPair[`USD/${base}`];
  curPair['RUB/EUR'] = curPair[`RUB/${base}`] / curPair[`EUR/${base}`];
  curPair['EUR/USD'] = curPair[`EUR/${base}`] / curPair[`USD/${base}`];
  return curPair;
}
