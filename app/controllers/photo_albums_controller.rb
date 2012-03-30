class PhotoAlbumsController < ApplicationController

  respond_to :html, :json, :xml
  layout Spud::Photos.base_layout
  def index
    if params[:photo_gallery_id]
      @photo_gallery = SpudPhotoGallery.find_by_url_name(params[:photo_gallery_id])
      if @photo_gallery
        @photo_albums = @photo_gallery.albums.order('created_at desc')
      else
        @photo_albums = []
      end
    else
      @photo_albums = SpudPhotoAlbum.order('created_at desc')
    end
    respond_with @photo_albums
  end

  def show
    @photo_album = SpudPhotoAlbum.find_by_url_name(params[:id])
    respond_with @photo_album
  end

end