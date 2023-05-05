class Reaction < ApplicationRecord
  enum react_thumb: [:no_thumb, :thumb_up, :thumb_down]
  belongs_to :user
  belongs_to :blogs
end
