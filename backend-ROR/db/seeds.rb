# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(first_name: "kyle", last_name: "stulen", email: "kyle.stulen@gmail.com", password: 'password123')

topics = [
  "Artificial Intelligence",
  "Data Science",
  "Computer Networks",
  "Algorithms",
  "Database Systems",
  "Computer Architecture",
  "Operating Systems",
  "Computer Graphics",
  "Computer Vision",
  "Human-Computer Interaction",
  "Software Engineering",
  "Computer Security",
  "Programming Languages",
  "Parallel Computing",
  "Computer Ethics",
  "Distributed Systems",
  "Internet of Things (IoT)",
  "Cloud Computing",
  "Big Data",
  "Computer-Based Education",
  "Virtual Reality",
  "Augmented Reality",
  "Blockchain Technology",
  "Machine Learning",
  "Natural Language Processing",
  "Computer Games",
  "Robotics",
  "Cybersecurity",
  "Quantum Computing",
  "Digital Forensics"
]

topics.each do |topic|
  Topic.create!(
    name: topic
  )
end

user = User.find_by(first_name: 'kyle')

Blog.create!(title: 'making up a title', 
content: 'making the content work one of three ways...', 
user_id: user.id, 
topics_id: Topic.find_by(name: 'Robotics').id, 
view_count: 5)

Blog.create!(title: 'Why water is good for you!', 
content: 'Here are a few facts of why water is good for you...', 
user_id: user.id, 
topics_id: Topic.find_by(name: 'Augmented Reality').id, 
view_count: 15)

Blog.create!(title: 'What is the best programming language for you?', 
content: 'There are few programming languages that you might be interseted in...', 
user_id: user.id, 
topics_id: Topic.find_by(name: 'Programming Languages').id, 
view_count: 2)