
#   create_table "games", force: :cascade do |t|
#     t.integer "score"
#     t.boolean "created_by_user"
#     t.datetime "created_at", null: false
#     t.datetime "updated_at", null: false
#     t.bigint "user_id"
#     t.index ["user_id"], name: "index_games_on_user_id"
#   end

class GamesController < ApplicationController
  before_action :set_game, only: [:update, :destroy]
  before_action :ensure_signed_in

  def index
    games = current_user.games.all
    render json: games
  end

  # GET /games/1
  # def show
  #   @game = user.game
  #   render json: @game
  # end

  # POST /games
  def create
    game = @current_user.games.create!(game_params)
    render json: { game: game }
  end

  # PATCH/PUT /games/1
  def update
    if @game.user == current_user
      @game.update!(game_params)
      render json: @game
    else
      render :unauthorized
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.permit(:user_id, :score)
  end
end
