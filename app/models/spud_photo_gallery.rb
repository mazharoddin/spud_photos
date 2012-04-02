class SpudPhotoGallery < ActiveRecord::Base

  attr_accessible :title, :url_name

  has_and_belongs_to_many :albums,
    :class_name => 'SpudPhotoAlbum',
    :join_table => 'spud_photo_galleries_albums'
  validates_presence_of :title, :url_name
  validates_uniqueness_of :title, :url_name
  before_validation :set_url_name

  def top_photo_url(style)
    unless albums.empty?
      return albums.first.top_photo_url(style)
    end
  end

  def albums_available
    if album_ids.any?
      return SpudPhotoAlbum.where('id not in (?)', album_ids)
    else
      return SpudPhotoAlbum.all
    end
  end

  private

  def set_url_name
    self.url_name = self.title.parameterize
  end

end