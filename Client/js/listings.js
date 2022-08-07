const getAllListings = async () => {
  const { data, status } = await axios.get(
    "http://localhost:3000/api/v1/estate"
  );
  if (status === 200) {
    return data;
  }
};

let listing = document.querySelector(".properties-container");

let data = await getAllListings();
data.forEach((d) => {
  listing.innerHTML += ` <div class="box" onclick="location.href='itempage.html';">
    <img src="http://localhost:3000/files/${d.image_url}" alt="" />
    <h3>Rs ${d.price}</h3>
    <div class="content">
      <div class="text">
        <h3>${d.name}</h3>
        <p>${d.address}</p>
      </div>
      <div class="icon">
        <i class="bx bx-bed"><span>${d.bedroom}</span></i>
        <i class="bx bx-bath"><span>${d.washroom}</span></i>
      </div>
    </div>
    </div>`;
});
