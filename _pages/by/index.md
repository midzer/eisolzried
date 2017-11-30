---
layout: page
title: Servus
permalink: /by/
lang: by
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
Oiso, mia san a aktive Feiawea vo da Gmoa Bergkicha in Obabayan, wo de mehra Leid junge Buaschn san. Freile deng ma sauba übn und uns zamhocka, wobei ma a an Duascht ham und wo hifahrn.
{:.card-text}

An dera Webseitn werd oiwei gwerglt; oiso schaug efta nei wennst mogst. Wennst wos wissn wuist, [riahst](/by/kontakt) di hoid.
{:.card-text}

Gnua vazoid, vui Spaß beim Umschaun :)
{:.card-text}
</div>
    </div>
  </div><!-- col-md-6 col-lg-5 -->
  <div class="col-md-6 col-lg-4 d-flex align-content-around flex-wrap">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{% include icon.html icon="activity" %}Wos neis gibt</h2>
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-md-6 col-lg-4 -->
  <div class="col-md-6 col-lg-3 d-flex align-content-around flex-wrap">
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
        <h2 class="card-title">{% include icon.html icon="calendar" %}Wos zum doa is</h2>
{% include calendar.html %}
      </div>
    </div>
  </div><!-- col-lg-5 -->
  <div class="col-lg-7 d-flex align-content-around flex-wrap">
    <div class="card">          
      <div class="card-body">
        <h2 class="card-title">{% include icon.html icon="message-circle" %}Chat</h2>
{% include chat.html %}
      </div>
    </div>
  </div><!-- col-lg-7 -->
</div><!-- row -->
