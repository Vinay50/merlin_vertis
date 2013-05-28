class TeamsUser < ActiveRecord::Base
  attr_accessible :team_id, :team_lead, :user_id
end
