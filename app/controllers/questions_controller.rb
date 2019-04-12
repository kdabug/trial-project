class QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :update, :destroy]
  before_action :ensure_signed_in

  def index
    questions = current_user.question.all
    render json: questions
  end

  # GET /questions/1
  # def show
  #   @question = user.question
  #   render json: @question
  # end

  # POST /questions
  def create
    question = @current_user.question.create!(question_params)
    render json: { question: question }
  end

  # PATCH/PUT /questions/1
  def update
    if @question.user == current_user
      @question.update!(question_params)
      render json: @question
    else
      render :unauthorized
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy
  end

  # GET /questions/mine
  # def mine
  #   @questions = @user.questions
  #   render json: @questions
  # end

  private

  # def set_user
  #   @user = User.find(params[:user_id])
  # end

  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.permit(:user_id, :question, :answer, :category_id)
  end
end
