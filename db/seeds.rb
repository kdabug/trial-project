# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

guest = User.create({ username: "bob", email: "bob@gmail.com", password: "bob", avatar_id: 4 })

category1 = Category.create(category: "starts with a tick")
category2 = Category.create(category: "another1")
category3 = Category.create(category: "my dog and his moods")
category4 = Category.create(category: "long johns")
category5 = Category.create(category: "periodic tables")
category6 = Category.create(category: "truancy")

bob_other_categories = Category.create([{ category: "My 6th gr. yr" }, { category: "drama llama mama" }, { category: "all questions end with an arrrr" }, { category: "gypsy lyfe" }, { category: "starts with a tick" }, { category: "my borderline-unhealthy obsessions" }])
questions1 = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])
questions2 = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])
questions3 = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])
questions4 = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])
questions5 = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])
questions6 = Question.create([{ question: "an ailment", answer: "tourettes" }, { question: "pure blood?", answer: "a tick" }, { question: "time management", answer: "clock" }, { question: "getting angry", answer: "ticked off" }, { question: "invest in stocks", answer: "ticker symbol" }, { question: "ticked something off of this list", answer: "to-do" }])

guest.categories.push(category1, category2, category3, category4, category5, category6)
guest.question.push(questions1, questions2, questions3, questions4, questions5, questions6)

guest.categories.push(bob_other_categories)
guest.question.push(questions1)
category1.questions.push(questions1)
category2.questions.push(questions2)
category3.questions.push(questions3)
category4.questions.push(questions4)
category5.questions.push(questions5)
category6.questions.push(questions6)
