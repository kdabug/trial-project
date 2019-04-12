class CategoriesController < ApplicationController
  # before_action :authenticate_user, except: [:create]
  before_action :set_category, only: [:update, :destroy]
  before_action :ensure_signed_in

  def index
    categories = current_user.categories.all
    render json: categories
  end

  # GET /categories/1
  # def show
  #   @category = user.category
  #   render json: @category
  # end

  # POST /categories
  def create
    category = @current_user.categories.create!(category_params)
    render json: { category: category }
  end

  # PATCH/PUT /categories/1
  def update
    if @category.user == current_user
      @category.update!(category_params)
      render json: @category
    else
      render :unauthorized
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy
  end

  # GET /categories/mine
  # def mine
  #   @categories = @user.categories
  #   render json: @categories
  # end

  private

  # def set_user
  #   @user = User.find(params[:user_id])
  # end

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.permit(:user_id, :category)
  end
end
