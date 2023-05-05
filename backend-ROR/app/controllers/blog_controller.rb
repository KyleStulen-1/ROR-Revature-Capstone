class BlogController < ApplicationController
  include Authenticate

  def index
  end

  def show
    Rails.logger.info('Show action: Called')
    @user = User.find(params[:user_id])
    return render json: { message: 'User does not exist' }, status: :unprocessable_entity unless @user
    Rails.logger.debug("Show action: User: #{@user.id}")
    @blog = @user.blogs.find(params[:id])
    if @blog
      Rails.logger.debug("Show action: Blog: #{@blog.id}")
      render json: {blog: @blog}, status: :ok
    else
      render json: { message: 'Blog does not exist' }, status: :unprocessable_entity
      Rails.logger.error('Show action: Input was invalid')
    end
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

  def indexall
  end
end
