class CreateSpudPhotoStyles < ActiveRecord::Migration
  def change
    create_table :spud_photo_styles do |t|
      t.integer :spud_photo_id
      t.string :name
      t.integer :x
      t.integer :y
      t.integer :width
      t.integer :height
      t.timestamps
    end
    add_index :spud_photo_styles, :spud_photo_id
  end
end