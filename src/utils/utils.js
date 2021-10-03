export async function fetchCurInfo(url, poll) {
  const response = await fetch(
    `${process.env.REACT_APP_URL_BACKEND}${url}${poll ? '/poll' : ''}`
  );
  return response;
}

export function getCurPairs(base, rates, pairs) {
  const curPairs = calcCurPair(base, rates);
  return pairs.map((pair) => {
    if (curPairs[pair.value]) {
      return {
        value: Math.round(curPairs[pair.value] * 1000) / 1000,
      };
    } else {
      return { value: 0 };
    }
  });
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
