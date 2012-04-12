Spud = (typeof(Spud) == 'undefined') ? {} : Spud;
Spud.Admin = (typeof(Spud.Admin) == 'undefined') ? {} : Spud.Admin;

Spud.Admin.Photos = new function(){

  var self = this;

  this.init = function(){
    // event handlers
    $('.spud_admin_photo_ui_thumbs_sortable').sortable({
      connectWith:'.spud_admin_photo_ui_thumbs_sortable'
    });
    $('body').on('submit', '#spud_admin_photo_album_form', self.submittedPhotoAlbumForm);
    $('body').on('submit', '#spud_admin_photo_gallery_form', self.submittedPhotoGalleryForm);
    $('body').on('submit', '#spud_admin_photo_form', self.submittedPhotoForm);
    $('body').on('click', '.spud_admin_photos_btn_remove', self.clickedPhotoRemoveFromLibrary)
    $('body').on('click', '.spud_admin_photo_ui_thumbs_selectable .spud_admin_photo_ui_thumb', self.selectedPhotoUiThumb);
    $('body').on('click', '#spud_admin_photo_album_action_library', self.clickedPhotoLibrary);

    // html5 drag and drop file 
    if(FormData){
      $('#spud_admin_photo_upload_queue').show();
      var droparea = document.getElementById('spud_admin_photo_upload_queue');
      droparea.addEventListener('dragenter', self.stopDndPropagation, false);
      droparea.addEventListener('dragexit', self.stopDndPropagation, false);
      droparea.addEventListener('dragover', self.stopDndPropagation, false);
      droparea.addEventListener('drop', self.droppedFile, false);
    }
  };

  this.submittedPhotoAlbumForm = function(e){

  };

  this.submittedPhotoGalleryForm = function(e){
    $('#spud_admin_photo_albums_available .spud_admin_photo_ui_thumb').remove();
  }

  this.clickedPhotoRemoveFromLibrary = function(e){
    $(this).parents('.spud_admin_photo_ui_thumb').fadeOut(200, function(){
      $(this).remove();
    });
  };

  /* Handle file uploads passed via iframe (legacy support)
  * -------------------------------------------------------- */

  this.photoLegacyUploadErrors = function(html){
    $('#spud_admin_photo_form').replaceWith(html);
  };

  this.photoLegacyUploadComplete = function(id, html){
    var element = $('#spud_admin_photo_' + id);
    if(element.length > 0){
      element.replaceWith(htmlhtml);
    }
    else{
      var target = $('#spud_admin_photos_selected .spud_admin_photo_ui_thumbs, #spud_admin_photos');
      target.prepend(html).fadeIn(200);
    }
    $('#dialog').dialog('close');
  };

  this.selectedPhotoUiThumb = function(e){
    var thumb = $(this);
    if(thumb.hasClass('spud_admin_photo_ui_thumb_selected')){
      $(this).removeClass('spud_admin_photo_ui_thumb_selected');
    }
    else{
      $(this).addClass('spud_admin_photo_ui_thumb_selected');
    }
  };

  this.markPhotoAsDeleted = function(photo_id){
    var photo = $('#spud_admin_photo_' + photo_id);
    photo.fadeOut(200, function(){
      photo.remove();
    });
  };

  this.markPhotoAlbumAsDeleted = function(photo_album_id){
    var photo_album = $('#spud_admin_photo_album_' + photo_album_id);
    photo_album.fadeOut(200, function(){
      photo_album.remove();
    });
  };

  this.markPhotoGalleryAsDeleted = function(photo_gallery_id){
    var photo_gallery = $('#spud_admin_photo_gallery_' + photo_gallery_id);
    photo_gallery.fadeOut(200, function(){
      photo_gallery.remove();
    });
  };

  /* 
  * Single-Photo Form Upload
  -------------------------------- */

  this.submittedPhotoForm = function(e){
    if(FormData && XMLHttpRequest){
      // create a FormData object and attach form values
      var fd = new FormData();
      var form = $(this);
      fd.append('_method', form.find('[name=_method]').val());
      fd.append('authenticity_token', form.find('[name=authenticity_token]').val());
      fd.append('spud_photo[title]', form.find('#spud_photo_title').val());
      fd.append('spud_photo[caption]', form.find('#spud_photo_caption').val());

      // progress bar to send events to 
      if(file){
        var file = form.find('#spud_photo_photo')[0].files[0];
        var progressBar = self.progressBarForUpload(file.fileName);
        fd.append('spud_photo[photo]', file);
        form.find('.form-actions').before(progressBar);
      }
      else{
        var progressBar = self.progressBarForUpload('');
      }

      // send FormData object as ajax request
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', function(e){ self.onPhotoUploadProgress(e, progressBar) }, false);
      xhr.addEventListener('load', function(e){ self.onPhotoUploadComplete(e, progressBar); }, false);
      xhr.addEventListener('error', function(e){ self.onPhotoUploadFailure(e, progressBar); }, false);
      xhr.addEventListener('abort', function(e){ self.onPhotoUploadCancel(e, progressBar); }, false);
      xhr.open('POST', form.attr('action'));
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send(fd);
      return false;
    }
  };

  /* 
  * Upload Progress Monitoring
  -------------------------------- */

  this.progressBarForUpload = function(fileName){
    return $('\
      <div class="spud_admin_photo_progress" \
        <h6> \
          <span class="spud_admin_photo_progress_filename">'+fileName+'</span>: \
          <span class="spud_admin_photo_progress_status">Uploading</span> \
        </h6> \
        <div class="progress progress-striped active"> \
          <div class="bar" style="width: 0;"></div> \
        </div> \
      </div>');
  };

  this.onPhotoUploadProgress = function(e, progressBar){
    var percent = Math.round(e.loaded * 100 / e.total);
    progressBar.find('.bar').css({width: percent + '%'});
    if(percent == 100){
      progressBar.find('.progress').addClass('progress-success');
      progressBar.find('.spud_admin_photo_progress_status').text('Processing');
    }
  };

  this.onPhotoUploadComplete = function(e, progressBar){
    // success
    var photo = $.parseJSON(e.target.response);
    if(e.target.status == 200){
      progressBar.find('.spud_admin_photo_progress_status').text('Done!');
      progressBar.find('.progress').removeClass('progress-striped active');
      var element = $('#spud_admin_photo_' + photo.id);
      if(element.length > 0){
        element.replaceWith(photo.html);
      }
      else{
        var target = $('#spud_admin_photos_selected, #spud_admin_photos');
        target.prepend(photo.html).fadeIn(200);
      }
      $('#dialog').dialog('close');
    }
    // validation error
    else{
      $('#dialog').html(photo.html);
    }
  };

  this.onPhotoUploadCancel = function(e, progressBar){

  };

  this.onPhotoUploadCancel = function(e, progressBar){
    progressBar.find('.spud_admin_photo_progress_status').text('Done!');
    progressBar.find('.progress').addClass('progress-danger');
  };

  /*
  * Add From Photo Library
  ------------------------------- */

  this.clickedPhotoLibrary = function(e){
    var url = this.href;
    $.ajax({
      url:url,
      success:self.photoLibraryLoaded
    });
    return false;
  };

  this.photoLibraryLoaded = function(html){
    var dialog = $("#dialog");
    if(dialog.length == 0){
      dialog = $('<div id="dialog" style="display:hidden;"></div>').appendTo('body');
    }
    dialog.html(html);
    $('#spud_admin_photos_selected .spud_admin_photo_ui_thumb').each(function(){
      var id = $(this).attr('id');
      var dupe = dialog.find('#'+id);
      if(dupe){
        dupe.remove();
      }
    });
    dialog.dialog({
      width: 675,
      modal: true,
      height: 450,
      title: 'My Photo Library',
      buttons: {
        'Add Selected': self.addSelectedPhotosFromLibrary,
        'Delete Selected': self.deleteSelectedPhotosFromLibrary
      }
    });
  };

  this.addSelectedPhotosFromLibrary = function(e){
    $('#spud_admin_photo_library .spud_admin_photo_ui_thumb_selected')
      .removeClass('spud_admin_photo_ui_thumb_selected')
      .prependTo('#spud_admin_photos_selected')
      .hide()
      .fadeIn(200);
    $(this).dialog('close');
  };

  this.deleteSelectedPhotosFromLibrary = function(e){
    var ids = $.map($('.spud_admin_photo_ui_thumb_selected'), function(val, i){ 
      return $(val).attr('rel');
    });
    $.ajax({
      type: 'POST',
      url: '/spud/admin/photos/mass_destroy',
      data: {spud_photo_ids:ids},
      success: function(data, textStatus, jqXHR){
        $('.spud_admin_photo_ui_thumb_selected').fadeOut(200, function(){
          $(this).remove();
        });
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log('An error occurred:')
        console.log(arguments);
      }
    })

  };

  /*
  * Drag & Drop File Upload Queue
  -------------------------------- */

  this.fileQueue = [];
  this.fileQueueStarted = false;

  // prevent default browser behavior of opening the dropped file
  this.stopDndPropagation = function(e){
    e.stopPropagation();
    e.preventDefault();
  }

  // add files to queue. starts queue if not started already
  this.droppedFile = function(e){
    e.stopPropagation();
    e.preventDefault();
    $('#spud_admin_photo_upload_queue').show();
    var files = e.dataTransfer.files;
    var i = 0;
    while(i < files.length){
      self.fileQueue.push(files[i]);
      i++;
    }
    self.updateQueueCountLabel();
    if(!this.fileQueueStarted){
      self.uploadNextPhoto();
      if(self.fileQueue.length > 0){
        self.uploadNextPhoto();  
      }
    }
  };

  this.updateQueueCountLabel = function(){
    $('#spud_admin_photo_upload_queue_label span').text(self.fileQueue.length);
  };

  this.uploadNextPhoto = function(){
    if(self.fileQueue.length == 0){
      self.fileQueueStarted = false;
      return;
    }

    // formdata object
    self.fileQueueStarted = true;
    var file = self.fileQueue.pop();
    var fd = new FormData();
    fd.append('spud_photo[photo]', file);

    // create a progress bar
    var progressBar = self.progressBarForUpload(file.fileName);
    $('#spud_admin_photo_upload_queue_bars').prepend(progressBar);

    // send formdata as xhr
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', function(e){ self.onPhotoUploadProgress(e, progressBar); }, false);
    xhr.addEventListener('load', function(e){ self.onQueuedPhotoUploadComplete(e, progressBar) }, false);
    xhr.addEventListener('error', function(e){ self.onPhotoUploadFailure(e, progressBar); }, false);
    xhr.addEventListener('abort', function(e){ self.onPhotoUploadCancel(e, progressBar); }, false);
    xhr.open('POST', '/spud/admin/photos');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(fd);
  };

  this.onQueuedPhotoUploadComplete = function(e, progressBar){
    self.onPhotoUploadComplete(e, progressBar);
    self.updateQueueCountLabel();
    self.uploadNextPhoto();
  };
};