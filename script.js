'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
  }
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),

      function () {
        alert('could not getyour position');
      }
    );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude);
    this.#map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', function (mapE) {
      form.classList.remove('hidden');
      inputDistance.focus();
      this.#mapEvent = mapE;
    });
  }
  _showForm() {}
  _toggleElevationField() {}
  _newWorkout() {}
}

const app = new App();

form.addEventListener('submit', function (e) {
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      ' ';

  e.preventDefault();
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('workout')
    .openPopup();
});

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

// });

inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
