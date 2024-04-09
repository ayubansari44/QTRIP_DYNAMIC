import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url=config.backendEndpoint+"/cities"
  let response=await fetch(url)
                .then((data) => data.json())
                .catch(function(err)
                { 
                    return null
                });

  // let data=await fetch(url);
  // let response=await data.json();
  // let response=await data.json();
  // let result=JSON.stringify(response);
  // console.log(response)
  // let cities=[]
  // for(let i=0;i<response.length;i++)
  // {
  //   cities[i]=response[i].city;
  // }
  return response;
 
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let newELement=document.createElement("div");
  newELement.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4', 'd-flex', 'align-content-stretch', 'text-lg');
  newELement.innerHTML=`
                      
                      <a href="pages/adventures/?city=${id}" id=${id}>
                       <div class="tile">
                        <img src=${image} alt="">
                        <div class="tile-text text-white">
                          <h5>${city}</h5>
                          <p>${description}</p>
                        </div> 
                       </div>   
                     </a>
                    
          

  `
  let reqElement=document.querySelector(".content > #data");
  reqElement.append(newELement);

}

export { init, fetchCities, addCityToDOM };
