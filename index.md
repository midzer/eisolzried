---
layout: page
title: Willkommen bei der Feuerwehr Eisolzried
customjs:
  - jekyll-search.min
---

![Taferl](/assets/taferl.png){: .pull-left style="margin-right: 10px"}

{:intro: .clearfix}
Wir sind eine aktive Feuerwehr in Oberbayern, die überwiegend aus einem jungen Team besteht.

Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt).

Und nun viel Spaß beim Stöbern :)
{: intro}

<div class="row">
    <div class="col-sm-6">
        <div class="list-group">

<div id="news" class="panel-heading" markdown="1">
### Neuigkeiten

<div id="search-container">
  <input type="text" id="search-input" placeholder="Suchen...">
  <ul id="results-container"></ul>
</div>
<script type="text/javascript">
      SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: 'search.json',
        searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
        noResultsText: 'Keine Suchergebnisse',
        limit: 10,
        fuzzy: false,
        exclude: ['Welcome']
      })
</script>

<ul id="posts" class="posts">
{% for post in site.posts %}
  <li>
    <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>

<script type="text/javascript">
  longlist(document.getElementById('news'), document.getElementById('posts'), {'perPage': 6});
</script>
<style type="text/css">
  .paging-controls {text-align: center;}
  .paging-controls a {color: #de002a;}
  .paging-controls a:visited {color: #ae002a;}
  .paging-controls .prev {float: left;}
  .paging-controls .prev:before {content: "< neuere";}
  .paging-controls .next {float: right;}
  .paging-controls .next:after {content: "ältere >";}
  .paging-controls .elipsis:before {content: " ... ";}
</style>

<p class="rss-subscribe"><a href="{{ "/feed.xml" | prepend: site.baseurl }}">RSS abonnieren</a></p>
</div>

        </div>
    </div>
    <div class="col-sm-6">
        <div class="list-group">

<div class="panel-heading" markdown="1">
{% include termine.md %}
</div>

        </div>
    </div>

</div>
