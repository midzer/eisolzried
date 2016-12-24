---
layout: page
title: Griaß Gohd nahad
customjs:
  - /js/ical.min.js
  - /js/drcal.min.js
  - /js/longlist.min.js
  - /js/main.min.js
lang: by
---

<div class="row">

  <div class="col-md-4">
   <img src="/assets/taferl.png" alt="Taferl Feuerwehr Eisolzried"/>
  </div>

<div class="col-md-4" markdown="1">
Oiso, mia san a aktive Feiawea vo da Gmoa Bergkicha in Obabayan, wo de mehra Leid junge Buaschn san.

Freile deng ma sauba übn und uns zamhocka, wobei ma a an Duascht ham und wo hifahrn.

An dera Webseitn werd oiwei gwerglt; oiso schaug efta nei wennst mogst. Wennst wos wissn wuist, [riahst](/by/kontakt) di hoid.

Gnua vazoid, vui Spaß beim umschaun :)
</div>

  <div class="col-md-4">
   <img src="/assets/wappen.png" alt="Wappen Bergkirchen"/>
  </div>

</div>

<div class="row">

  <div class="col-sm-6">
    <div class="list-group">

<div class="panel-heading" markdown="1">
## Wos neis gibt
<ul id="posts" class="posts">
{% for post in site.posts %}
{% if page.lang == post.lang %}
 <li>
  <span class="post-date">{{ post.date | localize: "%e. %B %Y" }}</span>
  <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
 </li>
{% endif %}
{% endfor %}
</ul>
<p><a href="{{ "/feed.xml" | prepend: site.baseurl }}">As neiaste bschtoin</a></p>
</div>

    </div>
  </div>

  <div class="col-sm-6">
    <div class="list-group">

<div class="panel-heading" markdown="1">
## Wos zum doa is
<div id="drcal" class="table-responsive"></div>
<noscript>Schoit bittschen Javascript o, damitsd an Kalenda seng kohnst</noscript>
<p><a href="{{ "/data/termine.ics" | prepend: site.baseurl }}">An Kalenda obelohn&#9196;</a></p>
<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="Termindetails">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
      </div>
    </div>
  </div>
</div>
</div>

    </div>
  </div>

</div>

