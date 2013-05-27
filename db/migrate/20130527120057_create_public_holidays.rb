class CreatePublicHolidays < ActiveRecord::Migration
  def change
    create_table :public_holidays do |t|
      t.integer :finacial_year_id
      t.date :day
      t.string :occasion

      t.timestamps
    end
  end
end
