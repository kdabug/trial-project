class QuestionsController < ApplicationController
  # create_table "questions", force: :cascade do |t|
  #     t.string "question"
  #     t.string "answer"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #     t.bigint "user_id"
  #     t.index ["user_id"], name: "index_questions_on_user_id"
  #   end

  before_action :authenticate_user!

  def index
    @category = Category.find(params[:category_id])
    @questions = Question.where(category_id: @category.id)
  end

  def show
    @category = Category.find(params[:category_id])
    @question = Question.find(params[:id])
  end

  def new
    @category = Category.find(params[:category_id])
    @question = Question.new
  end

  def create
    @category = Category.find(params[:category_id])
    @question = Question.new(question_params)
    if @question.save
      redirect_to category_question_path(@category, @question)
    end
  end

  def edit
    @category = Category.find(params[:category_id])
    @question = Question.find(params[:id])
  end

  def update
    @category = Category.find(params[:category_id])
    @question = Question.find(params[:id])
    if @question.update_attributes(question_params)
      redirect_to category_question_path(@category, @question)
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @category = Category.find(params[:category_id])
    @question.destroy
    redirect_to category_questions_path(@category)
  end

  private

  def question_params
    params.require(:question).permit(:title, :body, :category_id)
  end
end
