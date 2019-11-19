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