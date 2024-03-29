var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);},
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

jQuery(document).ready(function ($) {
 
    if( !isMobile.any() && !isSafari ){ 
    //initialise Stellar.js
    $(window).stellar();
    //Cache some variables
    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
    //Setup waypoints plugin
    slide.waypoint(function (event, direction) {
 
        //cache the variable of the data-slide attribute associated with each slide
        dataslide = $(this).attr('data-slide');
 
        //If the user scrolls up change the navigation link that has the same data-slide attribute as the slide to active and 
        //remove the active class from the previous navigation link 
        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        // else If the user scrolls down change the navigation link that has the same data-slide attribute as the slide to active and 
        //remove the active class from the next navigation link 
        else {
            $('.navigation li[data-slide="' + (dataslide-1) + '"]').addClass('active').next().removeClass('active'); }
 
    }, { offset:50 }); // The waypoint is triggered when the element is X px from the top of the viewport.
    //waypoints doesnt detect the first slide when user scrolls back up to the top so we add this little bit of code, that removes the class 
    //from navigation link slide 2 and adds it to navigation link slide 1. 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });
    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }
    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });
    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });
    } 
});

$(function() {
    // Stick the #nav to the top of the window
    var navigation = $('.navigation');
    var navHomeY = navigation.offset().top;
    var isFixed = false;
    var $w = $(window);
    $w.scroll(function() {
        var scrollTop = $w.scrollTop();
        var shouldBeFixed = scrollTop > navHomeY;
        if (shouldBeFixed && !isFixed) {
            navigation.css({
                position: 'fixed',
                top: 0,
                left: navigation.offset(),
                width: navigation.width()
            });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed)
        {
            navigation.css({
                position: 'static'
            });
            isFixed = false;
        }
    });
});