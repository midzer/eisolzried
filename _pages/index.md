---
layout: page
title: Willkommen
permalink: /
lang: de
---

<div class="row">
  <div class="col-md-6 col-lg-5">
    <div class="card">
{% include component/carousel.html %}
<div class="card-body" markdown="1">
<h2 class="card-title">{% include element/icon.html icon="info" %} Intro</h2>
Wir sind eine aktive Feuerwehr aus der Gemeinde Bergkirchen in Oberbayern, die überwiegend aus einem jungen Team besteht. Neben regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.
{:.card-text}

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt/).
{:.card-text}

Und nun viel Spaß beim Stöbern :)
{:.card-text}
</div>
    </div>
  </div><!-- col-md-6 col-lg-5 -->
  <div class="col-md-6 col-lg-7">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title">{% include element/icon.html icon="activity" %} Neuigkeiten
        </h2>
{% include component/posts.html %}
      </div>
    </div>
  </div><!-- col-md-6 col-lg-7 -->
</div><!-- row -->
<div class="row top-buffer">
  <div class="col-lg-5">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{% include element/icon.html icon="calendar" %} Termine
        </h2>
{% include component/calendar.html %}
      </div>
    </div>
  </div><!-- col-lg-5 -->
  <div class="col-lg-7">
    <div class="card h-100">
      <div class="card-body d-flex flex-column">
        <h2 class="card-title">{% include element/icon.html icon="message-circle" %} Chat
        </h2>
{% include component/chat.html %}
      </div>
    </div>
  </div><!-- col-lg-7 -->
</div><!-- row -->
<div class="card top-buffer">
  <div class="card-body">
    <h2 class="card-title">{% include element/icon.html icon="globe" %} Feed
    </h2>
{% include component/feed.html %}
  </div>
</div>
{% include element/church.html %}
