function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const countElement = document.getElementById("wishlistCount");

  if (countElement) {
    countElement.innerText = wishlist.length;
  }
}

function loadWishlist() {
  const container = document.getElementById("wishlistContainer");
  if (!container) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<h4 class='text-center'>Wishlist is empty ❤️</h4>";
    return;
  }

  wishlist.forEach((car, index) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow">
          <img src="${car.image}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${car.name}</h5>
            <p class="card-text">${car.price}</p>
            <button class="btn btn-danger w-100"
              onclick="removeFromWishlist(${index})">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function removeFromWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.splice(index, 1);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  loadWishlist();
  updateWishlistCount();
}

updateWishlistCount();
