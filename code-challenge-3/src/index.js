 

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(fetchFilmData, 1000); 
    fetchFilms();
});

function fetchFilmData() {
    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(filmData => {
            const title = document.getElementById('title');
            const filmInfo = document.getElementById('film-info');
            const showtime = document.getElementById('showtime');
            const ticketNum = document.getElementById('ticket-num');
            const runtime = document.getElementById('runtime');
            const poster = document.getElementById('poster');
            const buyTicketButton = document.getElementById('buy-ticket');

            poster.src = filmData.poster; 
            title.innerText = filmData.title; 
            filmInfo.innerText = filmData.description;
            showtime.innerText = filmData.showtime;
            runtime.innerText = filmData.runtime; 
            const availableTickets =filmData.capacity - filmData.tickets_sold;
            ticketNum.innerText = availableTickets;
           
                 
        if (availableTickets === 0) {
            buyTicketButton.innerText = 'Sold Out';
            document.getElementById(`film-${filmData.id}`).classList.add('sold-out');
        }else {
            buyTicketButton.innerText = 'Buy Ticket';

            buyTicketButton.onclick = () => {
                buyTicket(filmData.id);
        };
    }
        });
    }    

        function fetchFilms() {
            fetch('http://localhost:3000/films')
                .then(response => response.json())
                .then(films => {
                    const movieTitles = document.getElementById('films');
                    movieTitles.innerHTML = '';
        
                    films.forEach(film => {
                        const filmItem = document.createElement('li');
                        filmItem.className = 'film item';
                        filmItem.id = `film-${film.id}`;
                        filmItem.innerText = film.title; 

                        const availableTickets = film.capacity - film.tickets_sold;
                if (availableTickets === 0) {
                    filmItem.classList.add('sold-out');
                }

                        const deleteButton = document.createElement('button');
                      deleteButton.textContent = 'Delete';
                      deleteButton.addEventListener('click', () => {
                      deleteFilm(film.id, filmItem);
                      });

                     filmItem.appendChild(deleteButton);
                        movieTitles.appendChild(filmItem);
                    });
                });
        }

    function deleteFilm(filmId, filmItem) {
        fetch(`http://localhost:3000/films/${filmId}`, {
            method :  'DELETE'
        });
          filmItem.remove();
    }
        function buyTicket(filmId){
            fetch(`http://localhost:3000/films/${filmId}`)
        .then(response => response.json())
        .then(filmData => {
            const availableTickets = filmData.capacity - filmData.tickets_sold;
            if (availableTickets > 0) {
                const newTicketsSold = filmData.tickets_sold + 1;

                fetch(`http://localhost:3000/films/${filmId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tickets_sold: newTicketsSold })
                })
                .then(response => response.json())
                .then(updatedMovie => {
                    updateFilmInfo(updatedMovie);
                });
                fetch('http://localhost:3000/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        film_id: filmId,
                        number_of_tickets: 1
                    })
            });
        }
    });
}
function updateFilmInfo(updatedMovie) {
    const ticketNum = document.getElementById('ticket-num');
    const availableTickets = updatedMovie.capacity - updatedMovie.tickets_sold;
    ticketNum.innerText = availableTickets;

    const buyTicketButton = document.getElementById('buy-ticket');
    if (availableTickets === 0) {
        buyTicketButton.innerText = 'Sold Out';
        filmItem.classList.add('sold-out');
       
    } else {
        buyTicketButton.innerText = 'Buy Ticket';
        
    }
}

        

   
    
   