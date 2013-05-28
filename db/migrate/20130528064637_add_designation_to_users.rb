class AddDesignationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :desgination, :string
  end
end
