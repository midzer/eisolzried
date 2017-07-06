---
layout: page
title: Griaß Gohd nahad
js:
  - name: ical.min
  - name: socket.io
  - name: bundleIndex.min
    attr: async
lang: by
---

<div class="row">
  <div class="col-sm-5">
{% include carousel.html %}
  </div>

  <div class="col-sm-7" markdown="1">
Oiso, mia san a aktive Feiawea vo da Gmoa Bergkicha in Obabayan, wo de mehra Leid junge Buaschn san. Freile deng ma sauba übn und uns zamhocka, wobei ma a an Duascht ham und wo hifahrn.

An dera Webseitn werd oiwei gwerglt; oiso schaug efta nei wennst mogst. Wennst wos wissn wuist, [riahst](/by/kontakt) di hoid.

Gnua vazoid, vui Spaß beim umschaun :)

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
        <h3 class="title">Wos neis gibt</h3>
      </div>
      <div class="panel-body">
{% include posts.html %}
      </div>
    </div>
  </div><!-- col-sm-3 -->

  <div class="col-sm-6">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="title">Wos zum doa is</h3>
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
