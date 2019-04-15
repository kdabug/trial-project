Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/users/verify", to: "users#verify"
  post "/users/login", to: "users#login"
  # scope "/api" do
  resources :users
  resources :categories
  resources :questions
  resources :games

  get "/get-boards", to: "responses#get_boards"
  get "/get-random", to: "responses#get_random"
  # post "user_token" => "user_token#create"
  # end

  # get "sessions/new"

  # get "/logout", to: "sessions#destroy"
  # get "/login", to: "sessions#new"

  # post "/login" => "sessions#create"
end
