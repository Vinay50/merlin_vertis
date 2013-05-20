class AddIsHrToUsers < ActiveRecord::Migration
  def change
    add_column :users, :is_hr, :boolean
  end
end
