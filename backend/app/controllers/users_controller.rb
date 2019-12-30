class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])

        render json: user.to_json(include: {
            games: {except: [:created_at, :updated_at]},
            user_games: {only: :winner}
        }, except: [:created_at, :updated_at])
    end
end
