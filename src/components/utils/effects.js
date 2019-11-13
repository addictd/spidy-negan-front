export const blink_logo= () => {
    const logo = document.getElementById('logo-identifier');
    logo.setAttribute("class", "logo-blink");
    setTimeout(() => {
        logo.setAttribute("class", '');
    }, 1000);
}

export const blink_desc= () => {
    const logo = document.getElementById('logo-desc');
    const nav = document.getElementById('nav');
    logo.setAttribute("class", "logo-desc-blink");
    nav.setAttribute("class", "nav logo-desc-blink");
    setTimeout(() => {
        logo.setAttribute("class", '');
        nav.setAttribute("class", 'nav');
    }, 1000);
}

