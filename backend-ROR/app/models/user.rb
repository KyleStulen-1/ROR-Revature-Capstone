class User < ApplicationRecord

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }

    has_secure_password
    has_many :blogs, dependent: :destroy
end
