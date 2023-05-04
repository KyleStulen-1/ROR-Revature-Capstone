class BlogController < ApplicationController

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
  end

  def update
    @logger.info('Finding record to update...')

    sample = JSON.parse(request.body.read)
    
    #find if blog exists on the database
    record = Blog.find(sample['id'])
    if record !=nil
      @logger.info("Updating record on record #{sample['id']}")

      #update the time stamp
      # date = Time.now.getutc
      # sample.merge!({'updated_at'=> date})

      #Update the record if possible
      if record.update(sample)
        @logger.info("Successfully updated record at ID: #{sample['id']}!")
        return {status: 200, body: {message: 'Blod updated successfully'}}
        head :ok
      else
        @logger.info("Failed to update record at ID: #{sample['id']}!")
        return {status: :unprocessable_entity, body: {message: 'Invalid email or password'}} 
      end


    else
      @logger.info("Cannot find record")
      return {status: :no_content}
    end
  end

  def destroy
  end
end
