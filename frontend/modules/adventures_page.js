
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get("city");
  console.log("City is :::" + city)
  return city;

  // let n=search.length;
  // let cityId=search.substring(6,n)
  // return cityId;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(city)
  let url=config.backendEndpoint+"/adventures/?city="+city;
  let jsonData=await fetch(url).then((data) => data.json())
                                .catch((err) => 
                                { 
                                  return null;
                                });
  // console.log(jsonData);
  return jsonData;

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
let element=document.getElementById("data");
{/* <a href="pages/adventures/?city=${id}" id=${id}> */}
for(let i=0;i<adventures.length;i++)
{
  let newElement=document.createElement("div");
  newElement.innerHTML=`<div class="category-banner">
                          <h5>${adventures[i].category}</h5>
                        </div>
                        <a href="detail/?adventure=${adventures[i].id}" id="${adventures[i].id}">
                          <div class="card activity-card">
                            <img src="${adventures[i].image}" class="card-img-top" alt="..." />
                            <!-- for the below two divs we can use this -->
                            <div class="d-block d-md-flex flex-wrap justify-content-around w-100">
                              <h5 class="card-title">${adventures[i].name}</h5>
                              <p class="card-text">${"Rs."+adventures[i].costPerHead}</p>
                            </div>
                            <div class="d-md-flex justify-content-around w-100">
                              <h5 class="card-title">Duration</h5>
                              <p class="card-text">${adventures[i].duration} Hours</p>
                            </div>
                          </div>
                        </a>
                       
                        `;
  newElement.classList.add('col-6','col-lg-3', 'mb-5','position-relative')
  element.appendChild(newElement)
}
  console.log(adventures)

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredList = list.filter(
    (key) => key.duration > low && key.duration <= high
  );
  
  console.log(filteredList)
  return filteredList;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(adventure => categoryList.includes(adventure.category))

  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  else {
    filteredList = list;
  }
  console.log(filteredList)
  return filteredList;


return list;

// filterByCategory(list, filters.category);
// let result = list.filter(function (e) {
//   return e.category == filters.category;
// });
// console.log(result);


// console.log(filters.category);

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage


localStorage.setItem('filters', JSON.stringify(filters));

  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const data=JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  console.log(data);
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let element=document.getElementById("category-list");
  const categoryFilter = filters["category"];
  categoryFilter.forEach(key => {
    let newElement = document.createElement("div");
    newElement.className="category-filter"
    newElement.innerText= key;
    element.appendChild(newElement);
  })
  // for(let i=0;i<filters.category.length;i++)
  // {
    

  // }
  console.log(filters.category.length);
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
