class AddColumnToBlog < ActiveRecord::Migration[7.0]
  def change
    add_reference :blogs, :topics, null: false, foreign_key: true
  end
end
