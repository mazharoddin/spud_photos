class SpudPhotoAlbum < ActiveRecord::Base
  has_and_belongs_to_many :galleries,
    :class_name => 'SpudPhotoGallery',
    :join_table => 'spud_photo_galleries_albums'
  has_and_belongs_to_many :photos,
    :class_name => 'SpudPhoto',
    :join_table => 'spud_photo_albums_photos'
end