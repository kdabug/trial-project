class User < ApplicationRecord
  has_many :categories
  has_many :games
  has_many :question
  has_secure_password
  validates :email, :password, presence: true
end
