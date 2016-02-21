module Jekyll
  module CharFilter
    def remove_chars(input)
      input.gsub '&amp;nbsp;',''
    end
  end
end

Liquid::Template.register_filter(Jekyll::CharFilter)

