class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.integer :total_score
      t.integer :avatar_id

      t.timestamps
    end
  end
end
