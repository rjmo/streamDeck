/* Set the width of the side navigation to 250px */

document.getElementById("open").addEventListener("click", openNav);
document.getElementById("close").addEventListener("click", closeNav);

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mainw").style.marginLeft = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mainw").style.marginLeft = "0";
  } 
