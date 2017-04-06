---
layout: page
title: Willkommen bei der Feuerwehr Eisolzried
customjs:
  - path: /js/ical.min.js
  - path: /js/drcal.min.js
  - path: /js/longlist.min.js
  - path: /js/socket.io.min.js
  - path: /js/index.min.js
    attr: async
lang: de
---

<div class="row">

  <div class="col-sm-4">
   <img src="/assets/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>
  </div>

<div class="col-sm-4" markdown="1">
Wir sind eine aktive Feuerwehr aus der Gemeinde Bergkirchen in Oberbayern, die überwiegend aus einem jungen Team besteht.

Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt).

Und nun viel Spaß beim Stöbern :)
</div>

  <div class="col-sm-4">
   <img src="/assets/wappen.png" alt="Wappen Bergkirchen"/>
  </div>

</div>

<div class="row">

  <div class="col-sm-3">
    <div class="list-group">

<div class="panel-heading" markdown="1">
## Neuigkeiten
<ul id="posts" class="posts">
{% for post in site.posts %}
{% if page.lang == post.lang %}
 <li>
  <span class="post-date">{{ post.date | localize: "%e. %B %Y" }}</span>
  <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
 </li>
{% endif %}
{% endfor %}
</ul>
<p><a href="{{ "/feed.xml" | prepend: site.baseurl }}">RSS abonnieren</a></p>
</div>

    </div>
  </div>

  <div class="col-sm-6">
    <div class="list-group">

<div class="panel-heading" markdown="1">
## Termine
<p><div id="drcal" class="table-responsive"></div></p>
<noscript>Bitte Javascript aktivieren um den Kalender zu sehen</noscript>
<p><a href="{{ "/data/termine.ics" | prepend: site.baseurl }}">iCalendar herunterladen&#9196;</a></p>
<div class="modal fade event-modal" tabindex="-1" role="dialog" aria-labelledby="Termindetails">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
      </div>
    </div>
  </div>
</div>
</div>

    </div>
  </div>

   <div class="col-sm-3">
    <div class="list-group">

<div class="panel-heading" markdown="1">
## Chat
<div class="panel panel-default">
  <div class="panel-body chatbox">
    <ul id="messages"></ul>
  </div>
</div>
<form id="chatform">
<div class="input-group">
  <input id="chatinput" type="text" autocomplete="off" class="form-control" placeholder="schreiben..." aria-label="Chateingabefeld">
  <span class="input-group-btn">
    <button class="btn btn-default" type="submit">Senden</button>
  </span>
</div><!-- /input-group -->
</form>
</div>

    </div>
  </div>

</div>
