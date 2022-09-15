//add an event listener
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
    // getTheBookings(bookObj);
    madeABooking(bookObj);
    makeAndBook(bookObj);
    deleteBooking(bookObj);




}



// different fetchings to the server
function getTheBookings(){
    fetch("http://localhost:3000/bookings")
    .then(res => res.json())
    // .then(data =>console.log(data));
    .then(bookings => bookings.forEach(booking => madeABooking(booking)));
}
getTheBookings();
function makeABooking(bookObj){
  fetch("http://localhost:3000/bookings",{
    method: "POST",
    headers:{
        'content-Type':'application/json'
    },
     body:JSON.stringify(bookObj)
  })
  .then(res => res.json())
//   .then(bookings => bookings.forEach(booking => makeABooking(booking)));
}
 function updateDeleteBooking(id){
    fetch(`http://localhost:3000/bookings/${id}`,{
        method: "DELETE",
        headers:{
            'content-Type':'application/json'
        },
    })
    .then(res => res.json())
    .then(b);

 }

 function makeAndBook(bookObj){
     console.log(JSON.stringify(bookObj));
    fetch("http://localhost:3000/bookings",{
        method: "POST",
        headers:{
            'content-Type':'application/json'
        },
         body:JSON.stringify(bookObj)
      })
      .then(res => res.json())
    }
 


//DOM manipulation

function madeABooking(booking){
    let booked = document.createElement('div');
    
    booked.innerHTML = `
    <form  id="booked" >
    <p>NAME: ${booking.name}</p>
    <p>Arrival date: ${booking.arrivalDate}</p>
    <p>Departure date: ${booking.departureDate}</p>
    <p>NO OF ROOMS: ${booking.noOfRooms}</p>
    <button id="btn" >cancel</button>
    

</form>
    
    `
    document.getElementById('form-book').appendChild(booked);
    booked.querySelector('#btn').addEventListener('click',() => {
        booked.remove();
        updateDeleteBooking(booking.id);
      
    })



}



