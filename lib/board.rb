require "httparty"
require "json"

class Board
  include HTTParty

  def create_boards(arr)
    puts arr
    response = []
    arr.each do |i|
      new_category = HTTParty.get("http://jservice.io/api/category", { body: { id: i } })
       new_category
      if new_category["clues"].length > 4
        response = response.push(new_category)
      end
    end
    return response
  end

  def fetch_random()
    response = HTTParty.get("http://jservice.io/api/random")
    random = JSON.generate(response)
    random_parsed = JSON.parse(random)
    return random_parsed
  end
end
