class CategoriesController < ApplicationController
  before_action :authenticate_user!, except: [:new, :create]
  before_action :set_category, only: [:update, :destroy]

  # create_table "categories", force: :cascade do |t|
  #     t.string "category"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #     t.bigint "user_id"
  #     t.index ["user_id"], name: "index_categories_on_user_id"
  #   end

  def index
    @categories = Categories.where(user_id: @user.id)
    render json: @categories
  end

  # GET /categories/1
  def show
    @category = @user.category
    render json: @category
  end

  # POST /categories
  def create
    @category = Category.new(category_params)

    if @category.save
      render json: @category, status: :created, location: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy
  end

  # GET /categories/mine
  def mine
    @categories = @user.categories

    render json: @categories
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

  def category_params
    params.require(:category).permit(:user_id, :category)
  end
end
