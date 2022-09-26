const url = "https://backend-hotel-simple.herokuapp.com/v1";
const updEndp = {
  update: false,
  id: null,
};

function getInput(e) {
  e.preventDefault();
  let hotel = {
    name: e.target.name.value,
    description: e.target.description.value,
    check_in: e.target.check_in.value,
    check_out: e.target.check_out.value,
    num_rooms: e.target.num_rooms.value,
    stars: e.target.stars.value,
    address: e.target.address.value,
    latitude: e.target.latitude.value,
    longitude: e.target.longitude.value,
  };
  if (updEndp.update == true) {
    hotel.id = updEndp.id;
    updateData(hotel, hotel.id);
  } else {
    createData(hotel);
  }
}

async function createData(hotel) {
  const resp = await fetch(url + /hotels/, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hotel),
  });
  window.location.href = "index.html";
}

async function getHotel(url, id) {
  const resp = await fetch(url + /hotels/ + id + "/", {
    method: "GET",
  });
  const hotel = await resp.json();
  return hotel;
}

async function updateData(hotel, id) {
  const resp = await fetch(url + /hotels/ + id + "/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hotel),
  });
  window.location.href = "index.html";
}

async function getParamsUrl() {
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const id = params.get("hotel");
  if (id != null) {
    const hotel = await getHotel(url, id);
    setData(hotel);
    updEndp.update = true;
    updEndp.id = id;
  }
}

function setData(hotel) {
  document.getElementById("input_name").setAttribute("value", hotel.name);
  document.getElementById("input_description").value= hotel.description;
  document.getElementById("input_check_in").setAttribute("value", hotel.check_in);
  document.getElementById("input_check_out").setAttribute("value", hotel.check_out);
  document.getElementById("input_num_rooms").setAttribute("value", hotel.num_rooms);
  document.getElementById("input_stars").setAttribute("value", hotel.stars);
  document.getElementById("input_address").setAttribute("value", hotel.address);
  document.getElementById("input_latitude").setAttribute("value", hotel.latitude);
  document.getElementById("input_longitude").setAttribute("value", hotel.longitude);
}

getParamsUrl();
