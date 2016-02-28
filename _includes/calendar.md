### Termine

<div id="drcal" class="table-responsive"></div>
<script type="text/javascript">
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
      var day = document.createElement('div');
      var dayNum = document.createElement('div');
      dayNum.className = 'daynum';
      dayNum.appendChild(document.createTextNode(event.detail.date.getDate()));
      day.appendChild(dayNum);
      var time = new ICAL.Time({
        year: event.detail.date.getFullYear(),
        month: event.detail.date.getMonth() + 1,
        day: event.detail.date.getDate()
      });
      for (var k in vevents) {
        var ev = new ICAL.Event(vevents[k]);
        var expand = ev.iterator(time);
        var next = expand.next();
        if (next.day == time.day &&
          next.month == time.month &&
          next.year == time.year) {
          var dayEvent = document.createElement('div');
          dayEvent.className = 'dayevent';
          dayEvent.appendChild(document.createTextNode(ev.summary));
          day.appendChild(dayEvent);
        }
      }
      event.detail.element.appendChild(day);
    });
    cal.changeMonth(new Date());
    selected = null;
    cal.addEventListener('click', function(event) {
      if (event.target.tagName === 'DIV') {
        event.preventDefault();
        if (selected) selected.classList.remove('selected');
        selected = event.target;
        selected.classList.add('selected');
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

