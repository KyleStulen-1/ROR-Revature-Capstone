class Blog < ApplicationRecord
  belongs_to :user


  validates :title, presence: true

  has_many :topics, dependent: :destroy
  has_many :reactions, dependent: :destroy
end
