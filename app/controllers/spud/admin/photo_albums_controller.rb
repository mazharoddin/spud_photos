class Spud::Admin::PhotoAlbumsController < Spud::Admin::ApplicationController

  before_filter :get_album, :only => [:show, :edit, :update, :destroy]
  before_filter :get_photos, :only => [:new, :create, :edit, :update]
  respond_to :html, :json, :xml
  layout 'spud/admin/spud_photos'

  def index
    @photo_albums = SpudPhotoAlbum.all
    respond_with @photo_albums
  end

  def show
    respond_with @photo_album
  end

  def new
    @photo_album = SpudPhotoAlbum.new
    respond_with @photo_album
  end

  def create
    @photo_album = SpudPhotoAlbum.new(params[:spud_photo_album])
    flash[:notice] = 'SpudPhotoAlbum created successfully' if @photo_album.save
    respond_with @photo_album, :location => spud_admin_photo_albums_path
  end

  def edit
    respond_with @photo_album
  end

  def update
    @photo_album.update_attributes(params[:spud_photo_album])
    flash[:notice] = 'SpudPhotoAlbum updated successfully' if @photo_album.save
    respond_with @photo_album, :location => spud_admin_photo_albums_path
  end

  def destroy
    flash[:notice] = 'SpudPhotoAlbum deleted successfully' if @photo_album.destroy
    respond_with @photo_album, :location => spud_admin_photo_albums_path
  end

  def get_album
    @photo_album = SpudPhotoAlbum.find(params[:id])
  end

  def get_photos
    @photos = SpudPhoto.all
  end

end