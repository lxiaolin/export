function setCookie(key, value, delayDays = 36500) {
    let d = new Date();
    d.setTime(d.getTime() + (delayDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + encodeURIComponent(value) + "; " + expires;
}

function getCookie(key) {
    let name = key + "=",
        ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length, c.length));
    }
    return "";
}