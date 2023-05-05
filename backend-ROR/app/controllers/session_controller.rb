# frozen_string_literal: true
require_relative '../../lib/json_web_token'

class SessionController < ApplicationController
  def create
    begin
      credentials = JSON.parse(request.body.read)
    rescue JSON::ParserError => e
      Rails.logger.error(e.message)
      return head :unauthorized
    end
    user = User.where(email: credentials['email']).first
    return head :unauthorized unless user

    if user.authenticate(credentials['password'])
      render json: { token: JsonWebToken.encode(user_id: user.id), user_id: user.id,
                     first_name: user.first_name, last_name: user.last_name }, status: :created
    else
      head :unauthorized
    end
  end
  def destroy
  end
end
