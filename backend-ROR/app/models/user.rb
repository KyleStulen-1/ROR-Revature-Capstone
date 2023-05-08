class User < ApplicationRecord

    validates :first_name, presence: true, format: {without: /\s/}
    validates :last_name, presence: true, format: {without: /\s/}
    validates :email, presence: true, uniqueness: true, format: {without: /\s/}
    validates :password, presence: true, length: { minimum: 6 }

    has_secure_password
    has_many :blogs, dependent: :destroy

    # Used for digesting password within our Tests
    def self.digest(password)
        BCrypt::Password.create(password)
    end

end
