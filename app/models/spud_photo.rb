class SpudPhoto < ActiveRecord::Base
  has_and_belongs_to_many :albums,
    :class_name => 'SpudPhotoAlbum',
    :join_table => 'spud_photo_albums_photos'

  has_attached_file :photo, 
    :styles => lambda { |attachment| attachment.instance.dynamic_styles },
    :url => "/system/spud_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/system/spud_photos/:id/:style/:basename.:extension"

  def dynamic_styles
    admin_styles = {
      :admin_small => '100x100#',
      :admin_medium => '200x200#',
      :admin_large => '300x300#'
    }
    return admin_styles + Spud::Blog.config.photo_styles
  end

end