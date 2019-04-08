class AddForeignKey < ActiveRecord::Migration[5.2]
  def change
    add_reference :categories, :user, index: true, foreign_key: true
    add_reference :questions, :user, index: true, foreign_key: true
    add_reference :games, :user, index: true, foreign_key: true
  end
end
