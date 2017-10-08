---
layout: page
title: Willkommen
lang: de
js:
  - moreposts
  - chatbox
  - calendar
---

<div class="row">
  <div class="col-md-6 col-xl-4">
    <div class="card">
      <h2 class="card-header">{% include icon.html icon="info" %}Intro</h2>
<div class="card-body" markdown="1">
Wir sind eine aktive Feuerwehr aus der Gemeinde Bergkirchen in Oberbayern, die überwiegend aus einem jungen Team besteht. Neben der regelmäßigen Übungen und Dienstbesprechungen, treffen wir uns zu Grillfesten und Ausflügen.
{:.card-text}

Diese Webseite wird ständig weiterentwickelt und überarbeitet; also schau gerne öfter rein. Bei konkreten Fragen scheue Dich nicht uns zu [kontaktieren](/kontakt).
{:.card-text}

Und nun viel Spaß beim Stöbern :)
{:.card-text}
</div>
    </div>
    <div class="card mt-4">
      <h2 class="card-header">{% include icon.html icon="activity" %}Neuigkeiten</h2>
      <div class="card-body">
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-md-6 col-xl-4 -->

  <div class="col-md-6 col-xl-8">
    <div class="row">
      <div class="col-xl-8">
        <div class="card">
{% include carousel.html %}
        </div>
      </div><!-- col-xl-8 -->
      <div class="col-xl-4">
        <div class="card h-100">
          <h2 class="card-header">{% include icon.html icon="message-circle" %}Chat</h2>
          <div class="card-body">
{% include chat.html %}
          </div>
        </div>
      </div><!-- col-xl-4 -->
    </div><!-- row -->
    <div class="row">
      <div class="col-xl-8">
        <div class="card mt-4">
          <h2 class="card-header">{% include icon.html icon="calendar" %}Termine</h2>
          <div class="card-body">
{% include calendar.html %}
          </div>
        </div>
      </div><!-- col-xl-8 -->
      <div class="col-xl-4">
        <div class="card mt-4">
          <div class="card-body">
            <img class="lazy img-fluid mx-auto" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>
            <img class="lazy img-fluid mx-auto" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/wappen.png" alt="Wappen Bergkirchen"/>
            <img class="lazy img-fluid mx-auto" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/feuerwehrwappen.png" alt="Bayerisches Feuerwehrwappen"/>
          </div>
        </div>
      </div><!-- col-xl-4 -->
    </div><!-- row -->
  </div><!-- col-md-6 col-xl-8 -->
</div><!-- row -->
