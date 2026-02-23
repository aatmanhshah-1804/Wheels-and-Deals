const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const carCards = document.querySelectorAll(".car-card");

function filterCars() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedType = filterType.value;

  carCards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    const type = card.getAttribute("data-type");

    const matchName = name.includes(searchValue);
    const matchType = selectedType === "" || type === selectedType;

    if (matchName && matchType) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function addToWishlist(button) {
  const card = button.closest(".car-card"); // Changed from .card to .car-card to get attributes

  const name = card.getAttribute("data-name");
  const brand = card.getAttribute("data-brand") || name.split(" ")[0]; // Fallback
  const model = card.getAttribute("data-model") || name.replace(brand, "").trim();
  const year = card.getAttribute("data-year") || "2024";
  const fuel = card.getAttribute("data-fuel") || "Petrol";
  const price = card.getAttribute("data-price") || "0";
  const image = card.querySelector("img")?.src || "";

  if (!name) {
    alert("Error reading car data!");
    return;
  }

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const alreadyAdded = wishlist.find(car => car.name === name);

  if (alreadyAdded) {
    alert("Car already in wishlist!");
    return;
  }

  wishlist.push({
    name: name,
    brand: brand,
    model: model,
    year: year,
    fuel: fuel,
    price: price,
    image: image
  });

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  updateWishlistCount();

  alert("Added to Wishlist ❤️");
}


searchInput.addEventListener("keyup", filterCars);
filterType.addEventListener("change", filterCars);
