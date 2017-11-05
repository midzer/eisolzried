---
layout: page
title: Willkommen
permalink: /
lang: de
js:
  - posts
  - chatbox
  - calendar
---

<div class="row">
  <div class="col-md-6 col-lg-5">
    <div class="card">
{% include carousel.html %}
<div class="card-body" markdown="1">
<h2 class="card-title">{% include icon.html icon="info" %}Intro</h2>
Wir sind eine aktive Feuerwehr aus der Gemeinde Bergkirchen in Oberbayern, die überwiegend aus einem jungen Team besteht. Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.
{:.card-text}

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt).
{:.card-text}

Und nun viel Spaß beim Stöbern :)
{:.card-text}
</div>
    </div>
  </div><!-- col-md-6 col-lg-5 -->
  <div class="col-md-6 col-lg-4">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{% include icon.html icon="activity" %}Neuigkeiten</h2>
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-md-6 col-lg-4 -->
  <div class="col-md-6 col-lg-3">
    <div class="card">
      <div class="card-body">
{% include wappen.html %}
      </div>
    </div>
  </div><!-- col-md-6 col-lg-3 -->
</div><!-- row -->
<div class="row top-buffer">
  <div class="col-lg-5">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{% include icon.html icon="calendar" %}Termine</h2>
{% include calendar.html %}
      </div>
    </div>
  </div><!-- col-lg-5 -->
  <div class="col-lg-7">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{% include icon.html icon="message-circle" %}Chat</h2>
{% include chat.html %}
      </div>
    </div>
  </div><!-- col-lg-7 -->
</div><!-- row -->
