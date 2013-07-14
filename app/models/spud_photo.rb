class SpudPhoto < ActiveRecord::Base

  attr_accessible :title, :caption, :photo

  has_many :spud_photo_albums_photos, :dependent => :destroy
  has_many :albums,
    :through => :spud_photo_albums_photos,
    :source => :spud_photo_album

  has_attached_file :photo, 
    :styles => lambda { |attachment| attachment.instance.dynamic_styles },
    :convert_options => Spud::Photos.config.convert_options,
    :storage => Spud::Photos.paperclip_storage,
    :s3_credentials => Spud::Photos.s3_credentials,
    :s3_host_name => Spud::Photos.s3_host_name,
    :url => Spud::Photos.storage_url,
    :path => Spud::Photos.storage_path

  validates_attachment_presence :photo

  def dynamic_styles
    compress = '-strip -density 72x72'
    admin_styles = {
      :spud_admin_small => {:geometry => '125x125#', :convert_options => compress},
      :spud_admin_medium => {:geometry => '300x200', :convert_options => compress}
    }
    return admin_styles.merge(Spud::Photos.config.photo_styles)
  end

end