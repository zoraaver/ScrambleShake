class User < ApplicationRecord
    has_many :user_games

    validates :email, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }, on: :create

end
