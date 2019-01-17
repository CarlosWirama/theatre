import moment from 'moment';
const domain = 'https://api.themoviedb.org/3';
const apiKey = '7dd602bc9712db0acd193ffe3930be8d';

async function multiSearch(query) {
  const endpoint = '/search/multi';
  const url = `${domain}${endpoint}?api_key=${apiKey}&query=${query}`;
  const res = await fetch(url);
  return res.json();
}

async function discover(queryString = '') {
  const endpoint = '/discover/movie';
  const url = `${domain}${endpoint}?api_key=${apiKey}${queryString}`;
  const res = await fetch(url);
  return res.json();
}

async function discoverPopular() {
  const queryString = '&sort_by=popularity.desc';
  return await discover(queryString);
}

async function discoverNowShowing() {
  const daysInTheatre = 30;
  const today = moment().format('YYYY-MM-DD');
  const startDate = moment().subtract(daysInTheatre, 'days').format('YYYY-MM-DD');
  const queryString = `&primary_release_date.gte=${startDate}&primary_release_date.lte=${today}`;
  return await discover(queryString);
}

async function discoverBestInYear(year) {
  const queryString = `&primary_release_year=${year}&sort_by=vote_average.desc`;
  return await discover(queryString);
}

export default {
  multiSearch,
  discover,
  discoverPopular,
  discoverNowShowing,
  discoverBestInYear,
}
