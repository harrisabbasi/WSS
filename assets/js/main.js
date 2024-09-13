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
function choosePic() {

  // Two arrays, for two sets of images
  var myPix = new Array("images/image1.png", "images/image2.png",
    "images/image3.png", "images/image4.png", "images/image5.png",
    "images/image6.png", "images/image7.png", "images/image8.png"
  );

  var myPix2 = new Array("images/image1.png", "images/image2.png",
    "images/image3.png", "images/image4.png", "images/image5.png",
    "images/image6.png", "images/image7.png", "images/image8.png"
  );

  var ids = new Array("test1", "test2", "test3", "test4", "test5", "test7", "test8",
    "test9", "test10", "test11", "test12", "test13", "test14", "test15", "test16", "test6"
  );

  // The ids array gets a picture assigned, and than is spliced, until all its values (ids) have picture assigned
  for (var i = 0; i < 8; i++) {
    var randomNum = Math.floor((Math.random() * myPix.length));
    var randomNum2 = Math.floor((Math.random() * ids.length));
    document.getElementById(ids[randomNum2]).src = myPix[randomNum];
    myPix.splice(randomNum, 1);
    ids.splice(randomNum2, 1);
  }
  for (var i = 0; i < 8; i++) {
    var randomNum = Math.floor((Math.random() * myPix2.length));
    var randomNum2 = Math.floor((Math.random() * ids.length));
    document.getElementById(ids[randomNum2]).src = myPix2[randomNum];
    myPix2.splice(randomNum, 1);
    ids.splice(randomNum2, 1);
  }

}

var check = 0;
var x = 0;
var a = 0;
var y = 0;
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
var checked;
var mult = 1;
var mult2 = 1;
var marleft;
var check2 = 0;
var gallerycheck;
var gallerycheck2 = 1;
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
  $("#menu2").click(function () {
    if (aboutcheck == 0) {
      choosePic();
      aboutcheck++;
    }

    // If About is Pressed when the Current Page is Any Page Other Than Homepage or the About Page
    if ($("#rsvp").css('display') == "block" || $("#ri").css('display') == "block" || $("#contact1").css('display') == "block" ||
      $("#gallery1").css('display') == "block") {

      $("#bigcontainer").css("pointer-events", "visible"); // The Container of All Pages apart Homepage becomes interactable

      // Animates the Current Page out of View

      if ($("#ri").css('display') == "block") {
        $("#ri").animate({
          left: '100%'
        }, 500, "linear");
      }

      if ($("#gallery1").css('display') == "block") {
        $("#gallery1").animate({
          left: '-150%'
        }, 500, "linear");
      }

      if ($("#rsvp").css('display') == "block") {
        $("#rsvp").animate({
          left: '100%'
        }, 500, "linear");
      }

      if ($("#contact1").css('display') == "block") {
        $("#contact1").animate({
          left: '100%'
        }, 500, "linear");
      }

      // Repetitive, but sets up About 1 to be animated from top
      if ($("#rsvp").css('display') == "block" || $("#ri").css('display') == "block" || $("#contact1").css('display') == "block" ||
        $("#gallery1").css('display') == "block") {
        $("#about1").css("top", "-100%");
        $("#about1").css("left", "0%");
      }

      $("#container2").css('display', 'initial');

      // Top Down Animation of About 1
      $("#about1").animate({
        top: '0%'
      }, 500, "linear");

      // Can be replaced with Timeout, checks off the items left when About Page has come into View
      var interval99 = setInterval(function () {
        $("#blackout").css('display', 'block'); //Fades the Screen
        $(".nav-top").css('z-index', 100); //Keeps the Header Menu above the Fade or Visible
        $("#icon7").css('z-index', 100); // Keeps the Music Icon Above the Fade or Visible
        $("#bigcontainer").css("pointer-events", "none"); //The Home Page Becomes Unclickable or Interactable

        // Since the Previous Page has Safely Animated off Screen, Set its display to none
        if ($("#rsvp").css('display') == "block") {
          $("#rsvp").css('display', 'none');
        }

        if ($("#ri").css('display') == "block") {
          $("#ri").css('display', 'none');

        }

        if ($("#contact1").css('display') == "block") {
          $("#contact1").css('display', 'none');

        }

        if ($("#gallery1").css('display') == "block") {
          $("#gallery1").css('display', 'none');
        }

        clearInterval(interval99);
      }, 500);

    } else {
      // If About is pressed when the Current Page is the About Page
      if ($("#container2").css('display') == "block") {

        // If About 2 is opened return to About 1
        if ($("#about2").css("left") == "0px") {
          $("#about2").animate({
            left: '-100%'
          }, 500);

          $("#about1").animate({
            left: '0%'
          }, 500);
        }
      } else { // The Current Page is the Home Page

        // Sets up About Page for Animation
        $("#about1").css("top", "-100%");
        $("#about1").css("left", "0%");

        $("#blackout").css('display', 'initial'); // Fades the Screen 
        $("#about1").css("top", "-100%"); // Repeating
        $("#container2").css('display', 'initial');

        // The Animation
        $("#about1").animate({
          top: '0%'
        }, 500);

        // Items Checked off when About Page is in View
        $(".nav-top").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $(".icon").css("pointer-events", "none");
        $("#icon7").css("pointer-events", "visible");
        $("#scene").parallax('disable'); // Switches off the Parallax
      }
    }
  });

  // I am Retard Option Selected
  $("#pic2").click(function () {
    $("#about1").animate({
      left: '100%'
    }, 500);
    $("#about2").animate({
      left: '0%'
    }, 500);
  });

  // The About-2 Page Scroll Animation

  //x=$(window).width()/2;
  x = 0;
  p = $("#box1");
  m = $("#box1");
  check = 0;

  if ($(window).width() > 1920) {
    marleft = 1920 * 4 * .005;
  } else {
    marleft = $(window).width() * 4 * .005;
  }
  marleft = marleft * 12;

  $("#gallery").mousedown(function (e) {

    offset1 = $(this).offset();
    a = e.pageX;
    e.preventDefault();

    // The Mouse Move Function Fires, only when the mouse is kept pressed
    $("#gallery").mousemove(function (event) {
      offset = p.offset(); //Box1 offset
      offset2 = m.offset(); //Box1 offset, why same?
      y = a - event.pageX; //Horizontal Displacement, from mouse pressed to current time
      x = x - y; //Horizontal Displacement, from last call of mousemove

      // The Animation to the whole box, need to make it smoother, and add a finihing effect on mouse release
      $(".box").stop().animate({
        left: x + 'px'
      }, 50, "swing");

      // This is for the infinite loop, keep this, the y variable is used for the direction of movement
      if (y < 0) {

        if ((offset1.left - offset.left) < 300) {

          if (check == 0) {
            var multiply = mult2 * -1 * (2640 + marleft);
            $("#box12,#box11,#box10").css('transform', "translateX(" + multiply + "px)");

            p = $("#box10");
            m = $("#box10");
            mult--;
            check2 = 3;
            check = 1;
          } else {
            if (check == 1) {
              var multiply1 = mult2 * -1 * (2640 + marleft);
              $("#box9,#box8,#box7").css('transform', "translateX(" + multiply1 + "px)");

              p = $("#box7");
              m = $("#box7");
              check2 = 2;
              check = 2;
            } else {
              if (check == 2) {
                var multiply1 = mult2 * -1 * (2640 + marleft);
                $("#box6,#box5,#box4").css('transform', "translateX(" + multiply1 + "px)");

                p = $("#box4");
                check = 3;
                m = $("#box4");
                check2 = 1;
              } else {
                var multiply1 = mult2 * -1 * (2640 + marleft);
                $("#box3,#box2,#box1").css('transform', "translateX(" + multiply1 + "px)");

                p = $("#box1");
                m = $("#box1");
                check = 0;
                check2 = 0;
                mult2++;
              }
            }
          }
        }
      }

      if (y > 0) {

        if ((offset1.left - offset2.left) > 800) {
          if (check2 == 0) {
            var multiply = mult * 1 * (2640 + marleft);
            $("#box1,#box2,#box3").css('transform', "translateX(" + multiply + "px)");

            m = $("#box4");
            p = $("#box4");
            check = 3;
            check2 = 1;
            mult2--;
          } else {
            if (check2 == 1) {
              var multiply1 = mult * 1 * (2640 + marleft);
              $("#box4,#box5,#box6").css('transform', "translateX(" + multiply1 + "px)");

              m = $("#box7");
              p = $("#box7");
              check = 2;
              check2 = 2;
            } else {
              if (check2 == 2) {
                var multiply1 = mult * 1 * (2640 + marleft);
                $("#box7,#box8,#box9").css('transform', "translateX(" + multiply1 + "px)");

                m = $("#box10");
                p = $("#box10");
                check = 1;
                check2 = 3;
              } else {
                var multiply1 = mult * 1 * (2640 + marleft);
                $("#box10,#box11,#box12").css('transform', "translateX(" + multiply1 + "px)");

                m = $("#box1");
                check2 = 0;
                p = $("#box1");
                check = 0;
                mult++;
              }
            }
          }
        }
      }
      a = event.pageX;
    });
  });

  // Turns off the firing of Mouse Move function when mouse is released
  $(document).mouseup(function (e) {
    $("#gallery").off("mousemove");
  });

  // When Gallery is Pressed in the Naviagation Menu
  $("#menu1").click(function () {
    $("#bigcontainer").css("pointer-events", "visible"); //The Other Container, apart from Hompage, becomes interactable

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
    gallerycheck2 = 1;

    //If the Zoom Window was opened, in a prior interaction, close up and setup page fresh
    if ($("#pictures").css('opacity') == 0) {
      $("#zoom").css("display", "none");
      document.getElementById('enlarge').src = "";
      $("#blackout").css('display', 'none');
      $("#pictures").css('opacity', '1.0');
    };

    //The Images in the directional arrows
    document.getElementById('nthumb2').src = "assets/images/thumb7.png";
    document.getElementById('pthumb2').src = "assets/images/thumb1.png";

    //Zoomed Images
    galleryarray2 = new Array("assets/images/bigpic1.png", "assets/images/bigpic2.png",
      "assets/images/bigpic3.png", "assets/images/bigpic4.png", "assets/images/bigpic5.png",
      "assets/images/bigpic6.png"
    );

    //Default Images
    galleryarray1 = new Array("assets/images/thumb1.png", "assets/images/thumb2.png",
      "assets/images/thumb3.png", "assets/images/thumb4.png", "assets/images/thumb5.png",
      "assets/images/thumb6.png"
    );

    $("#gallery1").css('display', 'none'); //HIde Initially, only show when everything is setup
    $("#scene").parallax('disable');

    //Appends the Pre-loaded default Images and their respective black backgrounds
    document.getElementById('load1').src = "assets/images/picture1.png";
    document.getElementById('load2').src = "assets/images/picture2.png";
    document.getElementById('load3').src = "assets/images/picture3.png";
    document.getElementById('load4').src = "assets/images/picture4.png";
    document.getElementById('load5').src = "assets/images/picture5.png";
    document.getElementById('load6').src = "assets/images/picture6.png";
    document.getElementById('black1').src = "assets/images/blackpic.png";
    document.getElementById('black2').src = "assets/images/blackpic.png";
    document.getElementById('black3').src = "assets/images/blackpic.png";
    document.getElementById('black4').src = "assets/images/blackpic.png";
    document.getElementById('black5').src = "assets/images/blackpic.png";
    document.getElementById('black6').src = "assets/images/blackpic.png";

    if ($(window).width() > 1920) {
      d = 1920 * .50 * .333333333;
    } else {
      d = $(window).width() * .50 * .333333333;
    }

    //All the Canvas's are setup, the zoom indicating icon, need to clean repetitive code
    c = document.getElementById("myCanvas1");
    c.height = d;
    c.width = d;

    ctx1 = c.getContext("2d");
    ctx1.webkitImageSmoothingEnabled = true;
    ctx1.mozImageSmoothingEnabled = true;

    imageObj = new Image();
    imageObj.onload = function () {
      ctx1.drawImage(imageObj, 0, 0, d, d);
    };
    $("#myCanvas1").css('opacity', '0');
    imageObj.src = 'assets/images/picicon.png';

    c = document.getElementById("myCanvas2");
    c.height = d;
    c.width = d;
    ctx2 = c.getContext("2d");
    ctx2.webkitImageSmoothingEnabled = true;
    ctx2.mozImageSmoothingEnabled = true;

    imageObj = new Image();
    imageObj.onload = function () {
      ctx2.drawImage(imageObj, 0, 0, d, d);
    };
    $("#myCanvas2").css('opacity', '0');
    imageObj.src = 'assets/images/picicon.png';

    c = document.getElementById("myCanvas3");
    c.height = d;
    c.width = d;
    ctx3 = c.getContext("2d");
    ctx3.webkitImageSmoothingEnabled = true;
    ctx3.mozImageSmoothingEnabled = true;

    imageObj = new Image();
    imageObj.onload = function () {
      ctx3.drawImage(imageObj, 0, 0, d, d);
    };

    $("#myCanvas3").css('opacity', '0');
    imageObj.src = 'assets/images/picicon.png';
    c = document.getElementById("myCanvas4");
    c.height = d;
    c.width = d;
    ctx4 = c.getContext("2d");
    ctx4.webkitImageSmoothingEnabled = true;
    ctx4.mozImageSmoothingEnabled = true;

    imageObj = new Image();
    imageObj.onload = function () {
      ctx4.drawImage(imageObj, 0, 0, d, d);
    };
    $("#myCanvas4").css('opacity', '0');
    imageObj.src = 'assets/images/picicon.png';

    c = document.getElementById("myCanvas5");
    c.height = d;
    c.width = d;
    ctx5 = c.getContext("2d");
    ctx5.webkitImageSmoothingEnabled = true;
    ctx5.mozImageSmoothingEnabled = true;

    imageObj = new Image();
    imageObj.onload = function () {
      ctx5.drawImage(imageObj, 0, 0, d, d);
    };
    $("#myCanvas5").css('opacity', '0');
    imageObj.src = 'assets/images/picicon.png';

    c = document.getElementById("myCanvas6");
    c.height = d;
    c.width = d;
    ctx6 = c.getContext("2d");
    ctx6.webkitImageSmoothingEnabled = true;
    ctx6.mozImageSmoothingEnabled = true;

    imageObj = new Image();
    imageObj.onload = function () {
      ctx6.drawImage(imageObj, 0, 0, d, d);
    };
    $("#myCanvas6").css('opacity', '0');
    imageObj.src = 'assets/images/picicon.png';

    //The Canvas setup Ends

    checked = 1;
    $("#gallery1").css("left", "0%");

    //The Transitions start depending on the page user was on

    if ($("#ri").css('display') == "block") {
      $("#gallery1").css("left", "-100%");
      $("#ri").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#contact1").css('display') == "block") {
      $("#gallery1").css("left", "-100%");
      $("#contact1").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#rsvp").css('display') == "block") {
      $("#gallery1").css("left", "-100%");
      $("#rsvp").animate({
        left: '100%'
      }, 500, "linear");
    }

    //Both About Pages transition
    if ($("#container2").css('display') == "block") {
      $("#gallery1").css("left", "-100%");
      if ($("#about1").css("left") == "0px") {
        $("#about1").animate({
          left: '100%'
        }, 500, "linear");
      } else {
        $("#about2").animate({
          left: '100%'
        }, 500, "linear");
      }
    }

    //Hides the Page Transitioned from, after animation
    var interval91 = setInterval(function () {
      $("#blackout").css('display', 'none');
      if ($("#container2").css('display') == "block") {
        $("#container2").css('display', 'none');
      }
      if ($("#ri").css('display') == "block") {
        $("#ri").css('display', 'none');
      }
      if ($("#contact1").css('display') == "block") {
        $("#contact1").css('display', 'none');
      }
      if ($("#rsvp").css('display') == "block") {
        $("#contact1").css('display', 'none');
      }

      clearInterval(interval91);
    }, 500);

    //After a minute interval, starts the gallery slide animation and checks of other features.
    var interval10 = setInterval(function () {
      if (loader == 24) {
        $("#gallery1").css('display', 'block');
        $("#gallery1").animate({
          left: '0%'
        }, 500, "linear");
        $("#bigcontainer").css("pointer-events", "none");
        $(".icon").css("pointer-events", "none");
        $("#icon7").css("pointer-events", "visible");

        clearInterval(interval10);
      }
    }, 20);
  });

  //When the cursor is on Image, Shows the black screen and changes cursor to pointer when over icon
  //Its not working, cross-origin error probably because not working on server
  $(".myCanvas").mousemove(function (e) {
    $(this).css('opacity', '1');
    var offset = $(this).offset();
    y = e.pageX - offset.left;
    z = e.pageY - offset.top;
    $(this).parent().children(".black").css('opacity', '1');
    if (checked == 1) {
      var imgd = ctx1.getImageData(y, z, 1, 1).data;
      if (imgd[3] != 0) {
        $(this).css('cursor', 'pointer');
      } else {
        $(this).css('cursor', 'auto');
      }
    }
  });


  $(".myCanvas").mouseout(function (e) {
    $(this).parent().children(".black").css('opacity', '0');
    $(this).css('opacity', '0');
  });


  //Opens the Zoomed Picture, since cursor not becoming pointer (cross-origin error), temp the check is off
  $(".myCanvas").click(function (e) {
    if ($(this).css('cursor') == "auto") {
      $("#blackout").css('display', 'block');
      $(".nav-top").css('z-index', 100);
      $("#icon7").css('z-index', 100);

      $("#pictures").css('opacity', '0');
      document.getElementById('close1').src = "assets/images/close.png";

      if ($(this).attr('id') == "myCanvas6") {
        document.getElementById('enlarge').src = galleryarray2[5];
        gallerycheck = 6;
        document.getElementById('nthumb2').src = galleryarray1[5];
        document.getElementById('pthumb2').src = galleryarray1[4];
      }

      if ($(this).attr('id') == "myCanvas3") {
        document.getElementById('enlarge').src = galleryarray2[2];
        gallerycheck = 3;
        document.getElementById('nthumb2').src = galleryarray1[3];
        document.getElementById('pthumb2').src = galleryarray1[1];
      }

      if ($(this).attr('id') == "myCanvas2") {
        document.getElementById('enlarge').src = galleryarray2[1];
        gallerycheck = 2;
        document.getElementById('nthumb2').src = galleryarray1[2];
        document.getElementById('pthumb2').src = galleryarray1[0];
      }

      if ($(this).attr('id') == "myCanvas1") {
        document.getElementById('enlarge').src = galleryarray2[0];
        document.getElementById('nthumb2').src = galleryarray1[1];
        document.getElementById('pthumb2').src = galleryarray1[0];
        gallerycheck = 1;
      }

      if ($(this).attr('id') == "myCanvas4") {
        document.getElementById('enlarge').src = galleryarray2[3];
        gallerycheck = 4;
        document.getElementById('nthumb2').src = galleryarray1[4];
        document.getElementById('pthumb2').src = galleryarray1[2];
      }

      if ($(this).attr('id') == "myCanvas5") {
        document.getElementById('enlarge').src = galleryarray2[4];
        gallerycheck = 5;
        document.getElementById('nthumb2').src = galleryarray1[5];
        document.getElementById('pthumb2').src = galleryarray1[3];
      }

      $("#zoom").css("display", "initial");
    }
  });

  // Closes Zoom Picture
  $("#close1").click(function (e) {
    $("#zoom").css("display", "none");
    document.getElementById('enlarge').src = "";
    $("#blackout").css('display', 'none');
    $("#pictures").css('opacity', '1.0');
    if (gallerycheck2 == 1) {
      document.getElementById('nthumb2').src = "assets/images/thumb7.png";
      document.getElementById('pthumb2').src = "assets/images/thumb1.png";

    }
    if (gallerycheck2 == 2) {
      document.getElementById('nthumb2').src = "assets/images/thumb7.png";
      document.getElementById('pthumb2').src = "assets/images/thumb1.png";
    }
  });

  //When Request Invitation is selected
  $("#menu3").click(function () {

    //Coming from any page other than Homepage
    if ($("#container2").css('display') == "block" || $("#ri").css('display') == "block" || $("#contact1").css('display') == "block" ||
      $("#gallery1").css('display') == "block") {

      $("#bigcontainer").css("pointer-events", "visible"); //Make the Parent Container Interactive

      //Coming from About Page 1 or 2, trigger the page's animation
      if ($("#container2").css('display') == "block") {
        if ($("#about1").css("left") == "0px") {
          $("#about1").animate({
            left: '-100%'
          }, 500, "linear");
        } else {
          $("#about2").animate({
            left: '-100%'
          }, 500, "linear");
        }
      }

      //If coming from gallery, trigger the page's animation
      if ($("#gallery1").css('display') == "block") {
        $("#gallery1").animate({
          left: '-150%'
        }, 500, "linear");
      }

      //If coming from RSVP Page (RI is RSVP!), trigger the page's animation
      if ($("#ri").css('display') == "block") {
        $("#ri").animate({
          left: '100%'
        }, 500, "linear");
      }

      //If coming from Contact Page, trigger the page's animation
      if ($("#contact1").css('display') == "block") {
        $("#contact1").animate({
          left: '100%'
        }, 500, "linear");
      }

      //Setup Request Invitation Page, if coming from About Pages or Gallery
      if ($("#container2").css('display') == "block" || $("#gallery1").css('display') == "block") {
        $("#rsvp").css("left", "100%");
      }

      //Setup Request Invitation Page, if coming from Contact or RSVP Page
      if ($("#contact1").css('display') == "block" || $("#ri").css('display') == "block") {
        $("#rsvp").css("left", "-100%");
      }

      //Request Animation Page Animation
      $("#rsvp").css('display', 'initial');
      $("#rsvp").animate({
        left: '0%'
      }, 500, "linear");

      //After the transition is complete, Request Invitation page is in-view, check of the remaining events
      var interval101 = setInterval(function () {
        $("#blackout").css('display', 'block');
        $(".nav-top").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $("#bigcontainer").css("pointer-events", "none");

        if ($("#container2").css('display') == "block") {
          $("#container2").css('display', 'none');
        }
        if ($("#ri").css('display') == "block") {
          $("#ri").css('display', 'none');

        }
        if ($("#contact1").css('display') == "block") {
          $("#contact1").css('display', 'none');
        }
        if ($("#gallery1").css('display') == "block") {
          $("#gallery1").css('display', 'none');
        }

        clearInterval(interval101);
      }, 500);

    } else {
      $("#rsvp").css("left", "0%");
      $("#blackout").css('display', 'initial');
      $("#rsvp").css('display', 'initial');
      $("#scene").parallax('disable');
      $(".nav-top").css('z-index', 100);
      $("#icon7").css('z-index', 100);
      $(".icon").css("pointer-events", "none");
      $("#icon7").css("pointer-events", "visible");
    }
  });

  //When RSVP page is selected, the code is similar to when Request Invitation is pressed
  $("#menu4").click(function () {
    if ($("#container2").css('display') == "block" || $("#rsvp").css('display') == "block" || $("#contact1").css('display') == "block" ||
      $("#gallery1").css('display') == "block") {

      $("#bigcontainer").css("pointer-events", "visible");

      if ($("#container2").css('display') == "block") {

        if ($("#about1").css("left") == "0px") {
          $("#about1").animate({
            left: '-100%'
          }, 500, "linear");
        } else {
          $("#about2").animate({
            left: '-100%'
          }, 500, "linear");
        }
      }

      if ($("#rsvp").css('display') == "block") {
        $("#rsvp").animate({
          left: '-100%'
        }, 500, "linear");
      }

      if ($("#gallery1").css('display') == "block") {
        $("#gallery1").animate({
          left: '-150%'
        }, 500, "linear");
      }

      if ($("#contact1").css('display') == "block") {
        $("#contact1").animate({
          left: '100%'
        }, 500, "linear");
      }

      if ($("#container2").css('display') == "block" || $("#rsvp").css('display') == "block" || $("#gallery1").css('display') == "block") {
        $("#ri").css("left", "100%");
      }

      if ($("#contact1").css('display') == "block") {
        $("#ri").css("left", "-100%");
      }

      $("#ri").css('display', 'initial');
      $("#ri").animate({
        left: '0%'
      }, 500, "linear");


      var interval102 = setInterval(function () {
        $("#blackout").css('display', 'block');
        $(".nav-top").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $("#bigcontainer").css("pointer-events", "none");
        if ($("#container2").css('display') == "block") {
          $("#container2").css('display', 'none');
        }
        if ($("#rsvp").css('display') == "block") {
          $("#rsvp").css('display', 'none');

        }
        if ($("#contact1").css('display') == "block") {
          $("#contact1").css('display', 'none');
        }
        if ($("#gallery1").css('display') == "block") {
          $("#gallery1").css('display', 'none');
        }
        clearInterval(interval102);
      }, 500);
    } else {
      $("#ri").css("left", "0%");
      $("#blackout").css('display', 'initial');
      $("#ri").css('display', 'initial');
      $("#scene").parallax('disable');
      $(".nav-top").css('z-index', 100);
      $("#icon7").css('z-index', 100);
      $(".icon").css("pointer-events", "none");
      $("#icon7").css("pointer-events", "visible");
    }
  });

  //When Contact is selected in Header, code is similar to RI and RSVP Selection
  $("#menu5").click(function () {

    if ($("#container2").css('display') == "block" || $("#rsvp").css('display') == "block" || $("#ri").css('display') == "block" ||
      $("#gallery1").css('display') == "block") {
      $("#bigcontainer").css("pointer-events", "visible");

      if ($("#container2").css('display') == "block") {
        if ($("#about1").css("left") == "0px") {
          $("#about1").animate({
            left: '-100%'
          }, 500, "linear");
        } else {
          $("#about2").animate({
            left: '-100%'
          }, 500, "linear");
        }
      }

      if ($("#rsvp").css('display') == "block") {
        $("#rsvp").animate({
          left: '-100%'
        }, 500, "linear");
      }

      if ($("#gallery1").css('display') == "block") {
        $("#gallery1").animate({
          left: '-150%'
        }, 500, "linear");
      }

      if ($("#ri").css('display') == "block") {
        $("#ri").animate({
          left: '-100%'
        }, 500, "linear");
      }

      $("#contact1").css('display', 'initial');
      $("#contact1").css("left", "100%");

      $("#contact1").animate({
        left: '0%'
      }, 500, "linear");

      var interval103 = setInterval(function () {
        $("#blackout").css('display', 'block');
        $(".nav-top").css('z-index', 100);
        $("#icon7").css('z-index', 100);
        $("#bigcontainer").css("pointer-events", "none");
        if ($("#container2").css('display') == "block") {
          $("#container2").css('display', 'none');
        }
        if ($("#rsvp").css('display') == "block") {
          $("#rsvp").css('display', 'none');
        }
        if ($("#ri").css('display') == "block") {
          $("#ri").css('display', 'none');
        }
        if ($("#gallery1").css('display') == "block") {
          $("#gallery1").css('display', 'none');
        }

        clearInterval(interval103);
      }, 500);
    } else {

      $("#contact1").css("left", "0%");
      $("#blackout").css('display', 'block');
      $("#contact1").css('display', 'block');
      $("#scene").parallax('disable');
      $(".nav-top").css('z-index', 100);
      $("#icon7").css('z-index', 100);
      $(".icon").css("pointer-events", "none");
      $("#icon7").css("pointer-events", "visible");
    }
  });

  //When Homepage is selected in Header
  $("#menu0").click(function () {

    $("#blackout").css('display', 'none');
    $("#scene").parallax('enable');

    $("#bigcontainer").css("pointer-events", "visible");
    $(".icon").css("pointer-events", "visible");

    //Animations of Page you are coming from, with condition check 

    if ($("#container2").css('display') == "block") {
      if ($("#about1").css("left") == "0px") {
        $("#about1").animate({
          left: '100%'
        }, 500, "linear");
      } else {
        $("#about2").animate({
          left: '100%'
        }, 500, "linear");
      }
    }

    if ($("#rsvp").css('display') == "block") {
      $("#rsvp").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#ri").css('display') == "block") {
      $("#ri").animate({
        left: '100%'
      }, 500, "linear");
    }


    if ($("#contact1").css('display') == "block") {
      $("#contact1").animate({
        left: '100%'
      }, 500, "linear");
    }

    if ($("#gallery1").css('display') == "block") {
      $("#gallery1").animate({
        left: '100%'
      }, 500, "linear");
    }

    // Events Check off after Homepage is in View
    var interval1000 = setInterval(function () {
      $("#bigcontainer").css("pointer-events", "none");
      if ($("#container2").css('display') == "block") {
        $("#container2").css('display', 'none');
      }
      if ($("#rsvp").css('display') == "block") {
        $("#rsvp").css('display', 'none');
      }
      if ($("#ri").css('display') == "block") {
        $("#ri").css('display', 'none');
      }
      if ($("#gallery1").css('display') == "block") {
        $("#gallery1").css('display', 'none');
      }
      if ($("#contact1").css('display') == "block") {
        $("#contact1").css('display', 'none');
      }
      clearInterval(interval1000);
    }, 500);
  });

  //The Game Code
  var scope = $(".tile");

  //The Code when Tile is Selected, it has alot of logic
  $(".shape2").click(function () {
    $(".shape2").unbind("click");
    $(".tile").css({
      'transform': 'rotateY(-180deg)  '
    });
    $(".photos").css({
      'transform': 'rotateY(0deg)  '
    });

    var interval = setInterval(function () {
      $(".tile").css({
        'transform': 'rotateY(0deg)  '
      });
      $(".photos").css({
        'transform': 'rotateY(180deg)  '
      });
      clearInterval(interval);
    }, 4000);

    scope.click(function () {
      if (new1 == 0) {
        if (new2 == 1) {
          new2 = 0;
        }

        $(this).css({
          'transform': 'rotateY(-180deg)  '
        });
        $(this).parent().children(".photos").css({
          'transform': 'rotateY(0deg)  '
        });
        source = $(this).parent().children(".photos").attr('src');
        previous = $(this);
        new1 = 1;
      } else {

        if ($(this).parent().children(".photos").attr('src') == source) {

          $(this).css({
            'transform': 'rotateY(-180deg)  '
          });
          $(this).parent().children(".photos").css({
            'transform': 'rotateY(0deg)  '
          });

          var interval1001 = setInterval(function () {

            if (gamecheck != 8) {
              var randomnumber2 = Math.floor((Math.random() * 5));
              document.getElementById(cheerarray[randomnumber2]).play();
            }

            clearInterval(interval1001);
          }, 1000);

          new1 = 0;
          gamecheck++;
          if (gamecheck == 8) {
            document.getElementById("winner").play();
            var interval3 = setInterval(function () {

              $("#about1").animate({
                left: '100%'
              }, 500);
              $("#about2").animate({
                left: '0%'
              }, 500);
              clearInterval(interval3);
            }, 2500);
          }
        } else {

          $(this).css({
            'transform': 'rotateY(-180deg)  '
          });
          $(this).parent().children(".photos").css({
            'transform': 'rotateY(0deg)  '
          });

          current = $(this);
          new1 = 0;
          new2 = 1;
          scope.css("pointer-events", "none");

          var interval2 = setInterval(function () {

            var randomnumber = Math.floor((Math.random() * 3));
            document.getElementById(booarray[randomnumber]).play();
            current.css({
              'transform': 'rotateY(0deg)  '
            });
            current.parent().children(".photos").css({
              'transform': 'rotateY(-180deg)  '
            });

            previous.css({
              'transform': 'rotateY(0deg)  '
            });
            previous.parent().children(".photos").css({
              'transform': 'rotateY(-180deg)  '
            });

            var interval4 = setInterval(function () {

              scope.css("pointer-events", "visible");

              clearInterval(interval4);

            }, 500);

            clearInterval(interval2);
          }, 1000);
        }
      }
    });













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
      $("#music-shown-image").attr("src", "assets/images/musichoff.png");
    }
  });

  //Gallery Code
  var interval100;

  $("#next1,#next2").mouseover(
    function () {
      $("#enclose").animate({
        left: '87%'
      }, 250, "linear");
    });

  $("#enclose").mouseleave(
    function () {
      $("#enclose").animate({
        left: '93.3%'
      }, 250, "linear");
    });

  $("#previous1,#previous2").mouseover(
    function () {
      $("#enclose2").animate({
        left: '0%'
      }, 250, "linear");
    });


  $("#enclose2").mouseleave(
    function () {
      $("#enclose2").animate({
        left: '-6.3%'
      }, 250, "linear");
    });


  $("#next1,#next2").click(
    function () {
      if ($("#zoom").css('display') == "block") {

        if (gallerycheck == 6) {} else {

          document.getElementById('enlarge').src = "";
          document.getElementById('enlarge').src = galleryarray2[gallerycheck];
          if (gallerycheck == 5) {} else {
            document.getElementById('nthumb2').src = galleryarray1[gallerycheck + 1];
          }
          document.getElementById('pthumb2').src = galleryarray1[gallerycheck - 1];
          gallerycheck++;

        }
      } else {
        if (gallerycheck2 == 1) {

          $("#pictures").css("visibility", "hidden");
          document.getElementById('load1').src = "assets/images/picture7.png";
          document.getElementById('load2').src = "assets/images/picture8.png";
          document.getElementById('load3').src = "assets/images/picture9.png";
          document.getElementById('load4').src = "assets/images/picture10.png";
          document.getElementById('load5').src = "assets/images/picture11.png";
          document.getElementById('load6').src = "assets/images/picture12.png";

          galleryarray1 = new Array("assets/images/thumb7.png", "assets/images/thumb8.png",
            "assets/images/thumb9.png", "assets/images/thumb10.png", "assets/images/thumb11.png",
            "assets/images/thumb12.png"
          );
          galleryarray2 = new Array("assets/images/bigpic7.png", "assets/images/bigpic8.png",
            "assets/images/bigpic9.png", "assets/images/bigpic10.png", "assets/images/bigpic11.png",
            "assets/images/bigpic12.png"
          );

          var interval14 = setInterval(function () {
            $("#pictures").css("visibility", "visible");
            clearInterval(interval14);
          }, 200);

          gallerycheck2++;
          if (gallerycheck2 == 1) {
            document.getElementById('nthumb2').src = "assets/images/thumb7.png";
            document.getElementById('pthumb2').src = "assets/images/thumb1.png";
          }
          if (gallerycheck2 == 2) {
            document.getElementById('nthumb2').src = "assets/images/thumb7.png";
            document.getElementById('pthumb2').src = "assets/images/thumb1.png";
          }
        }
      }
    });

  $("#previous1,#previous2").click(
    function () {

      if ($("#zoom").css('display') == "block") {
        if (gallerycheck == 1) {} else {
          document.getElementById('enlarge').src = "";
          document.getElementById('enlarge').src = galleryarray2[gallerycheck - 2];
          document.getElementById('nthumb2').src = galleryarray1[gallerycheck - 1];
          if (gallerycheck == 2) {} else {
            document.getElementById('pthumb2').src = galleryarray1[gallerycheck - 3];
          }
          gallerycheck--;
        }
      } else {
        if (gallerycheck2 == 2) {
          $("#pictures").css("visibility", "hidden");
          document.getElementById('load1').src = "assets/images/picture1.png";
          document.getElementById('load2').src = "assets/images/picture2.png";
          document.getElementById('load3').src = "assets/images/picture3.png";
          document.getElementById('load4').src = "assets/images/picture4.png";
          document.getElementById('load5').src = "assets/images/picture5.png";
          document.getElementById('load6').src = "assets/images/picture6.png";

          galleryarray1 = new Array("assets/images/thumb1.png", "assets/images/thumb2.png",
            "assets/images/thumb3.png", "assets/images/thumb4.png", "assets/images/thumb5.png",
            "assets/images/thumb6.png"
          );
          galleryarray2 = new Array("assets/images/bigpic1.png", "assets/images/bigpic2.png",
            "assets/images/bigpic3.png", "assets/images/bigpic4.png", "assets/images/bigpic5.png",
            "assets/images/bigpic6.png"
          );

          var interval24 = setInterval(function () {
            $("#pictures").css("visibility", "visible");
            clearInterval(interval24);
          }, 200);

          gallerycheck2--;
          if (gallerycheck2 == 1) {
            document.getElementById('nthumb2').src = "assets/images/thumb7.png";
            document.getElementById('pthumb2').src = "assets/images/thumb1.png";
          }
          if (gallerycheck2 == 2) {
            document.getElementById('nthumb2').src = "assets/images/thumb7.png";
            document.getElementById('pthumb2').src = "assets/images/thumb1.png";
          }
        }
      }
    });

  $('form').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  });
});