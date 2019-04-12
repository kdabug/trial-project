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
  #before_action :set_user, only: [:show, :update, :destroy]
  #before_action :authenticate_user, except: [:new]
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = { id: user_id }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

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
    new_user = User.new(user_params)

    if new_user.valid?
      new_user.save!
      render json: { user: user_data, token: gen_token(new_user.id) }
    else
      render json: nothing: true, status: 401
    end
  end

  def login
    email = params[:email]
    password = params[:password]

    user = User.find_from_credentials email, password
    if user.nil?
      render nothing: true, status: 401
    else 
      render json: {user: user, token: gen_token(user.id)}
    end
  end

  def verify
    ensure_signed_in
    render json: { user: current_user }
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
