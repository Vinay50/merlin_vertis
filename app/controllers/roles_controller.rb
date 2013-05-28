class RolesController < ApplicationController

def index
	@roles = Role.all
end

def new
 @role = Role.new 
end

def create
  @role  = Role.new(params[:role])
     if @role.save
       flash[:success] = "role created!"
       redirect_to role_path(@role)
   else
        render 'new' 
    end 
end

def show
@role = Role.find(params[:id])
end

def edit

end

def update

end


def destroy

end































end 