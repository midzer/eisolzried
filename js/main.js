var popup = $("#popup").dialog({ autoOpen: false, width: 150 });
$.get("data/termine.ics").then(buildCal);

function hasEventInDate(event, time)
{
  if (event.isRecurring()) {
    var expand = event.iterator(time);
    if (expand.next().compare(time) == 0) {
      return true;
    }
  }
  else if (event.startDate.day == time.day &&
           event.startDate.month == time.month &&
           event.startDate.year == time.year) {
    return true;
  }
  return false;
}

function buildCal(data) {
  var jCal = ICAL.parse(data);
  var comp = new ICAL.Component(jCal);
  var vevents = comp.getAllSubcomponents('vevent');
  var ev = [];
  for (var i in vevents) {
      ev[i] = new ICAL.Event(vevents[i]);
  }
  var cal = drcal({
    'weekdays': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    'startDay': 1
  });
  cal.addEventListener('drcal.renderDay', function(event) {
    var dayNum = document.createElement('div');
    dayNum.className = 'daynum';
    dayNum.appendChild(document.createTextNode(event.detail.date.getDate()));
    event.detail.element.appendChild(dayNum);
    var time = ICAL.Time.fromJSDate(event.detail.date);
    for (var i in ev) {
      if (hasEventInDate(ev[i], time)) {
        var dayEvent = document.createElement('div');
        dayEvent.className = 'dayevent';
        dayEvent.appendChild(document.createTextNode(ev[i].summary));
        event.detail.element.appendChild(dayEvent);
      }
    }
  });
  cal.changeMonth(new Date());
  cal.addEventListener('click', function(event) {
    if (event.target.tagName == 'DIV') {
      var time = ICAL.Time.fromDateString(event.target.parentNode.getAttribute("date"));
      for (var i in ev) {
        if (hasEventInDate(ev[i], time)) {
          popup.html(ev[i].description + " im " + ev[i].location + " um " + ev[i].startDate.toJSDate().toTimeString());
          popup.dialog("option", "title", ev[i].summary);
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

longlist(document.getElementById('posts'), {'perPage': 5});

SimpleJekyllSearch({
searchInput: document.getElementById('search-input'),
resultsContainer: document.getElementById('results-container'),
json: 'search.json',
searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
noResultsText: 'Keine Suchergebnisse',
limit: 10,
fuzzy: false,
exclude: ['Welcome']
});
