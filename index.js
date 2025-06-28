document.addEventListener("DOMContentLoaded", function () {
  // --- HERO SECTION SLIDER (FADE EFFECT) ---
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slides img");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
      slide.style.zIndex = i === index ? "1" : "0";
    });
    slideIndex = index;
  }

  function plusSlides(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  if (slides.length > 0) {
    setInterval(() => {
      plusSlides(1);
    }, 5000);
    showSlide(slideIndex);
  }

  // --- UNIFIED CART SYSTEM ---
  let cart = JSON.parse(localStorage.getItem("perfume-cart")) || [];

function saveCart() {
  localStorage.setItem("perfume-cart", JSON.stringify(cart));
  renderCart();
}

window.toggleCart = function () {
  const cartEl = document.getElementById("cart");
  if (cartEl) cartEl.classList.toggle("open");
};

window.addToCart = function (name, price, btn) {
  let img = "";
  if (btn && btn.parentElement.querySelector("img")) {
    img = btn.parentElement.querySelector("img").src;
  }

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1, img });
  }

  saveCart();
  alert(`${name} added to cart! ✅`);
};

window.changeQty = function (index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
};

function renderCart() {
  const cartBox = document.getElementById("cart-items");
  if (cartBox) {
    cartBox.innerHTML = "";
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-details">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
        <div class="cart-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
        <strong>₹${item.price * item.qty}</strong>
      `;
      cartBox.appendChild(div);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) totalPriceEl.innerText = total;

  const cartTotalEl = document.getElementById("cart-total");
  if (cartTotalEl) cartTotalEl.innerText = total;

  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Initial render on every page
document.addEventListener("DOMContentLoaded", function () {
  renderCart(); // load cart from localStorage
});
window.toggleCart = function () {
  const cartEl = document.getElementById("cart");
  if (cartEl) {
    cartEl.classList.toggle("open");
  }
}
window.toggleCart = function () {
  const cartEl = document.getElementById("cart");
  if (cartEl) cartEl.classList.toggle("open");
};


  // contact-form
  if (window.emailjs) {
    emailjs.init("your_emailjs_userID_here"); // Replace with your EmailJS user ID

    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        emailjs.sendForm("your_service_id", "your_template_id", this)
          .then(() => {
            alert("Message sent successfully! ✅");
            form.reset();
          })
          .catch(() => {
            alert("Failed to send. ❌");
          });
      });
    }
  }

  // testimonial
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const dotsContainer = document.getElementById("testimonialDots");

  let currentSlide = 0;
  let slideInterval;
  const dots = [];

  function updateSlides() {
    testimonialSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function showNext() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateSlides();
  }

  function showPrev() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateSlides();
  }

  if (testimonialSlides.length > 0 && dotsContainer) {
    testimonialSlides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentSlide = i;
        updateSlides();
        resetInterval();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    if (nextBtn) nextBtn.addEventListener("click", () => { showNext(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { showPrev(); resetInterval(); });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(showNext, 5000);
    }

    slideInterval = setInterval(showNext, 5000);
    updateSlides();
  }
});
