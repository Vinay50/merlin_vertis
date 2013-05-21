class AddIsActiveAndJoiningDateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :is_active, :boolean
    add_column :users, :joining_date, :date
  end
end
