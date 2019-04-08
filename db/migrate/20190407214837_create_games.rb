class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :score
      t.boolean :created_by_user

      t.timestamps
    end
  end
end
