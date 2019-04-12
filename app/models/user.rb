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
      username: username,
      total_score: total_score,
      avatar_id: avatar_id,
    }
  end

  def self.find_from_credentials(email, password)
    user = self.find_by(email: email)
    return nil unless user
    user if user.is_password?(password)
  end

  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end

  # def self.from_token_payload(payload)
  #   # Returns a valid user, `nil` or raise
  #   # e.g.
  #   #   self.find payload["sub"]
  # end
end
