class RolesUser < ActiveRecord::Base
  attr_accessible :role_id, :user_id
  belogs_to => :user
  belogs_to => :role
end
