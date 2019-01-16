const domain = 'https://api.themoviedb.org/3';
const apiKey = '7dd602bc9712db0acd193ffe3930be8d';

async function multiSearch(query) {
  const url = `${domain}/search/multi?api_key=${apiKey}&query=${query}`;
  const res = await fetch(url);
  return res.json();
}

export default {
  multiSearch,
}
