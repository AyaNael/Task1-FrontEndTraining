document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".menu-links li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // remove class from all links
            navLinks.forEach(l => l.classList.remove("active-link"));

            // add class for the clicked linked
            this.classList.add("active-link");
        });
    });
});
const menuIcon = document.querySelector('.menu-icon');
const menuLinks = document.querySelector('.menu-links');
const overlay = document.getElementById('drawerOverlay');

menuIcon.addEventListener('click', () => {
    menuLinks.classList.toggle('open');
    overlay.classList.toggle('active');

});
overlay.addEventListener('click', () => {
    menuLinks.classList.remove('open');
    overlay.classList.remove('active');
});

// إغلاق القائمة بعد الضغط على أي رابط)
menuLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuLinks.classList.remove("open");
        overlay.classList.remove('active');

    });
});
