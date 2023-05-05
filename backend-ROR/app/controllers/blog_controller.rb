class BlogController < ApplicationController

  include Authenticate
  def initialize
    super
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::DEBUG

  end
  

  def index
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
    @logger.info('Finding record to update...')

    sample = JSON.parse(request.body.read)
    #check the user


    #find if blog exists on the database
    record = Blog.find(params['id'])
    if record !=nil
      @logger.info("Updating record on record #{params['id']}")


      #Update the record if possible
      if record.update(sample)
        @logger.info("Successfully updated record at ID: #{params['id']}!")
        return {status: 200, body: {message: 'Blog updated successfully'}}
        
      else
        @logger.info("Failed to update record at ID: #{params['id']}!")
        return {status: :unprocessable_entity, body: {message: 'Invalid email or password'}} 
      end


    else
      @logger.info("Cannot find record")
      return {status: :no_content}
    end
  end

  def destroy
  end

  def indexall
    @blog = Blog.all
    return json: {blogs: {@blog}}
  end
end
