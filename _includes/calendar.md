### Termine

<div id="drcal" class="table-responsive"></div>
<script type="text/javascript">
  $.get("data/ffw.eisolzried@gmail.com.ics").then(buildCal);

  function buildCal(data) {
    var jCal = ICAL.parse(data);
    var comp = new ICAL.Component(jCal);
    var vevents = comp.getAllSubcomponents("vevent");

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
      var div = document.createElement('div');
      div.appendChild(dayNum);

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
          div.appendChild(dayEvent);
        }
      }
      event.detail.element.appendChild(div);
    });
    cal.changeMonth(new Date());
    selected = null;
    cal.addEventListener('click', function(event) {
      if (event.target.tagName === 'DIV') {
        event.preventDefault();
        if (selected) selected.className = '';
        selected = event.target;
        selected.className = 'selected';
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
<style type="text/css">
#drcal .calendar {
  border-collapse: collapse;
  width: calc(100% - 2px);
}
#drcal .calendar th {text-align: center;}
#drcal .calendar td {
  border: 1px solid #AEAEAE;
  width: 6em;
  height: 5em;
  padding: 0;
}
#drcal .calendar td > div {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}
#drcal .calendar thead tr:first-child th {
  font-size: large;
  padding-bottom: 0.5em;
}
#drcal .calendar thead tr:last-child th {
  font-weight: normal;
  font-size: small;
  color: #939393;
}
#drcal .calendar .prev {float: left;}
#drcal .calendar .prev:before {content: "<";}
#drcal .calendar .next {float: right;}
#drcal .calendar .next:after {content: ">";}
#drcal .calendar .today, .calendar .today.selected { background-color: #E9EFF8;}
#drcal .calendar .selected {background-color: #F3F3F3;}
#drcal .calendar .extra {color: #AEAEAE;}
#drcal .calendar .daynum {
  float: right;
  padding-right: 0.5ex;
}
#drcal .calendar .dayevent {
  margin: auto;
  color: #de002a;
}
</style>

