Spud = (typeof(Spud) == 'undefined') ? {} : Spud;
Spud.Admin = (typeof(Spud.Admin) == 'undefined') ? {} : Spud.Admin;

Spud.Admin.Photos = new function(){

  var self = this;

  this.init = function(){
    $('.spud_admin_photo_ui_thumbs_sortable').sortable({
      connectWith:'.spud_admin_photo_ui_thumbs_sortable'
    });
    $('#spud_admin_photo_album_form, #spud_admin_photo_gallery_form').live('submit', self.submittedPhotoAlbumOrGalleryForm)
    $('.spud_admin_photo_mass_destroy').live('click', self.massDestroySelected);
    $('#spud_admin_photo_form').live('submit', self.submittedPhotoForm);
    $('.spud_admin_photo_ui_thumb_selectable input[type=checkbox]').live('click', self.invertPhotoUiThumbCheckbox);
    $('.spud_admin_photo_ui_thumb_selectable').live('click', self.selectedPhotoUiThumb);
    self.markSelectedPhotoUiThumbs();
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

  this.submittedPhotoForm = function(e){
    if(FormData && XMLHttpRequest){
      // create a FormData object and attach form values
      var fd = new FormData();
      var form = $(this);
      fd.append('_method', form.find('[name=_method]').val());
      fd.append('authenticity_token', form.find('[name=authenticity_token]').val());
      fd.append('spud_photo[photo]', form.find('#spud_photo_photo')[0].files[0]);
      fd.append('spud_photo[title]', form.find('#spud_photo_title').val());
      fd.append('spud_photo[caption]', form.find('#spud_photo_caption').val());

      // send FormData object as ajax request
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', self.photoUploadProgress, false);
      xhr.addEventListener('load', self.photoUploadComplete, false);
      xhr.addEventListener('error', self.photoUploadFailed, false);
      xhr.addEventListener('abort', self.photoUploadCanceled, false);
      xhr.open('POST', form.attr('action'));
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send(fd);
      return false;
    }
  };

  this.photoUploadProgress = function(e){
    var percent = Math.round(e.loaded * 100 / e.total);
    console.log('progress: ' + percent + '%');
    $('.progress').show();
    $('.progress .bar').css({width: percent + '%'});
  };

  this.photoUploadComplete = function(e){
    // success
    var photo = $.parseJSON(e.target.response);
    if(e.target.status == 200){
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

  this.photoUploadFailed = function(e){
    console.log('fail!');
    console.log(e);
  }

  this.photoUploadCanceled = function(e){
    console.log('cancel');
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
};