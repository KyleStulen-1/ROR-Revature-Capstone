class BlogController < ApplicationController

  include Authenticate
  def initialize
    super
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::DEBUG

  end
  

  def index
    myBlogs = Blog.includes(:user).where(user_id: params[:user_id])
    render json: myBlogs.as_json({ include: { user: { only: [:first_name, :last_name] } } }) # need to test when create a blog is updated. created and updated dates are inproper format
  end

  def show
    Rails.logger.info('Show action: Called')
    @user = User.find(params[:user_id])
    return render json: { message: 'User does not exist' }, status: :unprocessable_entity unless @user

    Rails.logger.debug("Show action: User: #{@user.id}")
    @blog = @user.blogs.find(params[:id])
    if @blog
      blog = @blog.as_json
      blog[:user] = @user.as_json({ only: [:first_name, :last_name] })
      Rails.logger.debug("Show action: Blog: #{@blog.id}")
      render json: blog, status: :ok
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
    input[:view_count] = 0
    @blog = Blog.new(input)
    if @blog.save
      render json: { message: 'Blog created' }, status: :created
      Rails.logger.info('Create action: Data successfully added to table') # If the data is saved to the database
    else # If user input is somehow wrong (eg. empty fields)
      render json: { message: 'Invalid blog creation' }, status: :unprocessable_entity
      Rails.logger.error('Create action: Input was invalid')
    end
  end

  def update_viewcount
    Rails.logger.info("Update view count action: Updating view count on record #{params['blog_id']}")
    @blog = Blog.where(id: params['blog_id']).first

    if @blog
      Rails.logger.info("Update view count action: blog found")

      #Update the record if possible
      @blog.update(view_count: @blog.view_count+1)
      Rails.logger.info("Update view count action: Successfully updated view count at ID: #{params['blog_id']}!")
      return render json: {message: 'Blog updated successfully'}, status: 200
  
    else
      Rails.logger.info("Update view count action: Cannot find blog")
      return render json: {message: 'cannot find blog'}, status: :unprocessable_entity
    end
  
  end

  def update
    Rails.logger.info('Update action: Finding record to update...')
    
    #find if blog exists on the database
    @blog = Blog.where(id: params['id']).first
    
    
    

    if @blog
      Rails.logger.info("Update action: Updating record on record #{params['id']}")

      #check the user
      unless owns?
        return render json: {message: "current user does not equal user_id"}, status: 401
      end

      #Update the record if possible
      if @blog.update(blog_params)
        Rails.logger.info("Update action: Successfully updated record at ID: #{params['id']}!")
        return render json: {message: 'Blog updated successfully'}, status: 200
        
      else
        Rails.logger.info("Update action: Failed to update record at ID: #{params['id']}!")
        return render json: {message: 'Invalid content, title, or view count'}, status: :unprocessable_entity
      end

    else
      Rails.logger.info("Update action: Cannot find blog")
      return render json: {message: 'cannot find blog'}, status: :unprocessable_entity
    end

  end

  def destroy
    Rails.logger.info('Delete Action: Called')
    @blog = Blog.find(params[:id])
    if owns?
      Rails.logger.info('Delete Action: Authorized')
      @blog.destroy
      head :ok
      Rails.logger.info('Delete Action: Blog deleted from database')
    else
      render json: { message: 'You are not authorized to delete this blog' }, status: :unauthorized
      Rails.logger.warn('Delete Action: User does not own')
    end

  end

  def indexall
    @blogs = Blog.includes(:user)
    return render json: @blogs.as_json(include: { user: { only: %i[first_name last_name] } })
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

  def blog_params
    return params.permit(:content, :title)
  end

  
end
