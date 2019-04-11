class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :update, :destroy]
  # create_table "categories", force: :cascade do |t|
  #     t.string "category"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #     t.bigint "user_id"
  #     t.index ["user_id"], name: "index_categories_on_user_id"
  #   end

  def index
    @categories = Category.all

    render json: @categories
  end

  # GET /categories/1
  def show
    render json: @category
  end

  # POST /categories
  def create
    @category = current_user.categories.new(category_params)

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
    @categories = current_user.categories

    render json: @categories
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:user_id, :category)
  end
end
