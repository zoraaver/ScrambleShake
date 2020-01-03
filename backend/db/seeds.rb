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

UserGame.create(user_id: 1, winner: true, score: 200)
UserGame.create(user_id: 5, winner: false, score: 0)
UserGame.create(user_id: 3, winner: true, score: 200)
UserGame.create(user_id: 7, winner: false, score: 0)
UserGame.create(user_id: 6, winner: true, score: 200)
UserGame.create(user_id: 10, winner: false, score: 0)
UserGame.create(user_id: 9, winner: true, score: 200)
UserGame.create(user_id: 2, winner: false, score: 0)
UserGame.create(user_id: 4, winner: true, score: 200)
UserGame.create(user_id: 8, winner: false, score: 0)





