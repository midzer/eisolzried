---
layout: page
title: Willkommen bei der Feuerwehr Eisolzried
customjs:
  - ical.min
  - drcal.min
  - jquery-ui.min
  - longlist.min
  - jekyll-search.min
  - main
---

<div class="row">

  <div class="col-md-4">
   <img src="/assets/taferl.png" alt="Taferl" height="300" width="276"/>
  </div>

<div class="col-md-8" markdown="1">
{% include intro.md %}
</div>

</div>

<div class="row">

  <div class="col-sm-6">
    <div class="list-group">
<div class="panel-heading" markdown="1">
### Neuigkeiten

<div id="search-container">
 <input type="text" id="search-input" placeholder="Suchen...">
 <ul id="results-container" class="list-unstyled"></ul>
</div>

<ul id="posts" class="posts">
{% for post in site.posts %}
 <li>
  <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
  <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
 </li>
{% endfor %}
</ul>

<p class="rss-subscribe"><a href="{{ "/feed.xml" | prepend: site.baseurl }}">RSS abonnieren</a></p>
</div>

    </div>
  </div>

  <div class="col-sm-6">
    <div class="list-group">

<div class="panel-heading" markdown="1">
{% include calendar.md %}
</div>

    </div>
  </div>

</div>

