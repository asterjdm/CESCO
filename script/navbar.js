const body = document.body;
const mainHeader = document.getElementById("mainHeader");
const mainTitle = document.getElementById("mainTitle");
const headerSeparator = document.getElementById("headerSeparator");
const headerLinks = document.getElementById("headerLinks");
const headerLink = document.querySelectorAll("#headerLink");
const search = document.getElementById("search");
const searchLabel = document.getElementById("searchLabel");
const hamburgerMenu = document.getElementById("hamburgerMenu");


function toggleHamburgerMenu() {
    hamburgerMenu.classList.toggle("active");
    hamburgerMenu.classList.toggle("nav-open");

    body.classList.toggle("nav-open");
    mainHeader.classList.toggle("nav-open");
    mainTitle.classList.toggle("nav-open");
    headerSeparator.classList.toggle("nav-open");
    headerLinks.classList.toggle("nav-open");
    headerLink.forEach(el => el.classList.toggle("nav-open"));
    search.classList.toggle("nav-open");
    searchLabel.classList.toggle("nav-open");
}

hamburgerMenu.addEventListener("click", toggleHamburgerMenu);

// Check screen width for hamburger menu
window.addEventListener("resize", () => {
    if (screen.width > 850 && mainHeader.classList.contains("nav-open")) {
      toggleHamburgerMenu();
    }
});

headerLink.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainHeader.classList.contains("nav-open")) {
        toggleHamburgerMenu();
      }
    });
  });
