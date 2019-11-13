export const blink_logo= () => {
    const logo = document.getElementById('logo-identifier');
    logo.setAttribute("class", "logo-blink");
    setTimeout(() => {
        logo.setAttribute("class", '');
    }, 1000);
}