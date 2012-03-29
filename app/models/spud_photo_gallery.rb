class SpudPhotoGallery < ActiveRecord::Base
  has_and_belongs_to_many :albums,
    :class_name => 'SpudPhotoAlbum',
    :join_table => 'spud_photo_galleries_albums'
  validates_presence_of :title
  validates_uniqueness_of :title
end