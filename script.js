const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

// get data from local storage and populateUI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index)=> {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = +movieSelect.value;
    }
}

// save selected movie index and price in local storage
function setMovieData(movieIndex) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
}

//movie select event
movieSelect.addEventListener('change', event => {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex);
    updateSelectedCount();
})

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // retrieving the indices of selected seats and put them in array and put that array in local storage.
    const seatsIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));


    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// seat click event
container.addEventListener('click', (event)=> {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
    }
    updateSelectedCount();
})

// populate the UI
populateUI();
// Initial count and total seat
updateSelectedCount();
