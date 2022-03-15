export class LocalStorageController {
    storeInfo(selectedMovie, seatsHTML, totalSeats, totalPrice) {
        const data = {
            defaultMovie: selectedMovie,
            seatsHTML: seatsHTML,
            totalSeats: totalSeats,
            totalPrice: totalPrice
        }
        localStorage.setItem("movie-booking", JSON.stringify(data));
        console.log('info stored!')
    }

    getInfo() {
        const data = localStorage.getItem("movie-booking") !== null ? JSON.parse(localStorage.getItem("movie-booking")) : null;
        return data;
    }
}