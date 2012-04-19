class SpudPhoto < ActiveRecord::Base

  attr_accessible :title, :caption, :photo

  has_many :spud_photo_albums_photos
  has_many :albums,
    :through => :spud_photo_albums_photos,
    :source => :spud_photo_album

  has_attached_file :photo, 
    :styles => lambda { |attachment| attachment.instance.dynamic_styles },
    :storage => Spud::Photos.paperclip_storage,
    :s3_credentials => Spud::Photos.s3_credentials,
    :url => Spud::Photos.storage_url,
    :path => Spud::Photos.storage_path

  validates_attachment_presence :photo

  def dynamic_styles
    admin_styles = {
      :spud_admin_small => '125x125#',
      :spud_admin_medium => '300x200'
    }
    return admin_styles.merge(Spud::Photos.config.photo_styles)
  end

end