class PhotoAlbumsController < ApplicationController

  respond_to :html, :json, :xml

  def index
    if params[:photo_gallery_id]
      gallery = SpudPhotoGallery.find_by_url_name(params[:photo_gallery_id])
      if gallery
        @photo_albums = SpudPhotoGallery.find_by_url_name(params[:photo_gallery_id]).albums.order('created_at desc')
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