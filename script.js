// 1. AOS ഇനിഷ്യലൈസേഷൻ
AOS.init({
    duration: 800, 
    once: true 
});

// 2. മൊബൈൽ മെനു ടോഗിൾ ഫംഗ്ഷൻ
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// മെനു ലിങ്കുകളിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ മെനു ഹൈഡ് ചെയ്യാൻ
document.querySelectorAll('#mobile-menu a').forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('mobile-menu-hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});