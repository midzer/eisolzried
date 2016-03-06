### Termine

<div id="drcal" class="table-responsive"></div>
<div id="popup"></div>
<script type="text/javascript">
  var popup = $("#popup").dialog({ autoOpen: false, width: 150});
  $.get("data/ffw.eisolzried@gmail.com.ics").then(buildCal);

  function buildCal(data) {
    var jCal = ICAL.parse(data);
    var comp = new ICAL.Component(jCal);
    var vevents = comp.getAllSubcomponents('vevent');
    var cal = drcal({
      'weekdays': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
      ],
      'startDay': 1
    });
    cal.addEventListener('drcal.renderDay', function(event) {
      var dayNum = document.createElement('div');
      dayNum.className = 'daynum';
      dayNum.appendChild(document.createTextNode(event.detail.date.getDate()));
      event.detail.element.appendChild(dayNum);
      var time = ICAL.Time.fromJSDate(event.detail.date);
      for (var k in vevents) {
        var ev = new ICAL.Event(vevents[k]);
        var expand = ev.iterator(time);
        var next = expand.next();
        if (next.compare(time) == 0) {
          var dayEvent = document.createElement('div');
          dayEvent.className = 'dayevent';
          dayEvent.appendChild(document.createTextNode(ev.summary));
          event.detail.element.appendChild(dayEvent);
        }
      }
    });
    cal.changeMonth(new Date());
    cal.addEventListener('click', function(event) {
      if (event.target.tagName == 'DIV') {
        var time = ICAL.Time.fromDateString(event.target.parentNode.getAttribute("date"));
        for (var k in vevents) {
          var ev = new ICAL.Event(vevents[k]);
          var expand = ev.iterator(time);
          var next = expand.next();
          if (next.compare(time) == 0) {
            popup.html(ev.description + " im " + ev.location + " um " + ev.startDate.toJSDate().toTimeString());
            popup.dialog("option", "title", ev.summary);
            popup.dialog("option", "position", { my: "left bottom", at: "right top", of: event.target });
            popup.dialog("open");
            break;
          }
        }
      }
    });
    var buttons = cal.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.add('btn');
    }
    document.getElementById('drcal').appendChild(cal);
  }
</script>
<noscript>Bitte Javascript aktivieren um den Kalender zu sehen</noscript>

