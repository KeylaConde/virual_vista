const menu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');

menu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
}