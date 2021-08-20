function adjustSidebar() {
    if(document.getElementById("sidebarContent")){
        var window_height = document.body.scrollHeight;
        var figure_size = $("#sidebarContent").prop("scrollHeight");
        var question_size = $(".questions").prop("scrollHeight");
        var content = document.getElementById("sidebarContent");

        var cutoff = window_height - figure_size - 150;
        var current_pos = $("#sidebarContent").offset();
        var question_pos = $(".questions").offset();
        var current_offset = parseInt($("#sidebarContent").css("transform").split(',')[5]);

        if (figure_size > question_size){
            content.style.setProperty("max-height", question_size + "px");
            content.style.setProperty("max-width", "40%");
            content.style.setProperty("overflow-y", "scroll");

            var offset_increase = question_pos.top - current_pos.top;
            var new_offset = current_offset + offset_increase;
            content.style.setProperty('transform', "translateY(" + new_offset + "px)");
        } else {
            content.style.removeProperty("max-height");
            content.style.removeProperty("max-width");
            content.style.removeProperty("overflow-y");
            if ((current_pos.top - current_offset) > cutoff) {
                var offset_increase = cutoff - current_pos.top;
                var new_offset = current_offset + offset_increase;
                content.style.setProperty('transform', "translateY(" + new_offset + "px)");
            } else {
                content.style.setProperty('transform', "translateY(0px)");
            }
        }
    }
}

window.onscroll = function scrollCallAdjust() {
    adjustSidebar()
}
