class BlogController < ApplicationController
  include Authenticate

  def index
    if params[:user_id].to_i == @current_user[:id]
      myBlogs = Blog.where(user_id: @current_user)
      if myBlogs == []
        render json: { message: "No blogs found for user" }, status: :not_found
      else
        render json: myBlogs # need to test when create a blog is updated. created and updated dates are inproper format
      end
    else
      render json: { message: "Invalid user. Token and id does not match" }, status: :unauthorized
    end
  end

  def show
  end

  def create
    Rails.logger.info('Create action: Called')
    input = JSON.parse(request.body.read) # Reads the body of the post request
    Rails.logger.debug("Create action: Data read: #{input.inspect}")
    input[:user_id] = current_user.id # Obtains user id from token, forces proper ownership
    @blog = Blog.new(input)
    if @blog.save
      render json: { message: 'Blog created' }, status: :created
      Rails.logger.info('Create action: Data successfully added to table') # If the data is saved to the database
    else # If user input is somehow wrong (eg. empty fields)
      render json: { message: 'Invalid blog creation' }, status: :unprocessable_entity
      Rails.logger.error('Create action: Input was invalid')
    end
  end

  def update
  end

  def destroy
  end
end
