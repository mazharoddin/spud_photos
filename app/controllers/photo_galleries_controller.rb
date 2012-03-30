class PhotoGalleriesController < ApplicationController

  respond_to :html, :json, :xml
  layout Spud::Photos.base_layout
  def index
    @photo_galleries = SpudPhotoGallery.order('created_at desc').includes(:albums)
    respond_with @photo_galleries
  end

  def show
    @photo_gallery = SpudPhotoGallery.find_by_url_name(params[:id])
    respond_with @photo_gallery
  end

end