class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])

        render json: user.to_json(include: {
            user_games: {only: [:winner, :score]}
        }, except: [:created_at, :updated_at])
    end

    def create
        user = User.find_by(email: params[:email])
        if !user
            if params[:name] != '' && params[:email] !=''
                user = User.create(name: params[:name], email: params[:email])
            end 
        end
        render json: user.to_json(include: {
            user_games: {only: [:winner, :score]}
        }, except: [:created_at, :updated_at])
    end
   
end
