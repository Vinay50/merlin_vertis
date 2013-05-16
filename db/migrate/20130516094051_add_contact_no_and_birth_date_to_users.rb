class AddContactNoAndBirthDateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :contact_no, :string
    add_column :users, :birth_date, :date
  end
end
