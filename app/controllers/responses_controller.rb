require "httparty"
require "board"

class ResponsesController < ApplicationController
  skip_before_action :ensure_signed_in, raise: false

  def initialize
    @board = Board.new
  end

  attr_accessor :board

  def get_boards
    allCategories = @board.create_boards(Array.new(15) { rand(1...17500) })
    #puts allCategories
    render json: allCategories
  end

  def get_random
    random = @board.fetch_random()
    puts random
    render json: random
  end
end
