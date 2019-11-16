---
layout: page
title: Servus
permalink: /by/
lang: by
---

<div class="row">
  <div class="col-md-6 col-lg-5">
    <div class="card">
{% include component/carousel.html %}
<div class="card-body" markdown="1">
<h2 class="card-title">{% include element/icon.html icon="info" %} Intro</h2>
Oiso, mia san a aktive Feiawea vo da Gmoa Bergkicha in Obabayan, wo de mehra Leid junge Buaschn san. Freile deng ma oiwei wieder übn und uns zamhocka wenns wos Neis gibt, wobei ma a oan aufgrilln bei na Hoibn und wo hifahrn.
{:.card-text}

An dera Webseitn werd oiwei gwerglt; oiso schaug efta nei wennst mogst. Wennst wos wissn wuist, [riahst](/by/kontakt/) di hoid.
{:.card-text}

Gnua vazoid, vui Spaß beim Umschaun :)
{:.card-text}
</div>
    </div>
  </div><!-- col-md-6 col-lg-5 -->
  <div class="col-md-6 col-lg-7">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title">{% include element/icon.html icon="activity" %} Wos neis gibt
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
        <h2 class="card-title">{% include element/icon.html icon="calendar" %} Wos zum doa is
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
    <h2 class="card-title">{% include element/icon.html icon="rss" %} Feed
    </h2>
{% include component/feed.html %}
  </div>
</div>
{% include element/church.html %}
