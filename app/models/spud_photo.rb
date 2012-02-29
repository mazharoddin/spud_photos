class SpudPhoto < ActiveRecord::Base
  has_and_belongs_to_many :albums,
    :class_name => 'SpudPhotoAlbum',
    :join_table => 'spud_photo_albums_photos'
  has_many :custom_styles, :class_name => 'SpudPhotoStyle'

  has_attached_file :photo, :styles => lambda { |attachment| attachment.instance.dynamic_styles }

  def dynamic_styles
    base_styles = {
      :spud_admin_small => '100x100',
      :spud_admin_medium => '200x200',
      :spud_admin_large => '300x300'
    }
    return base_styles
  end

end