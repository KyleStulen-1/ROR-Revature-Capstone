# frozen_string_literal: true

require_relative '../../../lib/json_web_token'
# Include this module to automatically authenticate users using their token.
# If authentication is successful, the current user can be accessed with @current_user
module Authenticate
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request
    attr_reader :current_user
  end

  private

  def authenticate_request
    Rails.logger.debug("Authentication: Token: #{token}")
    Rails.logger.info('Authentication: Authenticating token')
    token_data = JsonWebToken.decode(token) # Decodes token and obtains user ID
    Rails.logger.debug("Authentication: Current user: #{token_data.inspect}")
    if token_data == 'Invalid Token'
      render json: { error: 'Not Authorized' }, status: 401
    elsif token_data == 'Expired Token'
      render json: { error: 'Token is expired. Please login again.' }, status: 401
    else
      @current_user = User.find(token_data['user_id'])
    end
    # @current_user = User.find(JsonWebToken.decode(token)['user_id'])
    # render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def token
    request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
  end
end
