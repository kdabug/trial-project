class AddForeignKeyQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :questions, :category, index: true
    add_foreign_key :questions, :categories
  end
end
