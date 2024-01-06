

async function openPopup(popupId: string)
{
    document.body.style.overflow = "hidden";
    const popup = document.getElementById(popupId);

    if (popup == null)
    {
        throw "Popup ID not found"   
    }

    popup.classList.add("show");
}

async function closePopup(popupId: string) {
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (hamburgerMenu == null)
    {
        throw ".hamburger-menu not found"   
    }

    if (hamburgerMenu.classList.contains("active")) 
    {
        hamburgerMenu.classList.toggle("active")
    }

    document.body.style.overflow = "auto";

    const popup = document.getElementById(popupId);

    if (popup == null)
    {
        throw "Popup ID not found"   
    }

    setTimeout(() => {
        popup.classList.remove('show', 'closing');
    }, 250);
}