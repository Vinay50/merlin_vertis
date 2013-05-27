class RemoveTeamLeadFromTeamsUsers < ActiveRecord::Migration
  def up
    remove_column :teams_users, :team_lead
  end

  def down
    add_column :teams_users, :team_lead, :string
  end
end
