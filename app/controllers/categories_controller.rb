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
    render json: @categories
  end

  def show
    @user = User.find(params[:user_id])
    @category = Category.find(params[:id])
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render json: @category
    end
  end

  def edit
    @category = Category.find(params[:id])
    render json: @category
  end

  def update
    @category = Category.find(params[:id])
    @category.update!(category_params)
    if @category.update_attributes(category_params)
      redirect_to user_category_path(@user, @category)
      render json: @category
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
  end

  private

  def category_params
    params.require(:category).permit(:user_id, :category)
  end
end
