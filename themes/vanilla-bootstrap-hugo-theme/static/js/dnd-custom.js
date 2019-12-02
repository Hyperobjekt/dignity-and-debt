

(function($) {
    var jQuery = $.noConflict(true);
    var $ = jQuery;

    function checkScroll(y) {
      if ($('body.home').length >= 1) {
        // If the scroll is at the top, add class.
        // Transition comes farther down the page for
        // the the front page.
        if (y <= 600) {
            $('body').addClass('scroll-top');
        } else if (y >= 601) {
            $('body').removeClass('scroll-top');
        }
      } else {
        if (y <= 0) {
            $('body').addClass('scroll-top');
        } else {
            $('body').removeClass('scroll-top');
        }
      }
    }
    $( document ).ready(function() {
        // console.log( "ready!" );
        // If on the home page, add scrollY tracking class to body tag.
        // if ($('body.home').length >= 1) {
          // When the window is scrolled, check scroll position.
          $( window ).scroll(function() {
              var t = $(window).scrollTop();
              checkScroll(t);
          });
        // }
        // Check on page load as well.
        var t = $(window).scrollTop();
        checkScroll(t);
    });

    var updateModal = {
      activeImg: null,
      allImgs: null,
      update: function() {
        // console.log('updateModal.update()');
        var $target = $(this.allImgs[this.activeImg]);
        var _src = $target.attr('data-img');
        var _full_src = $target.attr('data-fullimg');
        $('#dndModal #modalImg').attr('src', _src);
        $('#dndModal #modalCaption a').attr('href', _full_src);
        $('#dndModal').modal('show');
        // Check first and last position, disable buttons
        if (this.activeImg <= 0) {
          // console.log('first item');
          $('#prevImg').prop( "disabled", true);
          $('#nextImg').prop( "disabled", false);
        } else if (this.activeImg >= ((this.allImgs).length - 1)) {
          // console.log('last item');
          $('#prevImg').prop( "disabled", false);
          $('#nextImg').prop( "disabled", true);
        } else {
          $('#prevImg').prop( "disabled", false);
          $('#nextImg').prop( "disabled", false);
        }
        // Set focus on close button
        $('#closeModal').focus();
      },
      close: function() {
        // console.log('updateModal.close()');
        setTimeout(
          function() {$('.project-img.launch-modal')[updateModal.activeImg].focus()
        }, 300);
      }
    };

    // Handle project modals
    if ($('.project-img.launch-modal').length >= 1) {
      // Store the complete collection of bios
      // so we can switch between them all.
      updateModal.allImgs = $('.project-img.launch-modal');
      $('.project-img.launch-modal').on('click', function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        // Store active bio index so navigation between them works.
        updateModal.activeImg = (updateModal.allImgs).index($target);
        console.log('updateModal.activeImg = ', updateModal.activeImg);
        // console.log(updateModal.activeBio);
        updateModal.update();

        $('#prevImg').on('click', function() {
            if (updateModal.activeImg >= 1) {
                updateModal.activeImg = updateModal.activeImg - 1;
                updateModal.update();
            }
        });
        $('#nextImg').on('click', function() {
            if (updateModal.activeImg < (updateModal.allImgs).length - 1) {
                updateModal.activeImg = updateModal.activeImg + 1;
                updateModal.update();
            }
        });
        $('#dndModal button.close').on('click', function() {
          updateModal.close();
          $('#prevImg').unbind('click');
          $('#nextImg').unbind('click');
        });
      });
      // Listen for enter and space, trigger click
      $('.project-img.launch-modal').on('keypress', function(e) {
        e.preventDefault();
        e.currentTarget.click();
      });
    }

    $(window).on('scroll', function() {
      $('.target').each(function() {
          if($(window).scrollTop() >= $(this).offset().top -500) {
              var id = $(this).attr('id');
              $('h2').removeClass('active');
              $('h2').addClass('active');
          }
      });
    });

 // Auto-add carousel indicators on meetings page for each photo in the slideshow
  var myCarousel = $(".carousel");
    myCarousel.append("<ol class='carousel-indicators'></ol>");
    var indicators = $(".carousel-indicators"); 
    myCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
        (index === 0) ? 
        indicators.append("<li data-target='#mtgs-carousel' data-slide-to='"+index+"' class='active'></li>") : 
        indicators.append("<li data-target='#mtgs-carousel' data-slide-to='"+index+"'></li>");
    });     


    $('.carousel').carousel(); 



    var updatePplModal = {
      activeBio: null,
      allBios: null,
      updatePpl: function() {
          // console.log('updateModal.update()');
          var $button = $(this.allBios[this.activeBio]).find('button');

          // Get name, title, bio, and image
          var parent = $button.parent();
          // console.log(parent);
          var name = $button.parent().siblings('.name').text();
          // console.log('name = ' + name);
          var title = $button.parent().siblings('.title').text();
          // console.log('title = ' + title);
          var bio = $button.parent().siblings('.bio').html();
          /// console.log('bio = ' + bio);
          var image = $button.closest('.column-people').children('.pic').attr('style');
          var bigimage = $button.parent().siblings('.bigimage').html();

          // Set contents
          $('#modalImg').attr('style', image);
          $('img#bigimage').attr('src', bigimage);
          $('#modalName').text(name);
          $('#modalTitle').html(title);
          $('#modalBio').html(bio);
          $('#peopleBioModal').modal('show');

          // Check first and last position, disable buttons
          if (this.activeBio <= 0) {
              // console.log('first item');
              $('#prevBio').prop( "disabled", true);
              $('#nextBio').prop( "disabled", false);
          } else if (this.activeBio >= ((this.allBios).length - 1)) {
              // console.log('last item');
              $('#prevBio').prop( "disabled", false);
              $('#nextBio').prop( "disabled", true);
          } else {
              $('#prevBio').prop( "disabled", false);
              $('#nextBio').prop( "disabled", false);
          }
      }
  };

      // Handle bio modals
      if ($('.launch-people-bio').length >= 1) {
        // Store the complete collection of bios
        // so we can switch between them all.
        updatePplModal.allBios = $('.column-people');
        $('.launch-people-bio').click(function(e) {
          e.preventDefault();
          var $button = $(e.target);
          // Store active bio index so navigation between them works.
          updatePplModal.activeBio = (updatePplModal.allBios).index($button.closest('.column-people'));
          // console.log(updateModal.activeBio);
          updatePplModal.updatePpl();

          $('#prevBio').on('click', function() {
              if (updatePplModal.activeBio >= 1) {
                  updatePplModal.activeBio = updatePplModal.activeBio - 1;
                  updatePplModal.updatePpl();
              }
          });
          $('#nextBio').on('click', function() {
              if (updatePplModal.activeBio < (updatePplModal.allBios).length - 1) {
                  updatePplModal.activeBio = updatePplModal.activeBio + 1;
                  updatePplModal.updatePpl();
              }
          });
          $('#peopleBioModal button.close').on('click', function() {
            // console.log('closing, active bio = ');
            // console.log(updateModal.activeBio);
            updatePplModal.activeBio = 0;
            $('#prevBio').unbind('click');
            $('#nextBio').unbind('click');
          });
        });
      }

})(jQuery);
