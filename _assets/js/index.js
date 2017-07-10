// Calendar
function isBetween(first, last, time, timezone) {
  return (first.compareDateOnlyTz(time, timezone) == -1 &&
  last.compareDateOnlyTz(time, timezone) == 1) ||
  first.compareDateOnlyTz(time, timezone) == 0 ||
  last.compareDateOnlyTz(time, timezone) == 0;
}

function hasEventInDate(event, time, timezone) {
  if (event.isRecurring()) {
    return event.iterator(time).next().compare(time) == 0;
  }
  return isBetween(event.startDate, event.endDate, time, timezone);
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
  var timezoneComp = comp.getFirstSubcomponent('vtimezone');
  var tzid = timezoneComp.getFirstPropertyValue('tzid');
  var timezone = new ICAL.Timezone({
    component: timezoneComp,
    tzid: tzid
  });
  
  var cal = drcal({
    'weekdays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September',
               'Oktober', 'November', 'Dezember'],
    'startDay': 1
  });

  function gatherEvents() {
    var start = ICAL.Time.fromData({
      day: 1,
      month: cal.month(),
      year: cal.year()
    });
    start.adjust(-6, 0, 0, 0);
    var end = ICAL.Time.fromData({
      day: 6,
      month: cal.month() + 1,
      year: cal.year()
    });

    var ev = [];
    for (var i = 0; i < vevents.length; i++) {
      var event = new ICAL.Event(vevents[i]);
      if (event.isRecurring()) {
        // We have to check all recurring events in a month
        ev.push(event);
      }
      else {
        // Is event really within a month page?
        // Beware we show some days before and after month
        // from time to time
        if (isBetween(start, end, event.startDate, timezone) &&
        isBetween(start, end, event.endDate, timezone)) {
          ev.push(event);
        }
      }
    }
    return ev;
  }

  var clone;
  var dayNum = document.createElement('div');
  dayNum.className = 'daynum';
  var dayEvent = document.createElement('button');
  dayEvent.className = 'dayevent';
  dayEvent.setAttribute('data-toggle', 'modal');
  dayEvent.setAttribute('data-target', '#event-modal');

  var ev = [];
  cal.addEventListener('drcal.renderDay', function(event) {
    clone = dayNum.cloneNode();
    clone.appendChild(document.createTextNode(event.detail.date.getDate()));
    event.detail.element.appendChild(clone);
    var time = ICAL.Time.fromJSDate(event.detail.date);
    for (var i = 0; i < ev.length; i++) {
      if (hasEventInDate(ev[i], time, timezone)) {
        clone = dayEvent.cloneNode();
        clone.setAttribute('title', ev[i].summary);
        clone.appendChild(document.createTextNode(ev[i].summary));
        event.detail.element.appendChild(clone);
      }
    }
  });

  cal.addEventListener('drcal.monthChange', function() {
    ev = gatherEvents(timezone);
  });

  cal.changeMonth(new Date());

  var modal = new Modal(document.getElementById('event-modal'));
  cal.addEventListener('click', function(event) {
    if (event.target.className == 'dayevent') {
      var time = ICAL.Time.fromDateString(event.target.parentNode.getAttribute('date'));
      for (var i = 0; i < ev.length; i++) {
        if (hasEventInDate(ev[i], time, timezone) && event.target.innerHTML == ev[i].summary) {
          var content = 
            '<div class="modal-header">'
              +'<button type="button" class="close" data-dismiss="modal" aria-label="Schließen">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<h4 class="modal-title">' + ev[i].summary + '</h4>'
            +'</div>'
            +'<div class="modal-body">'
              +'<p>' + createEventDetails(ev[i]) + '</p>'
            +'</div>';
          modal.setContent(content);
          modal.show();
          break;
        }
      }
    }
  });
  var buttons = cal.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].className != 'dayevent') {
      buttons[i].classList.add('btn');
    }
  }
  document.getElementById('drcal').appendChild(cal);
}

fetch('/assets/data/termine.ics')
.then(function(response) {
  return response.text();
}).then(function(data) {
  buildCal(data);
});

// Chat
function addMessage(msg) {
  var content = document.createElement('li');
  content.textContent = msg;
  document.getElementById('messages').append(content);
  var box = document.getElementById("chat-box");
  box.scrollTop = box.scrollHeight;
}

function sendMessage(ws) {
  var input = document.getElementById('chat-input');
  var msg = input.value;
  addMessage(msg);
  input.value = '';
  ws.send(msg);
}

var ws = new WebSocket('wss://feuerwehr-eisolzried.de:62187');

document.getElementById('chat-btn').onclick = function() {
  sendMessage(ws);
};

document.getElementById('chat-form').onkeypress = function(event) {
  if (event.keyCode == 13) {
    sendMessage(ws);
    event.preventDefault();
  }
};

ws.onmessage = function(msg) {
  addMessage(msg.data);
};

// Load more posts
document.getElementById('posts-btn').onclick = function() {
  var els = document.querySelectorAll('.hidden');
  for (var i = 0; i < 8; i++) {
    if (els.length == i) {
      this.classList.add('hidden');
      break;
    }
    els[i].classList.remove('hidden');
  }
};
