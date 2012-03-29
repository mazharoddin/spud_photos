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

end