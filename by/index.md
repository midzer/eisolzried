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
  <div class="col-sm-4">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2 class="panel-title">{% include icon.html icon="info" %}Intro</h2>
      </div>
<div class="panel-body" markdown="1">
Oiso, mia san a aktive Feiawea vo da Gmoa Bergkicha in Obabayan, wo de mehra Leid junge Buaschn san. Freile deng ma sauba übn und uns zamhocka, wobei ma a an Duascht ham und wo hifahrn.

An dera Webseitn werd oiwei gwerglt; oiso schaug efta nei wennst mogst. Wennst wos wissn wuist, [riahst](/by/kontakt) di hoid.

Gnua vazoid, vui Spaß beim umschaun :)
</div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2 class="panel-title">{% include icon.html icon="activity" %}Wos neis gibt</h2>
      </div>
      <div class="panel-body">
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-sm-4 -->

  <div class="col-sm-8">
    <div class="row">
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-body">
{% include carousel.html %}
          </div>
        </div>
      </div><!-- col-md-8 -->
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">{% include icon.html icon="message-circle" %}Chat</h2>
          </div>
          <div class="panel-body">
{% include chat.html %}
          </div>
        </div>
      </div><!-- col-md-4 -->
    </div><!-- row -->
    <div class="row">
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">{% include icon.html icon="calendar" %}Wos zum doa is</h2>
          </div>
          <div class="panel-body">
{% include calendar.html %}
          </div>
        </div>
      </div><!-- col-md-8 -->
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <img class="lazy img-responsive center-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>
            <img class="lazy img-responsive center-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/wappen.png" alt="Wappen Bergkirchen"/>
            <img class="lazy img-responsive center-block" src="{{ '/assets/icons/transparent.png' | prepend: site.baseurl }}" data-src="/assets/images/index/Bayerisches_Feuerwehrwappen.jpg" alt="Bayerisches Feuerwehrwappen"/>
          </div>
        </div>
      </div><!-- col-md-4 -->
    </div><!-- row -->
  </div><!-- col-sm-8 -->
</div><!-- row -->
