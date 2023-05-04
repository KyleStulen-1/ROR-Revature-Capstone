class UserController < ApplicationController
  def create
    user = User.new
    user.email = params[:email]
    user.password = params[:password]
    user.first_name = params[:first_name]
    user.last_name = params[:last_name]
    user.save
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end

  def destroy
  end
end
