// Car Data - 20+ Brands and their Models
const carData = {
    "Maruti Suzuki": ["Alto", "WagonR", "Swift", "Baleno", "Dzire", "Ertiga", "Brezza", "Grand Vitara", "Jimny", "Celerio", "S-Presso", "Ignis", "Ciaz", "XL6", "Invicto", "Fronx"],
    "Hyundai": ["Grand i10 Nios", "i20", "Aura", "Verna", "Venue", "Creta", "Alcazar", "Tucson", "Exter", "Ioniq 5", "Kona Electric"],
    "Tata": ["Tiago", "Tigor", "Altroz", "Punch", "Nexon", "Harrier", "Safari", "Curvv", "Sierra", "Nexon EV", "Tiago EV", "Tigor EV"],
    "Mahindra": ["Thar", "Scorpio-N", "Scorpio Classic", "XUV300", "XUV400", "XUV700", "Bolero", "Bolero Neo", "Marazzo"],
    "Toyota": ["Glanza", "Urban Cruiser Hyryder", "Innova Crysta", "Innova Hycross", "Fortuner", "Legender", "Camry", "Vellfire", "Hilux", "Land Cruiser"],
    "Honda": ["Amaze", "City", "Elevate"],
    "Kia": ["Sonet", "Seltos", "Carens", "EV6"],
    "MG": ["Hector", "Hector Plus", "Astor", "Gloster", "Comet EV", "ZS EV"],
    "Skoda": ["Slavia", "Kushaq", "Kodiaq", "Superb", "Octavia"],
    "Volkswagen": ["Virtus", "Taigun", "Tiguan"],
    "Renault": ["Kwid", "Triber", "Kiger"],
    "Nissan": ["Magnite", "X-Trail"],
    "Jeep": ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
    "Citroen": ["C3", "eC3", "C3 Aircross", "C5 Aircross"],
    "Audi": ["A4", "A6", "A8 L", "Q3", "Q5", "Q7", "Q8", "e-tron"],
    "BMW": ["3 Series", "5 Series", "6 Series", "X1", "X3", "X5", "X7", "Z4", "iX1", "i4", "i7"],
    "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS", "G-Class", "EQS", "EQE"],
    "Volvo": ["XC40", "XC60", "XC90", "S90", "C40 Recharge"],
    "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Evoque", "Defender", "Discovery", "Discovery Sport"],
    "Jaguar": ["F-Pace", "I-Pace", "F-Type"],
    "Porsche": ["Macan", "Cayenne", "Panamera", "911", "Taycan", "718"],
    "Lexus": ["ES", "NX", "RX", "LS", "LX", "LC"]
};

// DOM Elements
const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");

// Populate Brand and Year Dropdown on Load
window.onload = function () {
    const sortedBrands = Object.keys(carData).sort();

    sortedBrands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });

    // Populate Year Dropdown (2010 - 2026)
    const yearSelect = document.getElementById("year");
    for (let i = 2026; i >= 2010; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
};

// Event Listener for Brand Selection
brandSelect.addEventListener("change", function () {
    const selectedBrand = this.value;

    // Clear existing models
    modelSelect.innerHTML = '<option value="" selected disabled>Select Model</option>';

    // Enable model dropdown
    modelSelect.disabled = false;

    // Populate models
    if (carData[selectedBrand]) {
        carData[selectedBrand].sort().forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
});

// Form Submission Logic
document.getElementById("sellForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = document.getElementById("year").value;
    const price = document.getElementById("price").value;
    const fuel = document.getElementById("fuel").value;
    const image = document.getElementById("image").value || "https://via.placeholder.com/400x250";
    const description = document.getElementById("description").value;

    const newCar = {
        id: Date.now(),
        brand,
        model,
        year,
        price,
        fuel,
        image,
        description
    };

    // Get existing cars
    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    // Add new car
    cars.push(newCar);

    // Save back to localStorage
    localStorage.setItem("cars", JSON.stringify(cars));

    // Reset form
    document.getElementById("sellForm").reset();

    // Reset Selects Manually (form reset doesn't reset dynamic options properly sometimes)
    brandSelect.value = "";
    modelSelect.innerHTML = '<option value="" selected disabled>Select Model</option>';
    modelSelect.disabled = true;

    // ✅ Show Bootstrap Modal
    const successModal = new bootstrap.Modal(document.getElementById("successModal"));
    successModal.show();
});
