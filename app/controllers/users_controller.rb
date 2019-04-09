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
    @user = User.new({ password: password,
                       email: email,
                       username: username,
                       avatar_id: avatar_id })

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
    # email = params[:email]
    # password = params[:password]
    # username = params[:username]
    # avatar_id = params[:avatar_id]

    # new_user = User.new({
    #   password: password,
    #   email: email,
    #   username: username,
    #   avatar_id: avatar_id,
    # })

    # if new_user.valid?
    #   new_user.save!
    #   user_data = {
    #     username: username,
    #     avatar_id: avatar_id,
    #     email: user.email,
    #     total_score: user.total_score,
    #   }
    #   render json: { user: user_data, token: gen_token(new_user.id) }
    #   session[:user_id] = @user.id
    #   redirect_to @user
    # else
    #   render nothing: true, status: 401
    # end
  end

  # def login
  #   email = params[:email]
  #   password = params[:password]

  #   user = User.find_from_credentials email, password
  #   if user.nil?
  #     render nothing: true, status: 401
  #   else
  #     render json: { user: user, token: gen_token(user.id) }
  #   end
  # end

  # def verify
  #   ensure_signed_in
  #   render json: { user: current_user }
  # end

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

  def user_params
    params.require(:user).permit(:username, :email, :password, :total_score, :password_confirmation)
  end
end
