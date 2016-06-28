---
layout: page
title: Willkommen bei der Feuerwehr Eisolzried
customjs:
  - ical.min
  - drcal.min
  - jquery-ui.min
  - longlist.min
  - main.min
---

<div class="row">

  <div class="col-md-4">
   <img src="/assets/taferl.png" alt="Taferl Feuerwehr Eisolzried" height="300" width="276"/>
  </div>

<div class="col-md-4" markdown="1">
{% include intro.md %}
</div>

  <div class="col-md-4">
   <img src="/assets/wappen.png" alt="Wappen Bergkirchen" height="300" width="300"/>
  </div>

</div>

<div class="row">

  <div class="col-sm-6">
    <div class="list-group">

<div class="panel-heading" markdown="1">
## Neuigkeiten
<ul id="posts" class="posts">
{% for post in site.posts %}
 <li>
  <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
  <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
 </li>
{% endfor %}
</ul>
<p><a href="{{ "/feed.xml" | prepend: site.baseurl }}">RSS abonnieren</a></p>
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

