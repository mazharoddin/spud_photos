require 'spud_core'
module Spud
  module Photos
    class Engine < Rails::Engine
      engine_name :spud_photos
      initializer :admin do
        Spud::Core.config.admin_applications += [{
          :name => 'Photo Albums',
          :thumbnail => 'spud/admin/photos_thumb.png',
          :url => '/spud/admin/photo_album'
        }]
      end
    end
  end
end