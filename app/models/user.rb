class User < ApplicationRecord
  has_many :categories
  has_many :games
  has_many :question
  has_secure_password
  validates :email, presence: true

  def to_token_payload
    {
      id: id,
      email: email,
    }
  end
end
