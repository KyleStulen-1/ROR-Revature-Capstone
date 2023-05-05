class Blog < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true
  validates :view_count, presence: true, numericality: { only_integer: true, no_strings: true}

  has_many :topics, dependent: :destroy
  has_many :reactions, dependent: :destroy
end
