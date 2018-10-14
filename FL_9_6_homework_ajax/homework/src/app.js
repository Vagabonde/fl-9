const http = {
  get: function(url) {

    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener('loadstart', displayLoading);
      xhr.open('GET', url, true);
      xhr.send();
      xhr.addEventListener('readystatechange', getResponse);

      function getResponse() {
        if (xhr.readyState !== 4) {

          return;
        }
        if (xhr.status === 200) {

          return resolve(JSON.parse(xhr.responseText));
        } else {

          return reject(new Error(xhr.status + ' ' + xhr.statusText));
        }
      }
    });
  }
};

function displayLoading() {
  formTrack.style.display = 'none';
  earth.style.display = 'block';
  text.innerText = 'Loading...';
}

function track() {
  const [lat, lon] = [parseFloat(inputLat.value), parseFloat(inputLon.value)];
  const url = `https://api.onwater.io/api/v1/results/${lat},${lon}`;

  if (isValidData(lat, -90, 90) && isValidData(lon, -180, 180)) {

    http.get(url)
    .then(function(result) {

          if (result.water === true) {
            earth.style.display = 'none';
            bkg.style.display = 'block';
            bkg.classList.add('water');
            obj.innerHTML = '<img src="../../img/icons8-fish-48.png" alt="fish-img">';
            text.innerText = 'You are on water';

          } else {
            earth.style.display = 'none';
            bkg.style.display = 'block';
            bkg.classList.add('land');
            obj.innerHTML = '<img src="../../img/icons8-bumblebee-48.png" alt="bee-img">';
            text.innerText = 'You are on land';
          }
        })
        .catch((error) => {
          text.innerText = `${error}`;
          console.error(error);
        });

  } else {
    console.warn('Invalid data. Please, try again');
  }
}

function isValidData(num, min, max) {
  return num >= min && num <= max;
}

const btnTrack = document.querySelector(`.track-btn`);
const formTrack = document.querySelector(`.track-form`);
const inputLat = document.querySelector('.track-input-lat');
const inputLon = document.querySelector('.track-input-lon');
const earth = document.querySelector('.earth');
const bkg = document.querySelector('.animation-bkg');
const obj = document.querySelector('.animation-obj');
const text = document.querySelector('.track-text');
btnTrack.addEventListener('click', track);
