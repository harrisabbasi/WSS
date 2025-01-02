// The Main Javascript File
var galleryarray1 = new Array("assets/images/thumb1.png", "assets/images/thumb2.png",
  "assets/images/thumb3.png", "assets/images/thumb4.png", "assets/images/thumb5.png",
  "assets/images/thumb6.png"
);

var galleryarray2 = new Array("assets/images/bigpic1.png", "assets/images/bigpic2.png",
  "assets/images/bigpic3.png", "assets/images/bigpic4.png", "assets/images/bigpic5.png",
  "assets/images/bigpic6.png"
);

var booarray = new Array("boo1", "boo2",
  "boo3");

var cheerarray = new Array("cheer1", "cheer2",
  "cheer3", "cheer4", "cheer5");

// The Function for the Game, randomly sets up the hidden images
function setup_board() {

  // Two arrays, for two sets of images
  let tile_images = new Array("images/image1.png", "images/image2.png",
    "images/image3.png", "images/image4.png", "images/image5.png",
    "images/image6.png", "images/image7.png", "images/image8.png"
  );

  let tile_images_second_copy = new Array("images/image1.png", "images/image2.png",
    "images/image3.png", "images/image4.png", "images/image5.png",
    "images/image6.png", "images/image7.png", "images/image8.png"
  );

  let tile_ids = new Array("hidden-pic-1", "hidden-pic-2", "hidden-pic-3", "hidden-pic-4", "hidden-pic-5", "hidden-pic-7", "hidden-pic-8",
    "hidden-pic-9", "hidden-pic-10", "hidden-pic-11", "hidden-pic-12", "hidden-pic-13", "hidden-pic-14", "hidden-pic-15", "hidden-pic-16", "hidden-pic-6"
  );

  // The tile_ids array gets a picture assigned, and than is spliced, until all its values (tile_ids) have picture assigned
  for (var i = 0; i < 8; i++) {
    let rand = Math.floor((Math.random() * tile_images.length));
    let rand_2 = Math.floor((Math.random() * tile_ids.length));

    document.getElementById(tile_ids[rand_2]).src = tile_images[rand];
    tile_images.splice(rand, 1);
    tile_ids.splice(rand_2, 1);
  }
  for (var i = 0; i < 8; i++) {
    let rand = Math.floor((Math.random() * tile_images_second_copy.length));
    let rand_2 = Math.floor((Math.random() * tile_ids.length));

    document.getElementById(tile_ids[rand_2]).src = tile_images_second_copy[rand];
    tile_images_second_copy.splice(rand, 1);
    tile_ids.splice(rand_2, 1);
  }

}

var check = 0;
var x = 0;
var a = 0;
// var y = 0;
var d = 0;
var c, imgObject, y, z;
var ctx1, ctx2, ctx3, ctx4, ctx5, ctx5, ctx6;
var game = 0;
var source;
var gamecheck = 0;
var new1 = 0;
var previous, current;
var new2 = 0;
var offset, offset1;
var p, m;
var canvas_loaded;
var mult = 1;
var mult2 = 1;
var marleft;
var check2 = 0;
var picture_position;
var gallery_slide = 1;
var aboutcheck = 0;
var menucheck = 0;
var loader = 0;
var loadercounter = 0;

// Rotates the Whole Body, if Potrait Orientation detected
function doOnOrientationChange() {
  if ($(window).height() > $(window).width()) {

    $("body").css("transform", "rotate(-90deg)");
    $("body").css("position", "relative");

    $("body").css("left", (1 * ($(window).width() - $(window).height())) / 2 + 'px');
    $("body").css("top", (-1 * ($(window).width() - $(window).height())) / 2 + 'px');
    $("body").css("height", $(window).width() + 'px');
    $("body").css("width", $(window).height() + 'px');
  } else {
    $("body").css("transform", "rotate(0deg)");
    $("body").css("width", $(window).width() + 'px');
    $("body").css("height", $(window).height() + 'px');
    $("body").css("left", "0%");
    $("body").css("top", "0%");

  }
}

$(document).ready(function () {
  //Triggered on Every Resize
  window.addEventListener('resize', doOnOrientationChange);

  // This function is called to preload all images, before displaying, so you dont get the visuals of image downloading
  $.preloadImages = function () {
    for (var i = 0; i < arguments.length; i++) {
      $("<img />").on("load", function () {
        loader++;
      }).attr("src", arguments[i]);
    }
  }

  // If Browser Tab is focused, Plays the Music depending on the Image of the Sound Icon
  $(window).focus(function () {
    var src = $("#shown").attr('src');
    if (src == "assets/images/music.png") {
      document.getElementById('audio1').play();
    }
  });

  //Pauses the Music when Browser Tab not focused
  $(window).blur(function () {
    document.getElementById('audio1').pause();
  });


  // If About is pressed in the Header Menu
  $("#menu-item-3").click(function () {
    if (aboutcheck == 0) {
      setup_board();
      aboutcheck++;
    }

    // If About is Pressed when the Current Page is Any Page Other Than Homepage or the About Page
    if ($("#ri-page").css('display') == "block" || $("#rsvp-page").css('display') == "block" || $("#contact-page").css('display') == "block" ||
      $("#gallery-container").css('display') == "block") {

      $("#container-multiple").css("pointer-events", "visible"); // The Container of All Pages apart Homepage becomes interactable

      // Animates the Current Page out of View

      if ($("#rsvp-page").css('display') == "block") {
        $("#rsvp-page").animate({
          left: '100%'
        }, 500, "linear");
      }

      if ($("#gallery-container").css('display') == "block") {
        $("#gallery-container").animate({
          left: '-150%'
        }, 500, "linear");
      }

      if ($("#ri-page").css('display') == "block") {
        $("#ri-page").animate({
          left: '100%'
        }, 500, "linear");
      }

      if ($("#contact-page").css('display') == "block") {
        $("#contact-page").animate({
          left: '100%'
        }, 500, "linear");
      }

      // Repetitive, but sets up About 1 to be animated from top
      if ($("#ri-page").css('display') == "block" || $("#rsvp-page").css('display') == "block" || $("#contact-page").css('display') == "block" ||
        $("#gallery-container").css('display') == "block") {
        $("#about-page-1").css("top", "-100%");
        $("#about-page-1").css("left", "0%");
      }

      $("#about-pages-container").css('display', 'initial');

      // Top Down Animation of About 1
      $("#about-page-1").animate({
        top: '0%'
      }, 500, "linear");

      // Can be replaced with Timeout, checks off the items left when About Page has come into View
      var interval99 = setInterval(function () {
        $("#black-screen").css('display', 'block'); //Fades the Screen
        $(".header-menu").css('z-index', 100); //Keeps the Header Menu above the Fade or Visible
        $("#icon7").css('z-index', 100); // Keeps the Music Icon Above the Fade or Visible
        $("#container-multiple").css("pointer-events", "none"); //The Home Page Becomes Unclickable or Interactable

        // Since the Previous Page has Safely Animated off Screen, Set its display to none
        if ($("#ri-page").css('display') == "block") {
          $("#ri-page").css('display', 'none');
        }

        if ($("#rsvp-page").css('display') == "block") {
          $("#rsvp-page").css('display', 'none');

        }

        if ($("#contact-page").css('display') == "block") {
          $("#contact-page").css('display', 'none');

        }

        if ($("#gallery-container").css('display') == "block") {
          $("#gallery-container").css('display', 'none');
        }

        clearInterval(interval99);
      }, 500);

    } else {
      // If About is pressed when the Current Page is the About Page
      if ($("#about-pages-container").css('display') == "block") {

        // If About 2 is opened return to About 1
        if ($("#about-page-2").css("left") == "0px") {
          $("#about-page-2").animate({
            left: '-100%'
          }, 500);

          $("#about-page-1").animate({
            left: '0%'
          }, 500);
        }
      } else { // The Current Page is the Home Page

        // Sets up About Page for Animation
        $("#about-page-1").css("top", "-100%");
        $("#about-page-1").css("left", "0%");

        $("#black-screen").css('display', 'initial'); // Fades the Screen 
        $("#about-page-1").css("top", "-100%"); // Repeating
        $("#about-pages-container").css('display', 'initial');

        // The Animation
        $("#about-page-1").animate({
          top: '0%'
        }, 500);

        // Items checked off when About Page is in View
        $(".header-menu").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $(".icon").css("pointer-events", "none");
        $("#icon7").css("pointer-events", "visible");
        $("#scene").parallax('disable'); // Switches off the Parallax
      }
    }
  });

  // I am Retard Option Selected
  $("#skip-game").click(function () {
    $("#about-page-1").animate({
      left: '100%'
    }, 500);
    $("#about-page-2").animate({
      left: '0%'
    }, 500);
  });


  // When Gallery is Pressed in the Naviagation Menu
  $("#menu-item-2").click(function () {
    $("#container-multiple").css("pointer-events", "visible"); //The Other Container, apart from Hompage, becomes interactable

    //loadercounter checks if its the first encounter with Page, to load the images
    if (loadercounter == 0) {
      $.preloadImages("assets/images/bigpic1.png", "assets/images/bigpic2.png",
        "assets/images/bigpic3.png", "assets/images/bigpic4.png", "assets/images/bigpic5.png",
        "assets/images/bigpic6.png", "assets/images/bigpic7.png", "assets/images/bigpic8.png",
        "assets/images/bigpic9.png", "assets/images/bigpic10.png", "assets/images/bigpic11.png",
        "assets/images/bigpic12.png", "assets/images/picture1.png", "assets/images/picture2.png", "assets/images/picture3.png", "assets/images/picture4.png", "assets/images/picture5.png", "assets/images/picture6.png",
        "assets/images/picture7.png", "assets/images/picture8.png", "assets/images/picture9.png", "assets/images/picture10.png", "assets/images/picture11.png", "assets/images/picture12.png");
      loadercounter++;
    }
    gallery_slide = 1;

    //If the zoom-wrapper Window was opened, in a prior interaction, close up and setup page fresh
    if ($("#gallery-pictures").css('opacity') == 0) {
      $("#zoom-wrapper").css("display", "none");
      $('.zoom-image').attr("scr", "");
      $("#black-screen").css('display', 'none');
      $("#gallery-pictures").css('opacity', '1.0');
    };

    //The Images in the directional arrows
    $('.thumbnail-img-1').attr("scr", "assets/images/thumb7.png");
    $('.thumbnail-img-2').attr("scr", "assets/images/thumb1.png");

    //zoom-wrappered Images
    galleryarray2 = new Array("assets/images/bigpic1.png", "assets/images/bigpic2.png",
      "assets/images/bigpic3.png", "assets/images/bigpic4.png", "assets/images/bigpic5.png",
      "assets/images/bigpic6.png"
    );

    //Default Images
    galleryarray1 = new Array("assets/images/thumb1.png", "assets/images/thumb2.png",
      "assets/images/thumb3.png", "assets/images/thumb4.png", "assets/images/thumb5.png",
      "assets/images/thumb6.png"
    );

    $("#gallery-container").css('display', 'none'); //HIde Initially, only show when everything is setup
    $("#scene").parallax('disable');

    //Appends the Pre-loaded default Images and their respective black backgrounds
    $('#image-1').attr("src", "assets/images/picture1.png");
    $('#image-2').attr("src", "assets/images/picture2.png");
    $('#image-3').attr("src", "assets/images/picture3.png");
    $('#image-4').attr("src", "assets/images/picture4.png");
    $('#image-5').attr("src", "assets/images/picture5.png");
    $('#image-6').attr("src", "assets/images/picture6.png");
    $('#fade-img-1').attr("src", "assets/images/blackpic.png");
    $('#fade-img-2').attr("src", "assets/images/blackpic.png");
    $('#fade-img-3').attr("src", "assets/images/blackpic.png");
    $('#fade-img-4').attr("src", "assets/images/blackpic.png");
    $('#fade-img-5').attr("src", "assets/images/blackpic.png");
    $('#fade-img-6').attr("src", "assets/images/blackpic.png");

    if ($(window).width() > 1920) {
      d = 1920 * .50 * .333333333;
    } else {
      d = $(window).width() * .50 * .333333333;
    }

    function canvas_setup(canvas_id) {
      let c = document.getElementById(canvas_id);
      c.height = d;
      c.width = d;

      let ctx1 = c.getContext("2d");
      ctx1.webkitImageSmoothingEnabled = true;
      ctx1.mozImageSmoothingEnabled = true;

      let imageObj = new Image();
      imageObj.onload = function () {
        ctx1.drawImage(imageObj, 0, 0, d, d);
      };
      imageObj.src = 'assets/images/picicon.png';
    }

    canvas_setup("canvas-1");
    canvas_setup("canvas-2");
    canvas_setup("canvas-3");
    canvas_setup("canvas-4");
    canvas_setup("canvas-5");
    canvas_setup("canvas-6");

    //The Canvas setup Ends

    canvas_loaded = 1;
    $("#gallery-container").css("left", "0%");

    //The Transitions start depending on the page user was on

    if ($("#rsvp-page").css('display') == "block") {
      $("#gallery-container").css("left", "-100%");
      $("#rsvp-page").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#contact-page").css('display') == "block") {
      $("#gallery-container").css("left", "-100%");
      $("#contact-page").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#ri-page").css('display') == "block") {
      $("#gallery-container").css("left", "-100%");
      $("#ri-page").animate({
        left: '100%'
      }, 500, "linear");
    }

    //Both About Pages transition
    if ($("#about-pages-container").css('display') == "block") {
      $("#gallery-container").css("left", "-100%");
      if ($("#about-page-1").css("left") == "0px") {
        $("#about-page-1").animate({
          left: '100%'
        }, 500, "linear");
      } else {
        $("#about-page-2").animate({
          left: '100%'
        }, 500, "linear");
      }
    }

    //Hides the Page Transitioned from, after animation
    setTimeout(function () {
      $("#black-screen").css('display', 'none');
      if ($("#about-pages-container").css('display') == "block") {
        $("#about-pages-container").css('display', 'none');
      }
      if ($("#rsvp-page").css('display') == "block") {
        $("#rsvp-page").css('display', 'none');
      }
      if ($("#contact-page").css('display') == "block") {
        $("#contact-page").css('display', 'none');
      }
      if ($("#ri-page").css('display') == "block") {
        $("#contact-page").css('display', 'none');
      }
    }, 500);

    //After a minute interval, starts the gallery slide animation and checks of other features. Yes but the interval is fine here, because it repeatedly checks whether the images have loaded :)

    let interval_loading = setInterval(function () {
      if (loader == 24) {
        $("#gallery-container").css('display', 'block');
        $("#gallery-container").animate({
          left: '0%'
        }, 500, "linear");
        $("#container-multiple").css("pointer-events", "none");
        $(".icon").css("pointer-events", "none");
        $("#icon7").css("pointer-events", "visible");

        clearInterval(interval_loading);
      }
    }, 50);
  });

  //When the cursor is on Image, Shows the black screen and changes cursor to pointer when over icon
  //Its not working, cross-origin error probably because not working on server
  let offset;
  let y;
  let z;
  let img_data;
  $(".canvas-search").mousemove(function (e) {
    $(this).css('opacity', '1');
    offset = $(this).offset();
    y = e.pageX - offset.left;
    z = e.pageY - offset.top;
    $(this).parent().children(".fade-img").css('opacity', '1');
    if (canvas_loaded == 1) {
      img_data = ctx1.getImageData(y, z, 1, 1).data;
      if (img_data[3] != 0) {
        $(this).css('cursor', 'pointer');
      } else {
        $(this).css('cursor', 'auto');
      }
    }
  });


  $(".canvas-search").mouseout(function (e) {
    $(this).parent().children(".fade-img").css('opacity', '0');
    $(this).css('opacity', '0');
  });


  //Opens the zoom-wrappered Picture, since cursor not becoming pointer (cross-origin error), temp the check is off
  $(".canvas-search").click(function (e) {
    if ($(this).css('cursor') == "auto") {
      $("#black-screen").css('display', 'block');
      $(".header-menu").css('z-index', 100);
      $("#icon7").css('z-index', 100);

      $("#gallery-pictures").css('opacity', '0');
      $('#close-arrow').attr("src", "assets/images/close.png");

      if ($(this).attr('id') == "canvas-1") {
        $('#zoom-image').attr("src", galleryarray2[0]);
        $('#thumbnail-img-1').attr("src", galleryarray1[1]);
        $('#thumbnail-img-2').attr("src", galleryarray1[0]);
        picture_position = 1;
      }

      if ($(this).attr('id') == "canvas-2") {
        $('#zoom-image').attr("src", galleryarray2[1]);
        picture_position = 2;
        $('#thumbnail-img-1').attr("src", galleryarray1[2]);
        $('#thumbnail-img-2').attr("src", galleryarray1[0]);
      }

      if ($(this).attr('id') == "canvas-3") {
        $('#zoom-image').attr("src", galleryarray2[2]);
        picture_position = 3;
        $('#thumbnail-img-1').attr("src", galleryarray1[3]);
        $('#thumbnail-img-2').attr("src", galleryarray1[1]);
      }

      if ($(this).attr('id') == "canvas-4") {
        $('#zoom-image').attr("src", galleryarray2[3]);
        picture_position = 4;
        $('#thumbnail-img-1').attr("src", galleryarray1[4]);
        $('#thumbnail-img-2').attr("src", galleryarray1[2]);
      }

      if ($(this).attr('id') == "canvas-5") {
        $('#zoom-image').attr("src", galleryarray2[4]);
        picture_position = 5;
        $('#thumbnail-img-1').attr("src", galleryarray1[5]);
        $('#thumbnail-img-2').attr("src", galleryarray1[3]);
      }

      if ($(this).attr('id') == "canvas-6") {
        $('#zoom-image').attr("src", galleryarray2[5]);
        picture_position = 6;
        $('#thumbnail-img-1').attr("src", galleryarray1[5]);
        $('#thumbnail-img-2').attr("src", galleryarray1[4]);
      }

      $("#zoom-wrapper").css("display", "initial");
    }
  });

  // Closes zoom-wrapper Picture
  $("#close-arrow").click(function (e) {
    $("#zoom-wrapper").css("display", "none");
    $('#zoom-image').attr("src", "");
    $("#black-screen").css('display', 'none');
    $("#gallery-pictures").css('opacity', '1.0');
    if (gallery_slide == 1) {
      $('#thumbnail-img-1').attr("src", "assets/images/thumb7.png");
      $('#thumbnail-img-2').attr("src", "assets/images/thumb1.png");

    }
    if (gallery_slide == 2) {
      $('#thumbnail-img-1').attr("src", "assets/images/thumb7.png");
      $('#thumbnail-img-2').attr("src", "assets/images/thumb1.png");
    }
  });

  //When Request Invitation is selected
  $("#menu-item-4").click(function () {

    //Coming from any page other than Homepage
    if ($("#about-pages-container").css('display') == "block" || $("#rsvp-page").css('display') == "block" || $("#contact-page").css('display') == "block" ||
      $("#gallery-container").css('display') == "block") {

      $("#container-multiple").css("pointer-events", "visible"); //Make the Parent Container Interactive

      //Coming from About Page 1 or 2, trigger the page's animation
      if ($("#about-pages-container").css('display') == "block") {
        if ($("#about-page-1").css("left") == "0px") {
          $("#about-page-1").animate({
            left: '-100%'
          }, 500, "linear");
        } else {
          $("#about-page-2").animate({
            left: '-100%'
          }, 500, "linear");
        }
      }

      //If coming from gallery, trigger the page's animation
      if ($("#gallery-container").css('display') == "block") {
        $("#gallery-container").animate({
          left: '-150%'
        }, 500, "linear");
      }

      //If coming from RSVP Page (RI is RSVP!), trigger the page's animation
      if ($("#rsvp-page").css('display') == "block") {
        $("#rsvp-page").animate({
          left: '100%'
        }, 500, "linear");
      }

      //If coming from Contact Page, trigger the page's animation
      if ($("#contact-page").css('display') == "block") {
        $("#contact-page").animate({
          left: '100%'
        }, 500, "linear");
      }

      //Setup Request Invitation Page, if coming from About Pages or Gallery
      if ($("#about-pages-container").css('display') == "block" || $("#gallery-container").css('display') == "block") {
        $("#ri-page").css("left", "100%");
      }

      //Setup Request Invitation Page, if coming from Contact or RSVP Page
      if ($("#contact-page").css('display') == "block" || $("#rsvp-page").css('display') == "block") {
        $("#ri-page").css("left", "-100%");
      }

      //Request Animation Page Animation
      $("#ri-page").css('display', 'initial');
      $("#ri-page").animate({
        left: '0%'
      }, 500, "linear");

      //After the transition is complete, Request Invitation page is in-view, check of the remaining events
      var interval101 = setInterval(function () {
        $("#black-screen").css('display', 'block');
        $(".header-menu").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $("#container-multiple").css("pointer-events", "none");

        if ($("#about-pages-container").css('display') == "block") {
          $("#about-pages-container").css('display', 'none');
        }
        if ($("#rsvp-page").css('display') == "block") {
          $("#rsvp-page").css('display', 'none');

        }
        if ($("#contact-page").css('display') == "block") {
          $("#contact-page").css('display', 'none');
        }
        if ($("#gallery-container").css('display') == "block") {
          $("#gallery-container").css('display', 'none');
        }

        clearInterval(interval101);
      }, 500);

    } else {
      $("#ri-page").css("left", "0%");
      $("#black-screen").css('display', 'initial');
      $("#ri-page").css('display', 'initial');
      $("#scene").parallax('disable');
      $(".header-menu").css('z-index', 100);
      $("#icon7").css('z-index', 100);
      $(".icon").css("pointer-events", "none");
      $("#icon7").css("pointer-events", "visible");
    }
  });

  //When RSVP page is selected, the code is similar to when Request Invitation is pressed
  $("#menu-item-5").click(function () {
    if ($("#about-pages-container").css('display') == "block" || $("#ri-page").css('display') == "block" || $("#contact-page").css('display') == "block" ||
      $("#gallery-container").css('display') == "block") {

      $("#container-multiple").css("pointer-events", "visible");

      if ($("#about-pages-container").css('display') == "block") {

        if ($("#about-page-1").css("left") == "0px") {
          $("#about-page-1").animate({
            left: '-100%'
          }, 500, "linear");
        } else {
          $("#about-page-2").animate({
            left: '-100%'
          }, 500, "linear");
        }
      }

      if ($("#ri-page").css('display') == "block") {
        $("#ri-page").animate({
          left: '-100%'
        }, 500, "linear");
      }

      if ($("#gallery-container").css('display') == "block") {
        $("#gallery-container").animate({
          left: '-150%'
        }, 500, "linear");
      }

      if ($("#contact-page").css('display') == "block") {
        $("#contact-page").animate({
          left: '100%'
        }, 500, "linear");
      }

      if ($("#about-pages-container").css('display') == "block" || $("#ri-page").css('display') == "block" || $("#gallery-container").css('display') == "block") {
        $("#rsvp-page").css("left", "100%");
      }

      if ($("#contact-page").css('display') == "block") {
        $("#rsvp-page").css("left", "-100%");
      }

      $("#rsvp-page").css('display', 'initial');
      $("#rsvp-page").animate({
        left: '0%'
      }, 500, "linear");


      var interval102 = setInterval(function () {
        $("#black-screen").css('display', 'block');
        $(".header-menu").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $("#container-multiple").css("pointer-events", "none");
        if ($("#about-pages-container").css('display') == "block") {
          $("#about-pages-container").css('display', 'none');
        }
        if ($("#ri-page").css('display') == "block") {
          $("#ri-page").css('display', 'none');

        }
        if ($("#contact-page").css('display') == "block") {
          $("#contact-page").css('display', 'none');
        }
        if ($("#gallery-container").css('display') == "block") {
          $("#gallery-container").css('display', 'none');
        }
        clearInterval(interval102);
      }, 500);
    } else {
      $("#rsvp-page").css("left", "0%");
      $("#black-screen").css('display', 'initial');
      $("#rsvp-page").css('display', 'initial');
      $("#scene").parallax('disable');
      $(".header-menu").css('z-index', 100);
      $("#icon7").css('z-index', 100);
      $(".icon").css("pointer-events", "none");
      $("#icon7").css("pointer-events", "visible");
    }
  });

  //When Contact is selected in Header, code is similar to RI and RSVP Selection
  $("#menu-item-6").click(function () {

    if ($("#about-pages-container").css('display') == "block" || $("#ri-page").css('display') == "block" || $("#rsvp-page").css('display') == "block" ||
      $("#gallery-container").css('display') == "block") {
      $("#container-multiple").css("pointer-events", "visible");

      if ($("#about-pages-container").css('display') == "block") {
        if ($("#about-page-1").css("left") == "0px") {
          $("#about-page-1").animate({
            left: '-100%'
          }, 500, "linear");
        } else {
          $("#about-page-2").animate({
            left: '-100%'
          }, 500, "linear");
        }
      }

      if ($("#ri-page").css('display') == "block") {
        $("#ri-page").animate({
          left: '-100%'
        }, 500, "linear");
      }

      if ($("#gallery-container").css('display') == "block") {
        $("#gallery-container").animate({
          left: '-150%'
        }, 500, "linear");
      }

      if ($("#rsvp-page").css('display') == "block") {
        $("#rsvp-page").animate({
          left: '-100%'
        }, 500, "linear");
      }

      $("#contact-page").css('display', 'initial');
      $("#contact-page").css("left", "100%");

      $("#contact-page").animate({
        left: '0%'
      }, 500, "linear");

      var interval103 = setInterval(function () {
        $("#black-screen").css('display', 'block');
        $(".header-menu").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $("#container-multiple").css("pointer-events", "none");
        if ($("#about-pages-container").css('display') == "block") {
          $("#about-pages-container").css('display', 'none');
        }
        if ($("#ri-page").css('display') == "block") {
          $("#ri-page").css('display', 'none');
        }
        if ($("#rsvp-page").css('display') == "block") {
          $("#rsvp-page").css('display', 'none');
        }
        if ($("#gallery-container").css('display') == "block") {
          $("#gallery-container").css('display', 'none');
        }

        clearInterval(interval103);
      }, 500);
    } else {

      $("#contact-page").css("left", "0%");
      $("#black-screen").css('display', 'block');
      $("#contact-page").css('display', 'block');
      $("#scene").parallax('disable');
      $(".header-menu").css('z-index', 100);
      $("#icon7").css('z-index', 100);
      $(".icon").css("pointer-events", "none");
      $("#icon7").css("pointer-events", "visible");
    }
  });

  //When Homepage is selected in Header
  $("#menu-item-1").click(function () {

    $("#black-screen").css('display', 'none');
    $("#scene").parallax('enable');

    $("#container-multiple").css("pointer-events", "visible");
    $(".icon").css("pointer-events", "visible");

    //Animations of Page you are coming from, with condition check 

    if ($("#about-pages-container").css('display') == "block") {
      if ($("#about-page-1").css("left") == "0px") {
        $("#about-page-1").animate({
          left: '100%'
        }, 500, "linear");
      } else {
        $("#about-page-2").animate({
          left: '100%'
        }, 500, "linear");
      }
    }

    if ($("#ri-page").css('display') == "block") {
      $("#ri-page").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#rsvp-page").css('display') == "block") {
      $("#rsvp-page").animate({
        left: '100%'
      }, 500, "linear");
    }


    if ($("#contact-page").css('display') == "block") {
      $("#contact-page").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#gallery-container").css('display') == "block") {
      $("#gallery-container").animate({
        left: '100%'
      }, 500, "linear");
    }

    // Events Check off after Homepage is in View
    var interval1000 = setInterval(function () {
      $("#container-multiple").css("pointer-events", "none");
      if ($("#about-pages-container").css('display') == "block") {
        $("#about-pages-container").css('display', 'none');
      }
      if ($("#ri-page").css('display') == "block") {
        $("#ri-page").css('display', 'none');
      }
      if ($("#rsvp-page").css('display') == "block") {
        $("#rsvp-page").css('display', 'none');
      }
      if ($("#gallery-container").css('display') == "block") {
        $("#gallery-container").css('display', 'none');
      }
      if ($("#contact-page").css('display') == "block") {
        $("#contact-page").css('display', 'none');
      }
      clearInterval(interval1000);
    }, 500);
  });

  //The Game Code
  let game_is_interactive = false
  let is_first_tile = true;
  let tiles_matched = 0

  //Tile Container is clicked, the game starts
  $(".tile-container").click(function () {

    $(".tile-container").unbind("click"); // The Game has started, now it becomes un-clickable
    game_is_interactive = true;

    //Show the complete board
    $(".tile").css({
      'transform': 'rotateY(-180deg)  '
    });
    $(".hidden-pic").css({
      'transform': 'rotateY(0deg)  '
    });

    //Hide the Board
    setTimeout(function () {
      $(".tile").css({
        'transform': 'rotateY(0deg)  '
      });
      $(".hidden-pic").css({
        'transform': 'rotateY(180deg)  '
      });
    }, 4000);
  });

  //The game has started now and a tile is selected
  $(".tile").click(function () {

    if (game_is_interactive) {
      //First Tile Try
      if (is_first_tile) {

        $(this).css({
          'transform': 'rotateY(-180deg)  '
        });
        $(this).parent().children(".hidden-pic").css({
          'transform': 'rotateY(0deg)  '
        });

        //Save the First Tile State
        image_source = $(this).parent().children(".hidden-pic").attr('src');
        previous_tile = $(this);

        is_first_tile = false;
      } else {
        //Second Tile Try 

        //There is a match
        if ($(this).parent().children(".hidden-pic").attr('src') == image_source) {

          $(this).css({
            'transform': 'rotateY(-180deg)  '
          });
          $(this).parent().children(".hidden-pic").css({
            'transform': 'rotateY(0deg)  '
          });

          //Play the random cheer sound
          setTimeout(function () {

            if (tiles_matched != 8) {
              var randomnumber2 = Math.floor((Math.random() * 5));
              document.getElementById(cheerarray[randomnumber2]).play();
            }

          }, 1000);



          //Check if game is over
          tiles_matched++;
          if (tiles_matched == 8) {
            document.getElementById("winner").play();
            setTimeout(function () {

              $("#about-page-1").animate({
                left: '100%'
              }, 500);
              $("#about-page-2").animate({
                left: '0%'
              }, 500);

            }, 2500);
          }

          is_first_tile = true;
        } else {
          //There was no match

          //Show the Tile
          $(this).css({
            'transform': 'rotateY(-180deg)  '
          });
          $(this).parent().children(".hidden-pic").css({
            'transform': 'rotateY(0deg)  '
          });

          current_tile = $(this);
          is_first_tile = true;

          $(".tile").css("pointer-events", "none"); //Make all tiles Unclickable for now

          //Reverse the tiles
          setTimeout(function () {

            let randomnumber = Math.floor((Math.random() * 3));
            document.getElementById(booarray[randomnumber]).play();
            current_tile.css({
              'transform': 'rotateY(0deg)  '
            });
            current_tile.parent().children(".hidden-pic").css({
              'transform': 'rotateY(-180deg)  '
            });

            previous_tile.css({
              'transform': 'rotateY(0deg)  '
            });
            previous_tile.parent().children(".hidden-pic").css({
              'transform': 'rotateY(-180deg)  '
            });

            //Make all tiles clickable again
            setTimeout(function () {

              $(".tile").css("pointer-events", "visible");


            }, 500);

          }, 1000);
        }
      }
    }

  });

  $(".icon").mouseover(
    function () {
      $(this).children(".hidden-image").fadeTo(300, 1);

      $(this).children(".shown-image").fadeTo(300, 0);
    });

  $(".icon").mouseout(
    function () {
      $(this).children(".shown-image").fadeTo(300, 1);
      $(this).children(".hidden-image").fadeTo(300, 0);
    });

  var audioplayer = $("#audio1")[0];
  $("#icon-7").click(function () {
    if (audioplayer.paused) {
      audioplayer.play();
      $("#music-hidden-image").attr("src", "assets/images/musichover.png");
      $("#music-shown-image").attr("src", "assets/images/music.png")
    } else {
      audioplayer.pause();
      $("#music-hidden-image").attr("src", "assets/images/musicoffhover.png");
      $("#music-shown-image").attr("src", "assets/images/musicoff.png");
    }
  });

  //Gallery Code
  var interval100;

  $("#directional-next").mouseover(
    function () {
      $(this).animate({
        left: '87%'
      }, 250, "linear");
    });

  $("#directional-next").mouseleave(
    function () {
      $(this).animate({
        left: '93.3%'
      }, 250, "linear");
    });

  $("#directional-back").mouseover(
    function () {
      $(this).animate({
        left: '0%'
      }, 250, "linear");
    });


  $("#directional-back").mouseleave(
    function () {
      $(this).animate({
        left: '-6.3%'
      }, 250, "linear");
    });


  $("#directional-next").click(
    function () {
      if ($("#zoom-wrapper").css('display') == "block") {

        if (picture_position == 6) {} else {

          $('#zoom-image').attr("src", "");
          $('#zoom-image').attr("src", galleryarray2[picture_position]);
          if (picture_position == 5) {} else {
            $('#thumbnail-img-1').attr("src", galleryarray1[picture_position + 1]);
          }
          $('#thumbnail-img-2').attr("src", galleryarray1[picture_position - 1]);
          picture_position++;

        }
      } else {
        if (gallery_slide == 1) {

          $("#gallery-pictures").css("visibility", "hidden");
          $('#image-1').attr("src", "assets/images/picture7.png");
          $('#image-2').attr("src", "assets/images/picture8.png");
          $('#image-3').attr("src", "assets/images/picture9.png");
          $('#image-4').attr("src", "assets/images/picture10.png");
          $('#image-5').attr("src", "assets/images/picture11.png");
          $('#image-6').attr("src", "assets/images/picture12.png");

          galleryarray1 = new Array("assets/images/thumb7.png", "assets/images/thumb8.png",
            "assets/images/thumb9.png", "assets/images/thumb10.png", "assets/images/thumb11.png",
            "assets/images/thumb12.png"
          );
          galleryarray2 = new Array("assets/images/bigpic7.png", "assets/images/bigpic8.png",
            "assets/images/bigpic9.png", "assets/images/bigpic10.png", "assets/images/bigpic11.png",
            "assets/images/bigpic12.png"
          );

          setTimeout(function () {
            $("#gallery-pictures").css("visibility", "visible");
          }, 200);

          gallery_slide++;
          if (gallery_slide == 1) {
            $('#thumbnail-img-1').attr("src", "assets/images/thumb7.png");
            $('#thumbnail-img-2').attr("src", "assets/images/thumb1.png");
          }
          if (gallery_slide == 2) {
            $('#thumbnail-img-1').attr("src", "assets/images/thumb7.png");
            $('#thumbnail-img-2').attr("src", "assets/images/thumb1.png");
          }
        }
      }
    });

  $("#directional-back").click(
    function () {

      if ($("#zoom-wrapper").css('display') == "block") {
        if (picture_position == 1) {} else {
          $('#zoom-image').attr("src", "");
          $('#zoom-image').attr("src", galleryarray2[picture_position - 2]);
          $('#thumbnail-img-1').attr("src", galleryarray1[picture_position - 1]);
          if (picture_position == 2) {} else {
            $('#thumbnail-img-2').attr("src", galleryarray1[picture_position - 3]);
          }
          picture_position--;
        }
      } else {
        if (gallery_slide == 2) {
          $("#gallery-pictures").css("visibility", "hidden");
          $('#image-1').attr("src", "assets/images/picture1.png");
          $('#image-2').attr("src", "assets/images/picture2.png");
          $('#image-3').attr("src", "assets/images/picture3.png");
          $('#image-4').attr("src", "assets/images/picture4.png");
          $('#image-5').attr("src", "assets/images/picture5.png");
          $('#image-6').attr("src", "assets/images/picture6.png");

          galleryarray1 = new Array("assets/images/thumb1.png", "assets/images/thumb2.png",
            "assets/images/thumb3.png", "assets/images/thumb4.png", "assets/images/thumb5.png",
            "assets/images/thumb6.png"
          );
          galleryarray2 = new Array("assets/images/bigpic1.png", "assets/images/bigpic2.png",
            "assets/images/bigpic3.png", "assets/images/bigpic4.png", "assets/images/bigpic5.png",
            "assets/images/bigpic6.png"
          );

          setTimeout(function () {
            $("#gallery-pictures").css("visibility", "visible");
          }, 200);

          gallery_slide--;
          if (gallery_slide == 1) {
            $('#thumbnail-img-1').attr("src", "assets/images/thumb7.png");
            $('#thumbnail-img-2').attr("src", "assets/images/thumb1.png");
          }
          if (gallery_slide == 2) {
            $('#thumbnail-img-1').attr("src", "assets/images/thumb7.png");
            $('#thumbnail-img-2').attr("src", "assets/images/thumb1.png");
          }
        }
      }
    });

  $('form').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  });

  //Debug Code

  let carousel_pos = 0;
  let marker_down = 0
  let marker_dis = 0;
  let swing_dur = 25;
  let window_width = $(window).width();
  let loop_element_first;
  let loop_element_last;
  let loop_element_first_offset;
  let loop_element_last_offset;
  let carousel_interval;
  //let first_card;
  //let last_card;

  function return_swing_duration(rate_of_change) {
    if (rate_of_change < 50) {
      return 25;
    } else {
      if (rate_of_change < 100) {
        return 50;
      } else {
        return 125;
      }
    }
  }

  function loop_algorithm() {
    let id;
    loop_element_first = $(".loop-first");
    loop_element_last = $(".loop-last");

    console.log(loop_element_first.offset());

    loop_element_first_offset = loop_element_first.offset().left;
    loop_element_last_offset = loop_element_last.offset().left;

    if (loop_element_first_offset > -50) {
      loop_element_last.css("left", "-=1610px"); //Relative

      loop_element_last.removeClass("loop-last");
      loop_element_first.removeClass("loop-first");

      id = loop_element_last.data("order");
      //Remove classes from both elements
      if (id == 1) {
        id = 7;
      } else {
        id--;
      }
      $("#card-" + id).addClass("loop-last"); //Compensate when the Value is 1
      loop_element_last.addClass("loop-first");
    }

    //The Other Way Round
    if (loop_element_first_offset < -275) {
      loop_element_first.css("left", "+=1610px"); //Relative

      id = loop_element_first.data("order");
      //Remove classes from both elements
      loop_element_last.removeClass("loop-last");
      loop_element_first.removeClass("loop-first");

      if (id == 7) {
        id = 1;
      } else {
        id++;
      }
      $("#card-" + id).addClass("loop-first"); //Compensate when the Value is 1
      loop_element_first.addClass("loop-last");
    }

  }

  $(".carousel").mousedown(function (e) {
    e.preventDefault();

    //first_card = $(".carousel div:first-child");
    //last_card = $(".carousel div:last-child").detach();

    //$(".carousel").prepend(last_card);
    //console.log(last_card.offset());

    marker_down = e.pageX;

    // The Mouse Move Function Fires, only when the mouse is kept pressed
    $(".carousel").mousemove(function (e) {

      rate_of_change = Math.abs((marker_down - e.pageX) - marker_dis);
      marker_dis = marker_down - e.pageX;

      swing_dur = return_swing_duration(rate_of_change);

      //console.log(rate_of_change);
      //console.log(swing_dur); 

      //I can change the carousel element with the card element and it can still work fine
      $(".carousel").animate({
        left: carousel_pos + (marker_dis) + 'px'
      }, swing_dur, "swing");

      carousel_interval = setInterval(function () {
        loop_algorithm();
      }, 25)

    });
  });

  // Turns off the firing of Mouse Move function when mouse is released
  $(document).mouseup(function (e) {
    $(".carousel").off("mousemove");
    carousel_pos += marker_dis
    clearInterval(carousel_interval);

  });
});