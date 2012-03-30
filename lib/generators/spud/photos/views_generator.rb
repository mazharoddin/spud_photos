require 'rails/generators/migration'

class Spud::Photos::ViewsGenerator < ::Rails::Generators::Base
  
  source_root File.expand_path('../../../../../app/views', __FILE__)

  def install
    if Spud::Photos.config.galleries_enabled
      copy_file 'photo_galleries/index.html.erb', 'app/views/photo_galleries/index.html.erb'
    end
    copy_file 'photo_albums/index.html.erb', 'app/views/photo_albums/index.html.erb'
    copy_file 'photo_albums/show.html.erb', 'app/views/photo_albums/show.html.erb'
  end
end