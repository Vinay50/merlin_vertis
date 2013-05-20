class CreateLeaves < ActiveRecord::Migration
  def change
    create_table :leaves do |t|
      t.integer :user_id
      t.date :start_date
      t.date :end_date
      t.string :description
      t.string :status
      t.float :unpaid_leaves
      t.float :number_of_paid_leaves_taken
      t.float :number_of_unpaid_leaves_taken
      t.float :number_of_leaves_remaining

      t.timestamps
    end
  end
end
