////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;
var courses = {
catalogs: [
    {id : "math", description : "взять абонемент по математике"},
    {id : "physics", description : "взять абонемент по физике"},
    {id : "algorithms", description : "взять абонемент по информатике"},
    {id:'bestMark', description : "исправить успеваемость"},
    {id:'learnNew', description : "научиться программировать"},
    {id:'myTime', description : "не тратить свое время впустую"},
    {id:'getNew', description : "обрести новые знания и навыки"},
    {id:'sendFeedback', description : "оставить отзыв"}
]
};


$(document).ready(function($) {
    "use strict";
    setTitleBlack();



    // var latitude = 34.038405;
    // var longitude = -117.946944;
    // var markerImage = "assets/img/map-marker.png";
    // var mapElement = "map";
    // var mapStyle = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}];
    // if( $("#map").length ){
    //     simpleMap(latitude, longitude, markerImage, mapStyle, mapElement);
    // }

    $("body").imagesLoaded( function() {
        $("body").addClass("loading-done");
        $("[data-animate]").scrolla({
            mobile: true
        });
    });

    //$(this).find('.toggle-link__span').css({'transform': 'rotate(0deg)'});

    $('.navbar-nav .nav-link').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    $(".ts-img-into-bg").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });

//  Background

    $("[data-bg-color], [data-bg-image], [data-bg-particles]").each(function() {
        var $this = $(this);

        if( $this.hasClass("ts-separate-bg-element") ){
            $this.append('<div class="ts-background">');

            // Background Color

            if( $("[data-bg-color]") ){
                $this.find(".ts-background").css("background-color", $this.attr("data-bg-color") );
            }

            // Particles

            if( $this.attr("data-bg-particles-line-color") || $this.attr("data-bg-particles-dot-color") ){
                $this.find(".ts-background").append('<div class="ts-background-particles">');
                $(".ts-background-particles").each(function () {
                    let lineColor = $this.attr("data-bg-particles-line-color");
                    let dotColor = $this.attr("data-bg-particles-dot-color");
                    let parallax = $this.attr("data-bg-particles-parallax");
                    $(this).particleground({
                        density: 15000,
                        lineWidth: 0.2,
                        lineColor: lineColor,
                        dotColor: dotColor,
                        parallax: parallax,
                        proximity: 200
                    });
                });
            }

            // Background Image

            if( $this.attr("data-bg-image") !== undefined ){
                $this.find(".ts-background").append('<div class="ts-background-image">');
                $this.find(".ts-background-image").css("background-image", "url("+ $this.attr("data-bg-image") +")" );
                $this.find(".ts-background-image").css("background-size", $this.attr("data-bg-size") );
                $this.find(".ts-background-image").css("background-position", $this.attr("data-bg-position") );
                $this.find(".ts-background-image").css("opacity", $this.attr("data-bg-image-opacity") );

                $this.find(".ts-background-image").css("background-size", $this.attr("data-bg-size") );
                $this.find(".ts-background-image").css("background-repeat", $this.attr("data-bg-repeat") );
                $this.find(".ts-background-image").css("background-position", $this.attr("data-bg-position") );
                $this.find(".ts-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode") );
            }

            // Parallax effect

            if( $this.attr("data-bg-parallax") !== undefined ){
                $this.find(".ts-background-image").addClass("ts-parallax-element");
            }
        }
        else {

            if(  $this.attr("data-bg-color") !== undefined ){
                $this.css("background-color", $this.attr("data-bg-color") );
                if( $this.hasClass("btn") ) {
                    $this.css("border-color", $this.attr("data-bg-color"));
                }
            }

            if( $this.attr("data-bg-image") !== undefined ){
                $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );

                $this.css("background-size", $this.attr("data-bg-size") );
                $this.css("background-repeat", $this.attr("data-bg-repeat") );
                $this.css("background-position", $this.attr("data-bg-position") );
                $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
            }

        }
    });

//  Parallax Background Image

    $("[data-bg-parallax='scroll']").each(function() {
        var speed = $(this).attr("data-bg-parallax-speed");
        var $this = $(this);
        var isVisible;
        var backgroundPosition;

        $this.isInViewport(function(status) {
            if (status === "entered") {
                isVisible = 1;
                var position;

                $(window).scroll(function () {
                    if( isVisible === 1 ){
                        position = $(window).scrollTop() - $this.offset().top;
                        backgroundPosition = (100 - (Math.abs((-$(window).height()) - position) / ($(window).height()+$this.height()))*100);
                        if( $this.find(".ts-parallax-element").hasClass("ts-background-image") ){
                            $this.find(".ts-background-image.ts-parallax-element").css("background-position-y", (position/speed) + "px");
                        }
                        else {
                            $this.find(".ts-parallax-element").css("transform", "translateY(" +(position/speed)+ "px)");
                        }
                    }
                });
            }
            if (status === "leaved"){
                isVisible = 0;
            }
        });
    });

    $(".ts-labels-inside-input input, .ts-labels-inside-input textarea").focusin(function() {
        $(this).parent().find("label").addClass("focused");
    })
        .focusout(function() {
            if( $(this).val().length === 0 ){
                $(this).parent().find("label").removeClass("focused")
            }
        });

    $("select").each(function(){
        $(this).wrap('<div class="select-wrapper"></div>');
    });

    // Owl Carousel

    var $owlCarousel = $(".owl-carousel");

    if( $owlCarousel.length ){
        $owlCarousel.each(function() {

            var items = parseInt( $(this).attr("data-owl-items"), 10);
            if( !items ) items = 1;

            var nav = parseInt( $(this).attr("data-owl-nav"), 2);
            if( !nav ) nav = 0;

            var dots = parseInt( $(this).attr("data-owl-dots"), 2);
            if( !dots ) dots = 0;

            var center = parseInt( $(this).attr("data-owl-center"), 2);
            if( !center ) center = 0;

            var loop = parseInt( $(this).attr("data-owl-loop"), 2);
            if( !loop ) loop = 0;

            var margin = parseInt( $(this).attr("data-owl-margin"), 2);
            if( !margin ) margin = 0;

            var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
            if( !autoWidth ) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if( !navContainer ) navContainer = 0;

            var autoplay = parseInt( $(this).attr("data-owl-autoplay"), 2);
            if( !autoplay ) autoplay = 0;

            var autoplayTimeOut = parseInt( $(this).attr("data-owl-autoplay-timeout"), 10);
            if( !autoplayTimeOut ) autoplayTimeOut = 5000;

            var autoHeight = parseInt( $(this).attr("data-owl-auto-height"), 2);
            if( !autoHeight ) autoHeight = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if( !fadeOut ) fadeOut = 0;
            else fadeOut = "fadeOut";

            if( $("body").hasClass("rtl") ) var rtl = true;
            else rtl = false;

            if( items === 1 ){
                $(this).owlCarousel({
                    navContainer: navContainer,
                    animateOut: fadeOut,
                    autoplayTimeout: autoplayTimeOut,
                    autoplay: 1,
                    autoHeight: autoHeight,
                    center: center,
                    loop: loop,
                    margin: margin,
                    autoWidth: autoWidth,
                    items: 1,
                    nav: nav,
                    dots: dots,
                    rtl: rtl,
                    navText: []
                });
            }
            else {
                $(this).owlCarousel({
                    navContainer: navContainer,
                    animateOut: fadeOut,
                    autoplayTimeout: autoplayTimeOut,
                    autoplay: autoplay,
                    autoHeight: autoHeight,
                    center: center,
                    loop: loop,
                    margin: margin,
                    autoWidth: autoWidth,
                    items: 1,
                    nav: nav,
                    dots: dots,
                    rtl: rtl,
                    navText: [],
                    responsive: {
                        1199: {
                            items: items
                        },
                        992: {
                            items: 3
                        },
                        768: {
                            items: 2
                        },
                        0: {
                            items: 1
                        }
                    }
                });
            }

            if( $(this).find(".owl-item").length === 1 ){
                $(this).find(".owl-nav").css( { "opacity": 0,"pointer-events": "none"} );
            }

        });
    }

    // Magnific Popup

    var $popupImage = $(".popup-image");

    if ( $popupImage.length > 0 ) {
        $popupImage.magnificPopup({
            type:'image',
            fixedContentPos: false,
            gallery: { enabled:true },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            callbacks: {
                // This prevents pushing the entire page to the right after opening Magnific popup image
                open: function() {
                    $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
                },
                close: function() {
                    $(".page-wrapper, .navbar-nav").css("margin-right", 0);
                }
            }
        });
    }

    // var $videoPopup = $(".video-popup");
    //
    // if ( $videoPopup.length > 0 ) {
    //     $videoPopup.magnificPopup({
    //         type: "iframe",
    //         removalDelay: 300,
    //         mainClass: "mfp-fade",
    //         overflowY: "hidden",
    //         iframe: {
    //             markup: '<div class="mfp-iframe-scaler">'+
    //                 '<div class="mfp-close"></div>'+
    //                 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
    //                 '</div>',
    //             patterns: {
    //                 youtube: {
    //                     index: 'youtube.com/',
    //                     id: 'v=',
    //                     src: '//www.youtube.com/embed/%id%?autoplay=1'
    //                 },
    //                 vimeo: {
    //                     index: 'vimeo.com/',
    //                     id: '/',
    //                     src: '//player.vimeo.com/video/%id%?autoplay=1'
    //                 },
    //                 gmaps: {
    //                     index: '//maps.google.',
    //                     src: '%id%&output=embed'
    //                 }
    //             },
    //             srcAction: 'iframe_src'
    //         }
    //     });
    // }
    
    


    $(".ts-form-email [type='submit']").each(function(){
        var text = $(this).text();
        $(this).html("").append("<span>"+ text +"</span>").prepend("<div class='status'><i class='fas fa-circle-notch fa-spin spinner'></i></div>");
    });
    //handle the submit of contact-form, change php-path to java service
    $("#form-subscribe .btn[type='submit']").on("click", function(e){
        var $button = $(this);
        var $form = $(this).closest("form");
        var pathToGo = $(this).closest("form").attr("data-go-path");
        pathToGo = '/requestSubscribe';
        $form.validate({
            submitHandler: function() {
                $button.addClass("processing");
                //#TODO Uncomment if necessary
                // $('#subscribeForm').submit(function () {
                //     let subscribeData = $('#subscribeForm').serialize();
                //     console.log(subscribeData);
                //     $.ajax({
                //         type: 'POST',
                //         url:'/requestSubscribe',
                //         data: subscribeData,
                //         success: function(msg){
                //             alert('wow' + msg);
                //         },
                //         error: function(msg){
                //             alert('error...' + msg);
                //         }
                //     });
                // });
                $.post( pathToGo, $form.serialize(),  function(response) {
                    $button.removeClass("processing");
                    $button.addClass("done").prop("disabled", true).text("Готово!"); //#TODO add if necessary .find(".status").append(response).prop("disabled", true)
                    $('#subscribeDescription').text("Ожидайте первое странное бизобидное письмо уже завтра. Если будут вопросы — пишите: mail@glvrd.ru\n")
                });
                // var jqxhr = $.post( "/requestSubscribe", $form.serialize(), function() {
                //     alert( "success" );
                // })
                //     .done(function() {
                //         console.log( "second success" );
                //         $button.addClass("done").find(".status").append(response).prop("disabled", true);
                //     })
                //     .fail(function() {
                //         console.log( "error" );
                //     })
                //     .always(function() {
                //         alert( "finished" );
                //     });
                // return false;
            }
        });
    });



    $("#form-contact .btn[type='submit']").on("click", function (e) {
        let $button = $(this);
        let $form = $(this).closest("form");
        let uri = "/sendMessage";
        $form.validate({
            submitHandler: function () {
                var formdata = $form.serializeArray();
                var data = {};
                $(formdata ).each(function(index, obj){
                    data[obj.name] = obj.value;
                });
                console.log(data);
                data = JSON.stringify(data);
                $button.addClass("processing");
                $.post(uri,
                    data,
                    function(data, status, jqXHR) {
                        $button.removeClass("processing");
                        $button.addClass("done").prop("disabled", true).text("Готово!");
                    }
                );
            }
        });
    });


    $("form:not(.ts-form-email)").each(function(){
        $(this).validate();
    });



// On RESIZE actions

    $(window).on("resize", function(){
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing(), 250);
        setTitleBlack();
    });

// On SCROLL actions
//#TODO $(window).scrollTop() > 115 -> text transparent 100
    $(window).on("scroll", function(){
        // console.log("you scrolled to: " + $(window).scrollTop());
        if ( $(window).scrollTop() >= $(window).height() ) {
            $(".navbar").addClass("in");
            $(".me-brand").addClass("in");
        }
        else {
            $(".navbar").removeClass("in");
            $(".me-brand").removeClass("in");
            setTitleBlack();
        }
    });

    $('.toggle-link').on("click", function () {
        // $('.toggle-link-one-span').css('transform', 'rotate(180deg)');
        if($(this).attr('aria-expanded')!='true'){
            $(this).find('.toggle-link__span').css({'transform': 'rotate(0deg)'});
        }
        else {
            $(this).find('.toggle-link__span').css({'transform': 'rotate(180deg)'});
        }
    });


    /*modal is opned:
    get course, then work with button
    */

    /*
    r
     */


    $('#modalCourse').on('show.bs.modal', function(e) {
        console.log("modal is open and preventdefault!")
        $('form-contact-message').val('');
        var location;
        var courseId = $(e.relatedTarget).data('course-id');
        console.log(courseId);
        courses.catalogs.forEach(function(entry) {
            console.log(entry.id);
            if (courseId==entry.id) {
                $('#form-contact-message').text("Я хочу " + entry.description);
            }

        });
        if ($(!'#form-contact-message').val()){
            $('#form-contact-message').text("Я хочу и могу знать больше других, учиться лучше других, быть умнее других");
        }
        $('#button_abik').on("click", function () {

            //#TODO change $window to 'html, body'
            $('html, body').animate({
                scrollTop: $('#contact').offset().top
            }, 500).promise().done(function () {


                $('#modalCourse').modal('hide');



            });



            //shown

            //$('#modalCourse').modal('hide');//


        });

    });

    $("#sendFeedbackButton").click(function () {
        setContactForm(checkCoursesRequest("sendFeedback"))
        //console.log(checkCoursesRequest("sendFeedback"));
    });
//$.stopPropagation();

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function doneResizing(){
    heroHeight();
    $(".owl-carousel").trigger('next.owl.carousel');
}

// Set Hero height

function heroHeight(){
    $(".ts-full-screen").height( $(window).height() );
}

// Smooth Scroll

$(".ts-scroll").on("click", function(event) {
    if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
        &&
        location.hostname === this.hostname
    ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex','-1');
                    $target.focus();
                }
            });
        }
    }
});



// Return scrollbar width

function getScrollBarWidth () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}

// function simpleMap(latitude, longitude, markerImage, mapStyle, mapElement, markerDrag){
//     if (!markerDrag){
//         markerDrag = false;
//     }
//     var mapCenter = new google.maps.LatLng(latitude,longitude);
//     var mapOptions = {
//         zoom: 13,
//         center: mapCenter,
//         disableDefaultUI: true,
//         scrollwheel: false,
//         styles: mapStyle
//     };
//     // var element = document.getElementById(mapElement);
//     // var map = new google.maps.Map(element, mapOptions);
//     // var marker = new google.maps.Marker({
//     //     position: new google.maps.LatLng(latitude,longitude),
//     //     map: map,
//     //     icon: markerImage,
//     //     draggable: markerDrag
//     // });
// }

var hasAttr = function(name) {
    return (typeof this.attr(name) !== 'undefined' && this.attr(name) !== false);
};

function setTitleBlack() {
    if ($(window).width()<= 769){
        $((".me-brand")).addClass("in");
    }
}

//for
function setTimeForLegth(){
    if (length>3000){
        return 1500;
    }
    else return 500;
}

//this function checks the set of request courses
function checkCoursesRequest(courseId){
    var response = "";
    courses.catalogs.forEach(function(entry) {
        if (courseId==entry.id) {
            response = ("Я хочу " + entry.description);
        }
        else response = "Я хочу знать больше других, учиться лучше других, быть умнее других!";

    });
    return response;
}
//for input use checkCoursesRequest with courseID
function setContactForm(checkCoursesResponse) {
    $("#form-contact-message").text("");
    if (typeof checkCoursesResponse === 'string' ){
        $("#form-contact-message").text(checkCoursesRequest(checkCoursesResponse));
    }
    else {
        console.error("input parameter for data-course-id is not a string");
    }
}
// var timerId = setInterval(function() {
//     console.log( "second passed");
// }, 1000);