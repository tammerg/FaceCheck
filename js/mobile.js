function checkScreen() {
    var docW = $(document).width();
    if (docW < 992) {
        $('.urlInput').detach().appendTo('.mobileUrl');
    } else {
        $('.urlInput').detach().appendTo('.desktop-wrap');
    }
}
$(function() {
    checkScreen();
});

$(window).resize(function() {
    checkScreen();
});
