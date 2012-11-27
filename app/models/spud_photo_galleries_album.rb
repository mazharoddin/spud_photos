class SpudPhotoGalleriesAlbum < ActiveRecord::Base
  attr_accessible :spud_photo_album_id, :spud_photo_gallery_id, :sort_order
  belongs_to :spud_photo_album
  belongs_to :spud_photo_gallery
end