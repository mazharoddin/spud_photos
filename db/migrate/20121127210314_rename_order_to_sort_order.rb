class RenameOrderToSortOrder < ActiveRecord::Migration
  def change
    rename_column :spud_photo_albums_photos, :order, :sort_order
    rename_column :spud_photo_galleries_albums, :order, :sort_order
  end
end
