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


let map,mapEvent;
//Geolocation API

class App{

    #map;
    #mapEvent;

    constructor(){
        this._getPosition();
    }

    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),()=>{
                alert('Could not retrieve location');
            })
        }
    }

    _loadMap(position)
        {
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
            const coords = [latitude,longitude]
            this.#map = L.map('map').setView(coords, 15);
    
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
    
            map.on("click",(mapE)=>{
                this.#mapEvent = mapE;
                form.classList.remove("hidden");
                inputDistance.focus();   
            });
        }

    _showForm(){}

    _toggleElevation(){}

    _newWorkout(){}
}


const app = new App();


//Submitting the form

form.addEventListener("submit",(e)=>{
    e.preventDefault;
    //Clearing the form
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
    //Dispplay the marker
    const {lat,lng} = mapEvent.latlng;
            L.marker([lat,lng]).addTo(map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose:false,
                    closeOnClick:false,
                    className:'running-popup'
                }))
                .setPopupContent('Workout')
            .openPopup();
})

inputType.addEventListener("change",()=>{
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})
