class CreateSpudPhotoAlbums < ActiveRecord::Migration
  def change
    create_table :spud_photo_albums do |t|
      t.string :title
      t.string :url_name
      t.timestamps
    end
    create_table :spud_photo_albums_photos, :id => false do |t|
      t.integer :spud_photo_album_id
      t.integer :spud_photo_id
    end
    add_index :spud_photo_albums, :url_name
    add_index :spud_photo_albums_photos, :spud_photo_album_id
  end
end