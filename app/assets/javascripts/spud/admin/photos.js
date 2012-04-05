Spud = (typeof(Spud) == 'undefined') ? {} : Spud;
Spud.Admin = (typeof(Spud.Admin) == 'undefined') ? {} : Spud.Admin;

Spud.Admin.Photos = new function(){

  var self = this;

  this.init = function(){
    self.markSelectedPhotoUiThumbs();

    // event handlers
    $('.spud_admin_photo_ui_thumbs_sortable').sortable({
      connectWith:'.spud_admin_photo_ui_thumbs_sortable'
    });
    $('body').on('submit', '#spud_admin_photo_album_form, #spud_admin_photo_gallery_form', self.submittedPhotoAlbumOrGalleryForm)
    $('body').on('submit', '#spud_admin_photo_form', self.submittedPhotoForm);
    //$('body').on('click', '.spud_admin_photo_mass_destroy', self.massDestroySelected);
    $('body').on('click', '.spud_admin_photo_ui_thumb_selectable input[type=checkbox]', self.invertPhotoUiThumbCheckbox);
    $('body').on('click', '.spud_admin_photo_ui_thumb_selectable', self.selectedPhotoUiThumb);
    self.markSelectedPhotoUiThumbs();

    // html5 drag and drop file 
    var droparea = document.getElementById('spud_admin_photos_selected');
    droparea.addEventListener('dragenter', self.stopDndPropagation, false);
    droparea.addEventListener('dragexit', self.stopDndPropagation, false);
    droparea.addEventListener('dragover', self.stopDndPropagation, false);
    droparea.addEventListener('drop', self.droppedFile, false);
  };

  this.submittedPhotoAlbumOrGalleryForm = function(e){
    // update photo checkboxes
    $('.spud_admin_photo_ui_thumb').each(function(){
      var item = $(this);
      var checkbox = item.find('input[type=checkbox]');
      checkbox.attr('checked', (item.parents('.spud_admin_photos_selection_left').length>0));
    });
  }

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

  // need to invert the checkbox state so that it gets properly checked/uncheckd when `selectedPhotoUiThumb` fires
  this.invertPhotoUiThumbCheckbox = function(e){
    $(this).attr('checked', !$(this).attr('checked'));
  };

  this.selectedPhotoUiThumb = function(e){
    var checkbox = $(this).find('input[type=checkbox]');
    if(checkbox){
      if(checkbox.attr('checked')){
        $(this).removeClass('spud_admin_photo_ui_thumb_selected');
        checkbox.attr('checked', false);
      }
      else{
        $(this).addClass('spud_admin_photo_ui_thumb_selected');
        checkbox.attr('checked', true);
      }
    }
  };

  this.markSelectedPhotoUiThumbs = function(){
    $('.spud_admin_photo_ui_thumb_selectable').each(function(){
      var checkbox = $(this).find('input[type=checkbox]');
      if(checkbox && checkbox.attr('checked')){
        $(this).addClass('spud_admin_photo_ui_thumb_selected');
      }
    });
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
      var file = form.find('#spud_photo_photo')[0].files[0];
      fd.append('_method', form.find('[name=_method]').val());
      fd.append('authenticity_token', form.find('[name=authenticity_token]').val());
      fd.append('spud_photo[photo]', file);
      fd.append('spud_photo[title]', form.find('#spud_photo_title').val());
      fd.append('spud_photo[caption]', form.find('#spud_photo_caption').val());

      // progress bar to send events to 
      var progressBar = self.progressBarForUpload(file.fileName);
      form.find('.form-actions').before(progressBar);

      // send FormData object as ajax request
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', function(e){ self.onPhotoUploadProgress(e, progressBar) }, false);
      xhr.addEventListener('load', self.onPhotoUploadComplete, false);
      xhr.addEventListener('error', self.onPhotoUploadFailure, false);
      xhr.addEventListener('abort', self.onPhotoUploadCancel, false);
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
        var target = $('#spud_admin_photos_selected .spud_admin_photo_ui_thumbs, #spud_admin_photos');
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