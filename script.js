const toggle = () => {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".phone-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
};