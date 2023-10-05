const API_KEY =
  'live_iUvQ0F7fP4Z1MIEbDozYycFphycJWw4A3sLQEbC0VQs1h36ZjRbncl5TsRi6b7I5';
const BASE_URL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
