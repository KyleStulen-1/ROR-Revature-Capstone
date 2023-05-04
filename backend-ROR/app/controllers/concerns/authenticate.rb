# frozen_string_literal: true

require_relative '../../../lib/json_web_token'
module Authenticate
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request
    attr_reader :current_user
  end

  private

  def authenticate_request
    @current_user = User.find(JsonWebToken.decode(token)['user_id'])
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def token
    request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
  end
end