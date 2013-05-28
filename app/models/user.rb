class User < ActiveRecord::Base
 has_many :roles,  :through => :role_users
 has_many :role_users
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :email, :password, :password_confirmation, 
  :remember_me, :first_name, :last_name, :is_admin, :contact_no, :birth_date,
   :joining_date, :is_active, :is_hr, :is_manager, :user_code, :designation
  # attr_accessible :title, :body
end
