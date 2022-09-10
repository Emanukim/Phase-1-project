document.getElementById("form-book").addEventListener("submit",submitButton);


function submitButton(e){
    e.preventDefault();

    let bookObj = {
        name:e.target.name.value,
        arrivalDate:e.target.arrivalDate.value,
        departureDate:e.target.departureDate.value,
        noOfAdults:e.target.noOfAdults.value,
        noOfChildren:e.target.noOfChildren.value,
        noOfRooms:e.target.noOfRooms.value,
        formOfPayment:e.target.formOfPayment.value,
    }

    madeABooking(bookObj);
    makeABooking(bookObj);
}

//fetch
function getTheBookings(){
    fetch("http://localhost:3000")
    .then(res => res.json())
    .then(bookings => bookings.forEach(booking => madeABooking(booking)));
}

function makeABooking(bookObj){
    // console.log(bookObj);
  fetch("http://localhost:3000",{
    method: "POST",
    headers:{
        'content-Type':'application/json'
    },
     body:JSON.stringify(bookObj)
  })
  .then(res => res.json())
  .then(bookings => bookings.forEach(booking => makeABooking(booking)));
}

// makeABooking();

//DOM manipulation

function madeABooking(booking){
    let booked = document.createElement('div');
    
    booked.innerHTML = `
    <form  id="booked" >
    <p>NAME: ${booking.name}</p>
    <p>Arrival date: ${booking.arrival}</p>
    <p>Departure date: ${booking.departureDates}</p>
    <p>NO OF ROOMS: ${booking.NoOfRooms}</p>
    <button typy="submit" id='delete'>delete</button>
    

</form>
    
    `
    document.getElementById('form-book').appendChild(booked);

}
