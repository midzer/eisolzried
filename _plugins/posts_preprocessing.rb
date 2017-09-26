Jekyll::Hooks.register :site, :post_read do |site|
    # assign correct indexes
    # and prev + next item
    revPosts = site.site_payload['site']['posts'].reverse
    byIndex = 1
    deIndex = 1
    revPosts.each_with_index do |item, i|
        if item.data['lang'] == 'by'
            item.data['index'] = byIndex
            byIndex += 1
        else
            item.data['index'] = deIndex
            deIndex += 1
        end

        next_item = nil;
        if i > 1
            next_item = revPosts[i-2]
        end
        
        prev_item = revPosts[i+2]
        
        unless next_item.nil?
            item.data['next_url'] = next_item.url
            item.data['next_title'] = next_item.data['title']
        end
        
        unless prev_item.nil?
            item.data['prev_url'] = prev_item.url
            item.data['prev_title'] = prev_item.data['title']
        end
    end
end
