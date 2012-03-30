class SpudPhoto < ActiveRecord::Base
  has_and_belongs_to_many :albums,
    :class_name => 'SpudPhotoAlbum',
    :join_table => 'spud_photo_albums_photos'

  has_attached_file :photo, 
    :styles => lambda { |attachment| attachment.instance.dynamic_styles },
    :url => "/system/spud_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/system/spud_photos/:id/:style/:basename.:extension"

  validates_attachment_presence :photo

  def dynamic_styles
    admin_styles = {
      :spud_admin_small => '125x125#',
      :spud_admin_medium => '300x300'
    }
    return admin_styles.merge(Spud::Photos.config.photo_styles)
  end

end