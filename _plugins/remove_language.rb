module Jekyll
  module LanguageFilter
    def remove_language(input)
        input.sub(/^(\/)?[by]{2}/,'')
    end
  end
end

Liquid::Template.register_filter(Jekyll::LanguageFilter)

