export class MoviesController {
    constructor (defaultPrice, initTotalPrice, initTotalSeats) {
        this.selectedMoviePrice = defaultPrice;
        this.selectedSeats = initTotalSeats;
        this.totalPrice = initTotalPrice;
    }

    setSelectedMoviePrice(newSelectedPrice) {
        this.selectedMoviePrice = newSelectedPrice;
    }

    updateTotalPrice() {
        this.totalPrice = this.selectedSeats * this.selectedMoviePrice;
    }

    updateSelectedSeats(number) {
        this.selectedSeats += number;
    }

    getSelectedMoviePrice(selectedMovie) {
        let price = 0;
        MOVIES.forEach(movie => {
            if (selectedMovie === movie.id) {
                price = movie.price;
            }
        });
        return price;
    }
}