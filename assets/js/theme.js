$(document).ready(function() {
    $(window).bind('scroll', function() {
        var navHeight = 1;
        if ($(window).scrollTop() > navHeight) {
            $('header .navbar').addClass('fixed');
        }
        else {
            $('header .navbar').removeClass('fixed');
        }
    });
});
