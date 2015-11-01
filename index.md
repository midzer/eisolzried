---
layout: page
title: Willkommen bei der Feuerwehr Eisolzried
---

Wir sind eine aktive Feuerwehr in Oberbayern, die überwiegend aus einem jungen Team besteht. Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu kontaktieren.

Und nun viel Spaß beim Stöbern :)


<div class="row">
    <div class="col-sm-6">
        <div class="list-group">

<div class="panel-heading" markdown="1">
### Neuigkeiten

<ul class="posts">
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
{% include termine.md %}
</div>

        </div>
    </div>

</div>
