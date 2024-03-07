const menu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const enter = document.querySelector('.entrar');
const loadingMessage = document.getElementById('loadingMessage');
const menuCarritoIcon = document.querySelector('.navbar-shopping-cart');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const iconFlecha = document.querySelector('.flecha');

menu.addEventListener('click', toggleMobileMenu);
enter.addEventListener('click', redirect);
menuCarritoIcon.addEventListener('click', toggleCarritoAside);
iconFlecha.addEventListener('click', closeCarritoAside);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
}

function redirect() {
    loadingMessage.style.display = 'block';
    setTimeout(function () {
        window.location.href = './productos.html';
    }, 1000); 
}

function toggleCarritoAside() {
    shoppingCartContainer.classList.toggle('inactive')
}

function closeCarritoAside() {
    shoppingCartContainer.classList.add('inactive');
}