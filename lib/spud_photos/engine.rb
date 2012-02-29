require 'spud_core'
require 'paperclip'

module Spud
  module Photos
    class Engine < Rails::Engine
      engine_name :spud_photos
      initializer :admin do
        Spud::Core.config.admin_applications += [{
          :name => 'Photos',
          :thumbnail => 'spud/admin/photos_thumb.png',
          :url => '/spud/admin/photos',
          :order => 1
        }]
      end
    end
  end
end