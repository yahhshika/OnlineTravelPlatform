let textToggle = document.getElementById("checkNativeSwitch");
let listings = document.getElementsByClassName("tax");
textToggle.addEventListener("click", ()=>{
    console.log('clicked');
    listingArray = Array.from(listings);
    for(listing of listingArray){
        let currentDisplay = window.getComputedStyle(listing).display;
        if(currentDisplay === 'none'){
            listing.style.display = 'inline';
        }else{
            listing.style.display = 'none';
        }
        
    }
    
    
})