Rails.application.routes.draw do

  namespace :spud do
    namespace :admin do
      resources :photos
      resources :photo_albums
      resources :photo_galleries
    end
  end

end