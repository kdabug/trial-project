class QuestionsController < ApplicationController
  # create_table "questions", force: :cascade do |t|
  #     t.string "question"
  #     t.string "answer"
  #     t.datetime "created_at", null: false
  #     t.datetime "updated_at", null: false
  #     t.bigint "user_id"
  #     t.index ["user_id"], name: "index_questions_on_user_id"
  #   end
  before_action :set_question, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    @questions = Question.all

    render json: @questions
  end

  # GET /questions/1
  def show
    render json: @question
  end

  # POST /questions
  def create
    @question = current_user.questions.new(question_params)

    if @question.save
      render json: @question, status: :created, location: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions/1
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy
  end

  # GET /questions/mine
  def mine
    @questions = current_user.questions

    render json: @questions
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:question, :answer, :user_id, :category_id)
  end
end
