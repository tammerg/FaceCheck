function checkScreen() {
    var docW = $(document).width();
    if (docW < 992) {
        $('.API').detach().appendTo('.mobile');
    } else {
        $('.input').detach().appendTo('.mobileUrl');
    }
}
$(function() {
    checkScreen();
});
$(window).resize(function() {
    checkScreen();
});