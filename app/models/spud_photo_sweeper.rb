class SpudPhotoSweeper < ActionController::Caching::Sweeper

  observe :spud_photo, :spud_photo_album, :spud_photo_gallery

  def after_create(record)
    expire_cache_for(record)
  end

  def before_update(record)
    expire_cache_for(record)
  end

  def after_destroy(record)
    expire_cache_for(record)
  end

private

  def expire_cache_for(record)
    if Spud::Photos.config.enable_full_page_caching
      cache_path = File.join(ActionController::Base.page_cache_directory, Spud::Photos.config.base_path)
      if File.directory?(cache_path)
        FileUtils.rm_rf(cache_path)
      end
      if !Spud::Photos.config.page_caches_to_sweep.blank?
        Spud::Photos.config.page_caches_to_sweep.each do |route|
          expire_page(route)
        end
      end
    end
  end

end