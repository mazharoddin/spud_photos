class SpudPhotoAlbumsPhoto < ActiveRecord::Base
  attr_accessible :spud_photo_id, :spud_photo_album_id, :order
  belongs_to :spud_photo
  belongs_to :spud_photo_album
end