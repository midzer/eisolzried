---
layout: page
title: Willkommen
js:
  - ical.min
  - bundleIndex.min
lang: de
---

<div class="row">
  <div class="col-sm-5">
{% include carousel.html %}
  </div>

  <div class="col-sm-7" markdown="1">
Wir sind eine aktive Feuerwehr aus der Gemeinde Bergkirchen in Oberbayern, die überwiegend aus einem jungen Team besteht. Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt).

Und nun viel Spaß beim Stöbern :)

  <div class="row">
    <div class="col-sm-6">
      <img class="lazy" data-src="/assets/images/index/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>    
    </div>
    <div class="col-sm-6">
      <img class="lazy" data-src="/assets/images/index/wappen.png" alt="Wappen Bergkirchen"/>
    </div>
  </div>

  </div><!-- col-sm-7 -->
</div><!-- row -->

<div class="row top-buffer">
  
  <div class="col-sm-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="title">Neuigkeiten</h3>
      </div>
      <div class="panel-body">
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-sm-3 -->

  <div class="col-sm-6">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="title">Termine</h3>
      </div>
      <div class="panel-body">
{% include calendar.html %}
      </div>
    </div>
  </div><!-- col-sm-6 -->
  
  <div class="col-sm-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="title">Chat</h3>
      </div>
      <div class="panel-body">
{% include chat.html %}
      </div>
    </div>
  </div><!-- col-sm-3 -->

</div><!-- row -->
