import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventureId=params.get("adventure")
  // console.log(adventureId);
  return adventureId;

  // const n=search.length;
  // const adventureId=search.substring(11,n)
  // return adventureId;
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
  try {
    const response = await fetch(url).then((data) => data.json())
    console.log(response)
    return response;
  } catch (error) {
    return null;
  }
  // let data=await fetch(url).then((data) => data.json())
  //                           .catch((err) => 
  //                           {
  //                             return null;
  //                           });
  // console.log(response)
  // return response;

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName=document.getElementById("adventure-name");
  let subtitle=document.getElementById("adventure-subtitle");
  let content=document.getElementById("adventure-content");
  let images=document.getElementById("photo-gallery");

  for(let i=0;i<adventure.images.length;i++)
  {
    let imageUrl=adventure.images[i];
    let newImage=document.createElement("div");
    newImage.innerHTML = `<img src="${imageUrl}" alt="">`;
    newImage.className="activity-card-image"
    newImage.style.overflow="hidden"
    images.append(newImage);
    // console.log(imageUrl);
  }
  adventureName.innerHTML=adventure.name;
  subtitle.innerHTML=adventure.subtitle;
  content.innerHTML=adventure.content;
  // console.log(adventure.images)
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images.length)
  let photoGallery = document.getElementById("photo-gallery");
  let Carousel = document.createElement("div");
  Carousel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  photoGallery.innerHTML = ``;
  photoGallery.append(Carousel);

  let carouselInnerDiv = document.getElementsByClassName("carousel-inner")[0];
  console.log(carouselInnerDiv);
  for (let i = 0; i < images.length; i++)
  {
    let newImage = document.createElement("div");
    newImage.innerHTML = `<img class="d-block w-100" src=${images[i]} alt="Second slide"> `;
    newImage.classList.add("carousel-item");
    if (i === 0)
    {
      newImage.classList.add("active");
      }
    carouselInnerDiv.appendChild(newImage);
  }
  console.log(carouselInnerDiv);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available===true)
  {
    let soldOut=document.getElementById("reservation-panel-sold-out").style.display="none";
    let reservationPanel=document.getElementById("reservation-panel-available").style.display="block";
    // soldOut.style.display="none"; 

    let costPerHead=document.getElementById("reservation-person-cost");
    // let reserationCost=document.getElementById("reservation-cost");
    // reserationCost.innerHTML=adventure.costPerHead;
    costPerHead.innerHTML=adventure.costPerHead;
  }

  else
  {
    let soldOut=document.getElementById("reservation-panel-sold-out").style.display="block";
    let reservationPanel=document.getElementById("reservation-panel-available").style.display="none";
    // reservationPanel.style.display="none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationTotalCost=document.getElementById("reservation-cost");
  let personCount=parseInt(persons);
  let adventureCost=parseInt(adventure.costPerHead);
  let totalCost=personCount * adventureCost;

  reservationTotalCost.innerHTML=totalCost;
  console.log(adventure)
  console.log(persons)
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form=document.getElementById("myForm");

  // let person=form.elements["name"];

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let url=config.backendEndpoint + "/reservations/new";
    let formElement=form.elements;
    let payload={
      name:formElement["name"].value.trim(),
      date:formElement["date"].value,
      person:formElement["person"].value,
      adventure:adventure.id,
    }

    try{
      const res= await fetch(url, {
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
          "Content-type":"application/json"
        }
      });
      let personsCount=formElement["person"].value;
      console.log(personsCount)
      calculateReservationCostAndUpdateDOM(adventure, personsCount);
      if(res.ok){
        alert("Success!");
      }
      else{
        alert("Failed!")
      }
    }catch(error){
      alert("Failed!")
    }
    // console.log("form submitted",form.elements)
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure)
  let reservedBanner=document.getElementById("reserved-banner");
  
  if(adventure.reserved===true)
  {
    document.getElementById("reserved-banner").style.display="block";
  }
  else
  {
    
    document.getElementById("reserved-banner").style.display="none";
    
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
