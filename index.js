const menu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const enter = document.querySelector('.entrar');
const loadingMessage = document.getElementById('loadingMessage');

menu.addEventListener('click', toggleMobileMenu);
enter.addEventListener('click', redirect);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
}

function redirect() {
    loadingMessage.style.display = 'block';
    setTimeout(function () {
        window.location.href = './productos.html';
    }, 1000); 
}