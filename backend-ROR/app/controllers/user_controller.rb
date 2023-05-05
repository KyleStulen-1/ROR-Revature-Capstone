class UserController < ApplicationController
  def create
    user = User.new
    user.email = params[:email]
    user.password = params[:password]
    user.first_name = params[:first_name]
    user.last_name = params[:last_name]
    if user.save
      render json: {message: "User created successfully"}, status: 200
    else
      render status: 400, json: user.errors
    end
  end

  def destroy
  end
end
