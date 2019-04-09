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

  # def gen_token(user_id)
  #   payload = { id: user_id }
  #   JWT.encode(payload, Rails.application.secrets.secret_key_base)
  # end

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to @user
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :total_score, :password_confirmation)
  end
end
