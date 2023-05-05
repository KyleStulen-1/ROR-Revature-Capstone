class CreateReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :blogs, null: false, foreign_key: true
      t.integer :react_thumb

      t.timestamps
    end
  end
end
