class Role < ActiveRecord::Base
  attr_accessible :name
  has_many :users,  :through => :role_users
  has_many :role_users
end
