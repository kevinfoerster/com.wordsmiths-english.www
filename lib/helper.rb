include Nanoc3::Helpers::Blogging
require 'pp'

module CustomHelpers
  def format_date(date)
    Time.parse(date).strftime("%d %B %Y")    
  end

  # def link_to(text, item, html_class = nil)
  #   "<a href='#{item.path}' class='#{html_class}'>#{text}</a>"
  # end

  def sorted_articles_by_filename
    # puts articles.first.to_yaml
    puts articles.first.inspect
    articles.sort_by do |a|
      File.basename(a[:filename])
    end
    puts articles.last
    articles
  end
  def article?(item)
    item[:kind] == 'article'
  end
end

include CustomHelpers