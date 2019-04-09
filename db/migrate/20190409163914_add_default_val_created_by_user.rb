class AddDefaultValCreatedByUser < ActiveRecord::Migration[5.2]
  def change
    change_column_default :games, :created_by_user, false
  end
end
