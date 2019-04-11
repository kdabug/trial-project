class UsersController < ApplicationController
  # create_table "users", force: :cascade do |t|
  #     t.string "username"
  #     t.string "email"
  #     t.string "password_digest"
  #     t.integer "total_score", default: 0
  #     t.integer "avatar_id"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #   end
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.

  def user_params
    params.require(:user).permit(:username, :email, :password, :total_score, :password_confirmation)
  end
end
