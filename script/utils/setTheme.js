var savedTheme = localStorage.getItem('theme');
var root = document.documentElement;

function setDarkTheme() {
    root.style.setProperty('--standart-background', '#333333');
    root.style.setProperty('--standart-border', '#252525');
    root.style.setProperty('--burger-color', 'white');
    root.style.setProperty('--line-color', 'white');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--border-color', 'white');
    root.style.setProperty('--outline-color', 'white');
    localStorage.setItem('theme', 'dark');
}

function setLightTheme() {
    root.style.setProperty('--standart-background', '#FFFFFF');
    root.style.setProperty('--standart-border', 'lightgray');
    root.style.setProperty('--burger-color', 'black');
    root.style.setProperty('--line-color', 'black');
    root.style.setProperty('--text-color', 'black');
    root.style.setProperty('--border-color', 'black');
    root.style.setProperty('--outline-color', 'black');
    localStorage.setItem('theme', 'light');
}

function toggleTheme() {
    savedTheme = localStorage.getItem('theme');
    if (savedTheme == "dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }
}
