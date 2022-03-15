export class UI {
    constructor (initSeatsHTML) {
        this.selectedMovie = document.getElementById('movie');
        this.totalSpan = document.getElementById('total');
        this.totalSeats = document.getElementById('count');
        this.container = document.querySelector('.container');
        this.rowsHTML = initSeatsHTML;
    }

    saveRowsInHTML () {
        this.rowsHTML = this.container.innerHTML;
    }

    drawCinemaSeats() {
        this.container.innerHTML = this.rowsHTML;
    }

    drawTotalPrice(total) {
        this.totalSpan.textContent = `${total}€`;
    }

    drawSelectedSeats(total) {
        this.totalSeats.textContent = `${total}`;
    }

    toggleSelected(seat) {
        seat.classList.toggle('selected');
    }

    getSelectedMoviePrice(selectedMovie) {
        let price = 0;
        window.MOVIES.forEach(movie => {
            if (selectedMovie === movie.id) {
                price = movie.price;
            }
        });
        return price;
    }

    setSelectedMovieInList(value) {
        const options = Array.from(this.selectedMovie.options);
        options.forEach(option => {
            if (option.value === value) {
                option.setAttribute('selected', null)
            }
        })
    }
}