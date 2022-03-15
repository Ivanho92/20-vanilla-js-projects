// Import Modules
import { data } from './data/movies.js';
import { UI } from './controllers/UI.js';
import { MoviesController } from './controllers/MoviesController.js';
import { LocalStorageController } from './controllers/LocalStorageController.js';

// Get movies from JSON
window.MOVIES = JSON.parse(data);

// Init Local Storage & data
const storageCtrl = new LocalStorageController;
const initData = storageCtrl.getInfo();

// Init Variables
let initTotalPrice = 0;
let initTotalSeats = 0;
let defaultMovie = document.getElementById('movie').value;
let initSeatsHTML = document.querySelector('.container').innerHTML;
if (initData) {
    initTotalPrice = initData.totalPrice;
    initTotalSeats = initData.totalSeats;
    defaultMovie = initData.defaultMovie;
    initSeatsHTML = initData.seatsHTML;
}

// Init UI & get price from selected Movie
const ui = new UI(initSeatsHTML);
defaultMovie = initData ? initData.defaultMovie : ui.selectedMovie.value;
let selectedMoviePrice = ui.getSelectedMoviePrice(defaultMovie);

// Init Movies Controller
const moviesCtrl = new MoviesController(selectedMoviePrice, initTotalPrice, initTotalSeats);
ui.setSelectedMovieInList(defaultMovie);
ui.drawCinemaSeats();
ui.drawTotalPrice(moviesCtrl.totalPrice);
ui.drawSelectedSeats(moviesCtrl.selectedSeats);

// Load Event Listeners
ui.container.addEventListener('click', e => {
    if (e.target.className.includes('seat') && !e.target.className.includes('occupied')) {
        if (e.target.classList.contains('selected')) {
            moviesCtrl.updateSelectedSeats(-1);
            moviesCtrl.updateTotalPrice();
        } else {
            moviesCtrl.updateSelectedSeats(+1);
            moviesCtrl.updateTotalPrice();
        }
        
        ui.toggleSelected(e.target);
        ui.drawTotalPrice(moviesCtrl.totalPrice);
        ui.drawSelectedSeats(moviesCtrl.selectedSeats);  
        ui.saveRowsInHTML();

        storageCtrl.storeInfo(ui.selectedMovie.value, ui.rowsHTML, moviesCtrl.selectedSeats, moviesCtrl.totalPrice);
    }
})

ui.selectedMovie.addEventListener('change', () => {
    selectedMoviePrice = moviesCtrl.getSelectedMoviePrice(ui.selectedMovie.value);
    moviesCtrl.setSelectedMoviePrice(selectedMoviePrice);
    moviesCtrl.updateTotalPrice();

    ui.drawTotalPrice(moviesCtrl.totalPrice);
    ui.drawSelectedSeats(moviesCtrl.selectedSeats);

    storageCtrl.storeInfo(ui.selectedMovie.value, ui.rowsHTML, moviesCtrl.selectedSeats, moviesCtrl.totalPrice);
});
