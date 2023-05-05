# frozen_string_literal: true

class JsonWebToken
  def self.encode(payload)
    exp = 24.hour.from_now.to_i
    JWT.encode(payload, Rails.application.secret_key_base, 'HS256', exp: exp)
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' })[0]
  rescue JWT::ExpiredSignature, JWT::VerificationError => e
    raise JWT::ExpiredSignature, e.message
  rescue JWT::DecodeError, JWT::VerificationError => e
    raise JWT::DecodeError, e.message
  end
end
