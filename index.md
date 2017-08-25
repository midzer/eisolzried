---
layout: page
title: Willkommen
lang: de
js:
  - ical.min
  - drcal.min
  - index.min
---

<div class="row">
  <div class="col-sm-4">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="title">{% include icon.html icon="info" %}Intro</h3>
      </div>
<div class="panel-body" markdown="1">
Wir sind eine aktive Feuerwehr aus der Gemeinde Bergkirchen in Oberbayern, die überwiegend aus einem jungen Team besteht. Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt).

Und nun viel Spaß beim Stöbern :)
</div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="title">{% include icon.html icon="activity" %}Neuigkeiten</h3>
      </div>
      <div class="panel-body">
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-sm-4 -->

  <div class="col-sm-8">
    <div class="row">
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-body">
{% include carousel.html %}    
          </div>
        </div>
      </div><!-- col-sm-8 -->
      <div class="col-sm-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="title">{% include icon.html icon="message-circle" %}Chat</h3>
          </div>
          <div class="panel-body">
{% include chat.html %}
          </div>
        </div>
      </div><!-- col-sm-4 -->
    </div><!-- row -->
    <div class="row">
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="title">{% include icon.html icon="calendar" %}Termine</h3>
          </div>
          <div class="panel-body">
{% include calendar.html %}
          </div>
        </div>
      </div><!-- col-sm-8 -->
      <div class="col-sm-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <img class="lazy img-responsive center-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>
            <img class="lazy img-responsive center-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/wappen.png" alt="Wappen Bergkirchen"/>
          </div>
        </div>
      </div><!-- col-sm-4 -->
    </div><!-- row -->
  </div><!-- col-sm-8 -->
</div><!-- row -->
