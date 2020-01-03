class UserGamesController < ApplicationController

    def create
        user_game = UserGame.create(user_id: params[:user_id], score: params[:score], winner: params[:winner])
        render json: user_game
    end

    def index
        user_games = UserGame.all
        render json: user_games
    end
end
