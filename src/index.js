import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_iUvQ0F7fP4Z1MIEbDozYycFphycJWw4A3sLQEbC0VQs1h36ZjRbncl5TsRi6b7I5';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';

import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement',
});

// Globale constanten
const selectPlaceholder = `<option class="js-selectOption js-placeholder-select" value="choose">Select the cat</option>`;

// Query selectors
const breedSelect = document.querySelector('.breed-select');
const infoLoader = document.querySelector('.loader');
const selectError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.insertAdjacentHTML('afterbegin', selectPlaceholder);

infoLoader.hidden = false;
breedSelect.hidden = true;

function markupSelect(arr) {
  return arr
    .map(({ name, id }) => {
      return `<option class="js-selectOption" value="${id}">${name}</option>`;
    })
    .join('');
}

fetchBreeds()
  .then(data => {
    breedSelect.insertAdjacentHTML('beforeend', markupSelect(data));
    infoLoader.hidden = true;
    breedSelect.hidden = false;
  })
  .catch(err => console.log(err));

// Event listener for select
breedSelect.addEventListener('change', onChangeSelect);

function onChangeSelect() {
  const selectedValue = breedSelect.value;
  if (selectedValue === 'choose') {
    selectError.hidden = true;
    catInfo.innerHTML = ''; // remove last cat
    return;
  }

  catInfo.classList.add('cat-card');
  selectError.hidden = true;
  infoLoader.hidden = false;
  breedSelect.hidden = true;

  fetchCatByBreed(breedSelect.value)
    .then(data => {
      // console.log(data[0]);
      const img = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      catInfo.innerHTML = createCatCard(img, name, description, temperament);
    })
    .catch(err => {
      Report.failure(
        'Oops! Something went wrong!',
        'Please try again later',
        'Okay'
      );
      console.log(err);
    })
    .finally(() => {
      infoLoader.hidden = true;
      breedSelect.hidden = false;
      catInfo.classList.remove('cat-card');
    });
}

function createCatCard(img, name, description, temperament) {
  return `<img class="js-img" src="${img}" alt="${name}" width="300">
    <div class="js-card">
      <h2 class="js-name">${name}</h2>
      <p class="js-descrription">${description}</p>
      <h3 class="js-name">Temperament:</h3>
      <p class="js-temperament">${temperament}</p>
    </div>`;
}
