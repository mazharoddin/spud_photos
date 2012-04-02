class SpudPhotoAlbum < ActiveRecord::Base

  attr_accessible :title, :url_name

  has_and_belongs_to_many :galleries,
    :class_name => 'SpudPhotoGallery',
    :join_table => 'spud_photo_galleries_albums'
  has_and_belongs_to_many :photos,
    :class_name => 'SpudPhoto',
    :join_table => 'spud_photo_albums_photos',
    :order => 'created_at'
  validates_presence_of :title, :url_name
  validates_uniqueness_of :title, :url_name
  before_validation :set_url_name

  def top_photo_url(style)
    unless photos.empty?
      return photos.first.photo.url(style)
    end
  end

  def photos_available
    if photo_ids.any?
      return SpudPhoto.where('id not in (?)', photo_ids)
    else
      return SpudPhoto.all
    end
  end

  private

  def set_url_name
    self.url_name = self.title.parameterize
  end

end