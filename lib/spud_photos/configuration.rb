module Spud
  module Photos
    include ActiveSupport::Configurable
    config_accessor :photo_styles, :galleries_enabled, :base_layout, :base_path
    self.photo_styles = {
      :small => '50x50',
      :medium => '200x200',
      :large => '400x400'
    }
    self.galleries_enabled = false
    self.base_layout = 'application'
    self.base_path = 'photos'
  end
end