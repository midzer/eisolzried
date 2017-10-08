---
layout: page
title: Servus
lang: by
js:
  - moreposts
  - chatbox
  - calendar
---

<div class="row">
  <div class="col-md-6 col-xl-4">
    <div class="card">
      <div class="card-header">
        <h2>{% include icon.html icon="info" %}Intro</h2>
      </div>
<div class="card-body" markdown="1">
Oiso, mia san a aktive Feiawea vo da Gmoa Bergkicha in Obabayan, wo de mehra Leid junge Buaschn san. Freile deng ma sauba übn und uns zamhocka, wobei ma a an Duascht ham und wo hifahrn.
{:.card-text}

An dera Webseitn werd oiwei gwerglt; oiso schaug efta nei wennst mogst. Wennst wos wissn wuist, [riahst](/by/kontakt) di hoid.
{:.card-text}

Gnua vazoid, vui Spaß beim Umschaun :)
{:.card-text}
</div>
    </div>
    <div class="card mt-4">
      <div class="card-header">
        <h2>{% include icon.html icon="activity" %}Wos neis gibt</h2>
      </div>
      <div class="card-body">
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-md-6 col-xl-4 -->

  <div class="col-md-6 col-xl-8">
    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
{% include carousel.html %}
          </div>
        </div>
      </div><!-- col-xl-8 -->
      <div class="col-xl-4">
        <div class="card">
          <div class="card-header">
            <h2>{% include icon.html icon="message-circle" %}Chat</h2>
          </div>
          <div class="card-body">
{% include chat.html %}
          </div>
        </div>
      </div><!-- col-xl-4 -->
    </div><!-- row -->
    <div class="row">
      <div class="col-xl-8">
        <div class="card mt-4">
          <div class="card-header">
            <h2>{% include icon.html icon="calendar" %}Wos zum doa is</h2>
          </div>
          <div class="card-body">
{% include calendar.html %}
          </div>
        </div>
      </div><!-- col-xl-8 -->
      <div class="col-xl-4">
        <div class="card mt-4">
          <div class="card-body">
            <img class="lazy img-fluid mx-auto d-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>
            <img class="lazy img-fluid mx-auto d-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/wappen.png" alt="Wappen Bergkirchen"/>
            <img class="lazy img-fluid mx-auto d-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/feuerwehrwappen.png" alt="Bayerisches Feuerwehrwappen"/>
          </div>
        </div>
      </div><!-- col-xl-4 -->
    </div><!-- row -->
  </div><!-- col-md-6 col-xl-8 -->
</div><!-- row -->
