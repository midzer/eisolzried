def reverse(array)
    reversed = Array.new(array.count)
    array.each_with_index do |item, index|
      reversed[-(index + 1)] = item
    end
    reversed
end

Jekyll::Hooks.register :site, :post_read do |site|
    posts = site.site_payload['site']['posts']
    revPosts = reverse(posts)
    byIndex = 1
    deIndex = 1
    for post in revPosts do
        if post.data['lang'] == 'by'
            post.data['index'] = byIndex
            byIndex += 1
        end
        if post.data['lang'] == 'de'
            post.data['index'] = deIndex
            deIndex += 1
        end
    end
end
