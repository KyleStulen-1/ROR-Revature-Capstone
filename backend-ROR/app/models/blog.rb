class Blog < ApplicationRecord
  belongs_to :user

  has_many :topics, dependent: :destroy
  has_many :reactions, dependent: :destroy
end
