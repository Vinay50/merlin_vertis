class CreateFinancialYears < ActiveRecord::Migration
  def change
    create_table :financial_years do |t|
      t.string :finacial_year_name
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
