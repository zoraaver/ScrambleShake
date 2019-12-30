# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

10.times do 
    User.create(name: Faker::Name.unique.name, email: Faker::Internet.unique.email)
end

5.times do 
    Game.create(score: rand(200))
end


UserGame.create(user_id: 1, game_id: 1, winner: true)
UserGame.create(user_id: 5, game_id: 1, winner: false)
UserGame.create(user_id: 3, game_id: 2, winner: true)
UserGame.create(user_id: 7, game_id: 2, winner: false)
UserGame.create(user_id: 6, game_id: 3, winner: true)
UserGame.create(user_id: 10, game_id: 3, winner: false)
UserGame.create(user_id: 9, game_id: 4, winner: true)
UserGame.create(user_id: 2, game_id: 4, winner: false)
UserGame.create(user_id: 4, game_id: 5, winner: true)
UserGame.create(user_id: 8, game_id: 5, winner: false)





