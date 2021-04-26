window.addEventListener('DOMContentLoaded', async function() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write the recipe (algorithm), then write the code
  console.log(json.length)

  // create variable for riders data 
  function fullName(json){
    return `${json.passengerDetails.first} ${json.passengerDetails.last}`
  }
  function phone(json){
    return `${json.passengerDetails.phoneNumber}`
  }
  function dropOff(json){
    return `${json.dropoffLocation.address}, ${json.dropoffLocation.city}, ${json.dropoffLocation.state}, ${json.dropoffLocation.zip}`
  }
  function pickUp(json){
    return `${json.pickupLocation.address}, ${json.pickupLocation.city}, ${json.pickupLocation.state}, ${json.pickupLocation.zip}`
  }
  function passenger(json){
    return `${json.numberOfPassengers} passenger(s)`
  }
  // create algorithm to determine the level of service
  function serviceLevel(json){
    if (json.purpleRequested == true) {
    return `Noober Purple`
    } else if (json.numberOfPassengers > 3) {
    return `Noober XL`
    } else {
    return `Noober X`
    }
  }
  
  console.log(fullName(json[0]))
  console.log(phone(json[0]))
  console.log(dropOff(json[0]))
  console.log(pickUp(json[0]))
  console.log(passenger(json[0]))

  // create loop through the riders data
  for (let i = 0; i < json.length; i++) {

    // find and change the details of the ride depending on ride number
    // change the level of service
    let serviceElement=document.querySelector('.rides')
    serviceElement.insertAdjacentHTML('beforeend', `
    <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>${serviceLevel(json[i])}</span>
    </h1>
    `)

    // change other details of the ride
    let rideElement=document.querySelector('.rides')
    rideElement.insertAdjacentHTML('beforeend', `
    <div class="border-4 border-gray-900 p-4 my-4 text-left">
    <div class="flex">
      <div class="w-1/2">
        <h2 class="text-2xl py-1">${fullName(json[i])}</h2>
        <p class="font-bold text-gray-600">${phone(json[i])}</p>
      </div>
      <div class="w-1/2 text-right">
        <span class="rounded-xl bg-gray-600 text-white p-2">
          ${passenger(json[i])}
        </span>
      </div>
    </div>
    <div class="mt-4 flex">
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">PICKUP</div>
        <p>${pickUp(json[i])}</p>
      </div>
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">DROPOFF</div>
        <p>${dropOff(json[i])}</p>
      </div>
    </div>
  </div> 
    `)
  }
})