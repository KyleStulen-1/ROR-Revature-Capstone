class BlogController < ApplicationController
  include Authenticate

  def index
    if params[:user_id].to_i == @current_user[:id]
      myBlogs = Blog.where(user_id: @current_user)
      render json: myBlogs # need to test when create a blog is updated. created and updated dates are inproper format
    else
      render json: { message: "Invalid user. Token and id does not match" }, status: :unauthorized
    end
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
    input[:user_id] = @current_user.id # Obtains user id from token, forces proper ownership
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
    Rails.logger.info('Delete Action: Called')
    @blog = Blog.find(params[:id])
    if owns?
      Rails.logger.info('Delete Action: Authorized')
      @blog.delete
      head :ok
      Rails.logger.info('Delete Action: Blog deleted from database')
    else
      render json: { error: 'You are not authorized to delete this blog' }, status: :unauthorized
      Rails.logger.warn('Delete Action: User does not own')
    end

  end

  private

  def owns?
    if @blog.user_id == @current_user.id
      Rails.logger.info('Ownership check: User owns chosen blog')
      true
    else
      Rails.logger.info('Ownership check: User does not own chosen blog')
      false
    end
  end

  def indexall
  end
end
