module Spud
  module Photos
    include ActiveSupport::Configurable
    config_accessor :photo_styles
    self.photo_styles = {
      :small => '50x50',
      :medium => '250x250',
      :large => '600x600'
    }
  end
end