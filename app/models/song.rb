class Song < ActiveRecord::Base
  has_many :votes
end