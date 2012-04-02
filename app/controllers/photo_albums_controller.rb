class PhotoAlbumsController < ApplicationController

  respond_to :html, :json, :xml
  layout Spud::Photos.base_layout

  def index
    if params[:photo_gallery_id]
      @photo_gallery = SpudPhotoGallery.find_by_url_name(params[:photo_gallery_id])
      if @photo_gallery.blank?
        flash[:error] = 'Photo gallery could not be found!'
        redirect_to photo_galleries_path and return false
      else
        @photo_albums = @photo_gallery.albums.order('created_at desc')
      end
    else
      @photo_albums = SpudPhotoAlbum.order('created_at desc')
    end
    respond_with @photo_albums
  end

  def show
    @photo_album = SpudPhotoAlbum.find_by_url_name(params[:id])
    if @photo_album.blank?
      flash[:error] = "Post not found!"
      if params[:photo_gallery_id]
        redirect_to photo_gallery_photo_albums_path(params[:photo_gallery_id])
      else
        redirect_to photo_albums_path
      end
    else
      respond_with @photo_album
    end
  end

end