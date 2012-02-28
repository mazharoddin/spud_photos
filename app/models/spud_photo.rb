class SpudPhoto < ActiveRecord::Base
  has_and_belongs_to_many :albums,
    :class_name => 'SpudPhotoAlbum',
    :join_table => 'spud_photo_albums_photos'
  has_many :custom_styles, :class_name => 'SpudPhotoStyle'
end