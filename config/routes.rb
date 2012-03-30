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

  if Spud::Photos.config.galleries_enabled
    resources :photo_galleries, :only => [:index, :show], :path => 'galleries' do
      resources :photo_albums, :only => :show, :path => '/'
    end
  end

  resources :photo_albums, :only => [:index, :show], :path => 'photos'

end