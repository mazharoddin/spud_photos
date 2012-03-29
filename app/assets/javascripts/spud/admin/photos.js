Spud = (typeof(Spud) == 'undefined') ? {} : Spud;
Spud.Photos = new function(){

  var self = this;

  this.init = function(){
    $('.spud_admin_photo_ui_thumb_selectable').live('click', self.selectedPhotoUiThumb);
    self.markSelectedPhotoUiThumbs();
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
}

$(document).ready(Spud.Photos.init);