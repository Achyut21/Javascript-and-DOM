function MainModule(listingsID = "#listings") {
  const me = {};
  let allListings = [];

  function filterListings(searchTerm) {
    const filteredListings = allListings.filter(Listing => 
      Listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Listing.neighbourhood_cleansed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    me.redraw(filteredListings);
  }

  me.filterListings = filterListings;

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    return `<div class="col-4">
  <div class="listing card">
    <img
      src="${listing.picture_url}"
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      <p class="card-text">
        ${listing.description}
      </p>
      <p>Host: 
      <img src="${listing.host_thumbnail_url}" alt="${listing.host_name}" style="width:30px; border-radius:50%;"/>
        ${listing.host_name}
      </p>
      <p>Amenities: ${JSON.parse(listing.amenities).slice(0, 5).join(", ")}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>  
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();

    allListings = listings.slice(0, 50);
    me.redraw(listings);
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();

document.getElementById("searchInput").addEventListener("input", (e) => {
  main.filterListings(e.target.value);
});