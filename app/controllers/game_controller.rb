
#   create_table "games", force: :cascade do |t|
#     t.integer "score"
#     t.boolean "created_by_user"
#     t.datetime "created_at", null: false
#     t.datetime "updated_at", null: false
#     t.bigint "user_id"
#     t.index ["user_id"], name: "index_games_on_user_id"
#   end

class GamesController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @games = Game.where(user_id: @user.id)
  end

  def show
    @user = User.find(params[:user_id])
    @game = Game.find(params[:id])
  end

  def new
    @user = User.find(params[:user_id])
    @game = Game.new
  end

  def create
    @user = User.find(params[:user_id])
    @game = Game.new(game_params)
    if @game.save
      redirect_to user_game_path(@user, @game)
    end
  end

  def edit
    @user = User.find(params[:user_id])
    @game = Game.find(params[:id])
  end

  def update
    @user = User.find(params[:user_id])
    @game = Game.find(params[:id])
    if @game.update_attributes(game_params)
      redirect_to user_game_path(@user, @game)
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @user = User.find(params[:user_id])
    @game.destroy
    redirect_to user_games_path(@user)
  end

  private

  def game_params
    params.require(:game).permit(:score, :user_id)
  end
end
