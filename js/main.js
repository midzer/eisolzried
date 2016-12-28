longlist(document.getElementById('posts'), {'perPage': 5});

$.get('/data/termine.ics').then(buildCal);

function hasEventInDate(event, time, timezone)
{
  if (event.isRecurring()) {
    var expand = event.iterator(time);
    if (expand.next().compare(time) == 0)
      return true;
  }
  else if ((event.startDate.compareDateOnlyTz(time, timezone) == -1 &&
            event.endDate.compareDateOnlyTz(time, timezone) == 1) ||
           event.startDate.compareDateOnlyTz(time, timezone) == 0 ||
           event.endDate.compareDateOnlyTz(time, timezone) == 0) {
    return true;
  }
  return false;
}

function createEventDetails(event)
{
  var details = '<p>';
  details += 'Treffpunkt: ';
  details += event.location;
  details += '<br />';
  details += 'Beginn: ';
  details += event.startDate.toJSDate().toTimeString().substring(0, 5);
  details += '<br />';
  details += 'Ende: ';
  details += event.endDate.toJSDate().toTimeString().substring(0, 5);
  details += '</p>';
  details += '<p>';
  details += event.description;
  details += '</p>';
  var attachments = event.attachments;
  for (var i in attachments) {
    details += '<a href=\"';
    details += attachments[i].getFirstValue();
    details += '\">Zusatzinfo</a>';
  }
  return details;
}

function buildCal(data) {
  var jCal = ICAL.parse(data);
  var comp = new ICAL.Component(jCal);
  var vevents = comp.getAllSubcomponents('vevent');
  var ev = [];
  for (var i = 0; i < vevents.length; i++) {
      ev[i] = new ICAL.Event(vevents[i]);
  }
  var evLength = ev.length;
  var timezoneComp = comp.getFirstSubcomponent('vtimezone');
  var tzid = timezoneComp.getFirstPropertyValue('tzid');
  var timezone = new ICAL.Timezone({ component: timezoneComp,
                                     tzid: tzid });
  var cal = drcal({
    'weekdays': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September',
               'Oktober', 'November', 'Dezember'],
    'startDay': 1
  });
  cal.addEventListener('drcal.renderDay', function(event) {
    var dayNum = document.createElement('div');
    dayNum.className = 'daynum';
    dayNum.appendChild(document.createTextNode(event.detail.date.getDate()));
    event.detail.element.appendChild(dayNum);
    var time = ICAL.Time.fromJSDate(event.detail.date);
    for (var i = 0; i < evLength; i++) {
      if (hasEventInDate(ev[i], time, timezone)) {
        var dayEvent = document.createElement('div');
        dayEvent.className = 'dayevent';
        dayEvent.setAttribute('data-toggle', 'modal');
        dayEvent.setAttribute('data-target', '.bs-example-modal-sm');
        dayEvent.appendChild(document.createTextNode(ev[i].summary));
        event.detail.element.appendChild(dayEvent);
      }
    }
  });
  cal.changeMonth(new Date());
  cal.addEventListener('click', function(event) {
    if (event.target.tagName == 'DIV') {
      var time = ICAL.Time.fromDateString(event.target.parentNode.getAttribute('date'));
      for (var i = 0; i < evLength; i++) {
        if (hasEventInDate(ev[i], time, timezone) && event.target.innerHTML == ev[i].summary) {
          $('.modal-body').html(createEventDetails(ev[i]));
          $('.modal-title').html(ev[i].summary);
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

var socket = io.connect('http://localhost:3000');
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
