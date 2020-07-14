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
    var sidebar = document.getElementById("figure")
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
        sidebar.style.paddingTop = "0";
        sidebar.style.transition = "0.5s";
        document.getElementById("openbtn").innerHTML = "Show Comparison";
    } else {
        sidebar.style.display = "block";
        sidebar.style.paddingTop = "20px";
        sidebar.style.transition = "0.5s";
        document.getElementById("openbtn").innerHTML = "Hide Comparison";
    }
}

window.onscroll = function adjustSidebar() {
    var window_height = document.body.scrollHeight;
    var figure_size = $("#sidebarContent").prop("scrollHeight");
    var question_size = $(".questions").prop("scrollHeight");
    var content = document.getElementById("sidebarContent");

    var cutoff = window_height - figure_size - 150;
    var current_pos = $("#sidebarContent").offset();
    var question_pos = $(".questions").offset();
    var current_offset = parseInt($("#sidebarContent").css("transform").split(',')[5]);

    if (figure_size > question_size){
        console.log('hit');
        content.style.setProperty("max-height", question_size + "px");
        content.style.setProperty("overflow", "scroll");

        var offset_increase = question_pos.top - current_pos.top;
        var new_offset = current_offset + offset_increase;
        content.style.setProperty('transform', "translateY(" + new_offset + "px)");
    } else {
        content.style.removeProperty("max-height");
        content.style.removeProperty("overflow");
        if ((current_pos.top - current_offset) > cutoff) {
            var offset_increase = cutoff - current_pos.top;
            var new_offset = current_offset + offset_increase;
            content.style.setProperty('transform', "translateY(" + new_offset + "px)");
        } else {
            content.style.setProperty('transform', "translateY(0px)");
        }
    }

}
