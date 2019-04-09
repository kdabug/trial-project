class CategoriesController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  # create_table "categories", force: :cascade do |t|
  #     t.string "category"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #     t.bigint "user_id"
  #     t.index ["user_id"], name: "index_categories_on_user_id"
  #   end

  def index
    @user = User.find(params[:user_id])
    @categories = Category.where(user_id: @user.id)
  end

  def show
    @user = User.find(params[:user_id])
    @category = Category.find(params[:id])
  end

  def new
    @user = User.find(params[:user_id])
    @category = Category.new
  end

  def create
    @user = User.find(params[:user_id])
    @category = Category.new(category_params)
    if @category.save
      redirect_to user_category_path(@user, @category)
    end
  end

  def edit
    @user = User.find(params[:user_id])
    @category = Category.find(params[:id])
  end

  def update
    @user = User.find(params[:user_id])
    @category = Category.find(params[:id])
    if @category.update_attributes(category_params)
      redirect_to user_category_path(@user, @category)
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @user = User.find(params[:user_id])
    @category.destroy
    redirect_to user_categories_path(@user)
  end

  private

  def category_params
    params.require(:category).permit(:user_id)
  end
end
