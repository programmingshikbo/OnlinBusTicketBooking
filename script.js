document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const historyContainer = document.getElementById("history");

    function fetchHistory() {
        fetch('http://localhost:3000/get-bookings')
            .then(response => response.json())
            .then(data => {
                historyContainer.innerHTML = '';
                data.forEach(booking => {
                    const bookingDiv = document.createElement("div");
                    bookingDiv.innerHTML = `
                        <p><strong>Name:</strong> ${booking.username}</p>
                        <p><strong>Route:</strong> ${booking.route}</p>
                        <p><strong>Date:</strong> ${booking.date}</p>
                        <p><strong>Time:</strong> ${booking.time}</p>
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>Seats:</strong> ${booking.seats}</p>
                        <button onclick="deleteBooking(${booking.id})">Delete</button>
                    `;
                    historyContainer.appendChild(bookingDiv);
                });
            });
    }

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:3000/add-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(message => {
            alert(message.message);
            bookingForm.reset();
            fetchHistory();
        });
    });

    window.deleteBooking = function(id) {
        fetch(`http://localhost:3000/delete-booking/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(message => {
            alert(message.message);
            fetchHistory();
        });
    };

    fetchHistory();
});



