import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let url=config.backendEndpoint + '/reservations/';
  try{
    let response=await fetch(url).then((data) => data.json());
    return response;
  }catch(error)
  {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
console.log(reservations.name)
const reservationsLength=reservations.length;

if(reservationsLength > 0)
{
  document.getElementById("reservation-table-parent").style.display="block";
  document.getElementById("no-reservation-banner").style.display="none";

  let tableElement=document.getElementById("reservation-table");

  for(let i=0;i<reservations.length;i++)
  {
    let newElement=document.createElement("tr");

    let dateObj = new Date(reservations[i].date);
    let day=dateObj.getDate();
    let month=dateObj.getMonth() + 1;
    let year=dateObj.getFullYear();

    //below line for Date field in reservation table
    let finalDate=day+ "/" + month + "/" + year;
  //   console.log (
  //     dateObj.toLocaleString ('en-US', {
  //             day:    '2-digit',
  //             month:  '2-digit',
  //             year:   'numeric',
  //             hour:   'numeric',
  //             minute: 'numeric',
  //             second: 'numeric',
  //             hour12: true
  //         }
  //     )
  // );
    // console.log(dateObj)
    let twelthHourObj=new Date(reservations[i].time);
    // console.log(tweSamp)
    let timeObj=new Date(reservations[i].time).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", time:""}) ;
    // let time1=timeObj.getTime();
    // let time=tConvert(time1)
    let twelveHour=twelthHourObj.toLocaleString ('en-US', {
      day:    '2-digit',
      month:  '2-digit',
      year:   'numeric',
      hour:   'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
  }).split(" ");
  // console.log(twelveHour)
    let day1=timeObj.split(" ")
    let bookingTime=day1[2].split(",")[0] +" " + day1[1] + " " + day1[3] + ", " + twelveHour[1] + " " + twelveHour[2].toLowerCase()
    // console.log(day1[2].split(","))
    // console.log(firstPartDate)

    newElement.innerHTML=`
    <td scope="col">${reservations[i].id}</td>
    <td scope="col">${reservations[i].name}</td>
    <td scope="col">${reservations[i].adventureName}</td>
    <td scope="col">${reservations[i].person}</td>
    <td scope="col">${finalDate}</td>
    <td scope="col">${reservations[i].price}</td>
    <td scope="col">${bookingTime}</td>
    <td scope="col">
      <div class="reservation-visit-button" id="${reservations[i].id}">
        <a href = "../detail/?adventure=${reservations[i].adventure}">Visit Adventure</a>
      </div>
    </td>
    `
    tableElement.appendChild(newElement);
  }

}
else{
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
}
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
