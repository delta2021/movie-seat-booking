const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;


populateUI();
//get data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
        count.innerText = selectedSeats.length;
        const moviePrice = localStorage.getItem('selectedMoviePrice');
        if (moviePrice !== null){
            movieSelect.selectedIndex = localStorage.getItem('selectedMovieIndex');
            total.innerText = +moviePrice * (selectedSeats.length);
            
        } else {
            total.innerText = movieSelect.value * selectedSeats.length;
    }
   
    }
    
}


//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = ticketPrice * selectedSeatsCount;
}
//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    const movieIndex = e.target.selectedIndex;
    updateSelectedCount();
    setMovieData(movieIndex, ticketPrice);
})
//seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

