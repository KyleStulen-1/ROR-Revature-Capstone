class Blog < ApplicationRecord
  belongs_to :user

  has_many :topics, cascade: :destroy
  has_many :reactions, cascade: :destroy
end
