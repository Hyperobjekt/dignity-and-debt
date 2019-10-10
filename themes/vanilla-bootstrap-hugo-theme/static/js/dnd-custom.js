

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
        $('#dndModal #modalImg').attr('src', _src);
        $('#dndModal #modalCaption a').attr('href', _src);
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
      }
    };

    // Handle bio modals
    if ($('.project-img.launch-modal img').length >= 1) {
      // Store the complete collection of bios
      // so we can switch between them all.
      updateModal.allImgs = $('.project-img.launch-modal img');
      $('.project-img.launch-modal img').on('click', function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        // Store active bio index so navigation between them works.
        updateModal.activeImg = (updateModal.allImgs).index($target);
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
          // console.log('closing, active bio = ');
          // console.log(updateModal.activeBio);
          updateModal.activeImg = 0;
          $('#prevImg').unbind('click');
          $('#nextImg').unbind('click');
        });
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

})(jQuery);
