class AddDefaultVal < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :total_score, 0
  end
end
