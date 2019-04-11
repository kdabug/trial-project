# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

guest = User.create({ username: "bob", email: "bob@gmail.com", password: "bob", avatar_id: 4 })

bob_tick_category = Category.create(category: "starts with a tick")

bob_other_categories = Category.create([{ category: "My 6th gr. yr" }, { category: "drama llama mama" }, { category: "all questions end with an arrrr" }, { category: "gypsy lyfe" }, { category: "starts with a tick" }, { category: "my borderline-unhealthy obsessions" }])
bob_tick_questions = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])

guest.categories.push(bob_tick_category)
guest.categories.push(bob_other_categories)
guest.question.push(bob_tick_questions)
bob_tick_category.questions.push(bob_tick_questions)
