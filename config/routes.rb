Rails.application.routes.draw do

  namespace :spud do
    namespace :admin do
      resources :photos do
        post 'mass_destroy', :on => :collection
      end
      resources :photo_albums
      resources :photo_galleries
    end
  end

  scope Spud::Photos.config.base_path do
    if Spud::Photos.config.galleries_enabled
      resources :photo_galleries, :only => [:index, :show], :path => '/' do
        resources :photo_albums, :only => :show, :path => '/'
      end
    else
      resources :photo_albums, :only => [:index, :show], :path => '/'
    end
  end

end