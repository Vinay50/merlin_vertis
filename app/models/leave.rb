class Leaves < ActiveRecord::Base
  attr_accessible :description, :end_date, :number_of_leaves_remaining, :number_of_paid_leaves_taken, :number_of_unpaid_leaves_taken, :start_date, :status, :unpaid_leaves, :user_id
end
