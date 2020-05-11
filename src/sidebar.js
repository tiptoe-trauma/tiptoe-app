// var coll = document.getElementByClassName("collapsible");
// var i;

// for (i=0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var content = document.getElementsByClassName("sidebar");
//         if (content.style.display === "block") {
//             content.style.display = "none";
//         } else {
//             content.style.display = "block";
//         }
//     });
// }


function showFigure() {
    console.log("In function")
    var sidebar = document.getElementById("figure")
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
        sidebar.style.paddingTop = "0"
        sidebar.style.transition = "0.5s"
    } else {
        sidebar.style.display = "block";
        sidebar.style.paddingTop = "60px"
        sidebar.style.transition = "0.5s"
    }
}

function test() {
    document.getElementById("testbutton").innerText = "Bingo";
}