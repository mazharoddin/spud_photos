class Spud::Admin::PhotoGalleriesController < Spud::Admin::ApplicationController

  before_filter :get_photo, :only => [:show, :edit, :update, :destroy]

  respond_to :html, :json, :xml

  def index
    @photo_gallerys = SpudPhotoGallery.all
    respond_with @photo_gallerys
  end
  
  def show
    respond_with @photo_gallery
  end
  
  def new
    @photo_gallery = SpudPhotoGallery.new
    respond_with @photo_gallery
  end
  
  def create
    @photo_gallery = SpudPhotoGallery.new(params[:spud_photo_gallery])
    flash[:notice] = 'SpudPhotoGallery created successfully' if @photo_gallery.save
    respond_with @photo_gallery, :location => spud_admin_photo_galleries_path
  end
  
  def edit
    respond_with @photo_gallery
  end
  
  def update
    @photo_gallery.update_attributes(params[:spud_photo_gallery])
    flash[:notice] = 'SpudPhotoGallery updated successfully' if @photo_gallery.save
    respond_with @photo_gallery, :location => spud_admin_photo_galleries_path
  end
  
  def destroy
    flash[:notice] = 'SpudPhotoGallery deleted successfully' if @photo_gallery.destroy
    respond_with @photo_gallery, :location => spud_admin_photo_galleries_path
  end

  def get_photo
    @photo_gallery = SpudPhotoGallery.find(params[:id])
  end

end