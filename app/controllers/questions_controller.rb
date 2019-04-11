class QuestionsController < ApplicationController
  # create_table "questions", force: :cascade do |t|
  #     t.string "question"
  #     t.string "answer"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #     t.bigint "user_id"
  #     t.index ["user_id"], name: "index_questions_on_user_id"
  #   end

  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    @user = User.find(params[:user_id])
    @questions = Question.where(user_id: @user.id)
    render json: @questions
  end

  def index_by_category
    @category = Category.find(params[:category_id])
    @questions = Question.where(category_id: @category.id)
    render json: @questions
  end

  def show
    @user = User.find(params[:user_id])
    @question = Question.find(params[:id])
    render json: @question
  end

  def new
    @user = User.find(params[:user_id])
    @question = Question.new
    render json: @question
  end

  def create
    @user = User.find(params[:user_id])
    @question = Question.new(question_params)

    if @question.save
      render json: @question
      redirect_to user_question_path(@user, @question)
    end
  end

  def edit
    @user = User.find(params[:user_id])
    @question = Question.find(params[:id])
    render json: @question
  end

  def update
    @user = User.find(params[:user_id])
    @question = Question.find(params[:id])
    @question.update!(question_params)
    if @question.update_attributes(question_params)
      redirect_to user_question_path(@user, @question)
    end
    render json: @question
  end

  def destroy
    @question = Question.find(params[:id])
    @user = User.find(params[:user_id])
    @question.destroy
  end

  private

  def question_params
    params.require(:question).permit(:question, :answer, :user_id, :category_id)
  end
end
