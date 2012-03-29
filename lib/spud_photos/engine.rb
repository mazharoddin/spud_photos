require 'spud_core'
require 'paperclip'

module Spud
  module Photos
    class Engine < Rails::Engine
      engine_name :spud_photos
      initializer :admin do
        Spud::Core.config.admin_applications += [{
          :name => 'Photo Galleries',
          :thumbnail => 'spud/admin/photo_galleries_thumb.png',
          :url => '/spud/admin/photo_galleries',
          :order => 81
        },{
          :name => 'Photo Albums',
          :thumbnail => 'spud/admin/photo_albums_thumb.png',
          :url => '/spud/admin/photo_albums',
          :order => 82
        },{
          :name => 'Photos',
          :thumbnail => 'spud/admin/photos_thumb.png',
          :url => '/spud/admin/photos',
          :order => 83
        }]
      end
    end
  end
end