'use strict';

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

function createEventDetails(event) {
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
        for (let i = 0, j = vevents.length; i < j; i++) {
            var event = new ICAL.Event(vevents[i]);
            if (event.isRecurring() ||
            (isBetween(start, end, event.startDate, timezone) && isBetween(start, end, event.endDate, timezone))) {
                // We have to check all recurring events in a month
                // or
                // Is event really within a month page?
                // Beware we show some days before and after month
                // from time to time
                ev.push(event);
            }
        }
        return ev;
    }

    function showModal(event) {
        var content = 
        '<div class="modal-header">'
        +'<h5 class="modal-title">' + event.summary + '</h5>'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Schließen">'
        +'<span aria-hidden="true">&times;</span>'
        +'</button>'
        +'</div>'
        +'<div class="modal-body">'
        +'<p>' + createEventDetails(event) + '</p>'
        +'</div>';
        modal.setContent(content);
        modal.show();
    }

    var ev = [];
    cal.addEventListener('drcal.renderDay', function(event) {
        var dayNum = document.createElement('div');
        dayNum.className = 'daynum';
        dayNum.appendChild(document.createTextNode(event.detail.date.getDate()));
        event.detail.element.appendChild(dayNum);
        const time = ICAL.Time.fromJSDate(event.detail.date);
        for (let i = 0, j = ev.length; i < j; i++) {
            if (hasEventInDate(ev[i], time, timezone)) {
                var dayEvent = document.createElement('button');
                dayEvent.type = 'button';
                dayEvent.className = 'btn btn-link dayevent';
                dayEvent.dataset.toggle = 'modal';
                dayEvent.dataset.target = '#event-modal';
                dayEvent.setAttribute('title', ev[i].summary);
                dayEvent.appendChild(document.createTextNode(ev[i].summary));
                event.detail.element.appendChild(dayEvent);
                if (event.detail.date.toDateString() == new Date().toDateString()) {
                    const data = {
                        message: 'Heute ist was los!',
                        timeout: 5000,
                        actionHandler: function () {
                            showModal(ev[i]);
                        },
                        actionText: 'Zeigen'
                    };
                    snackbar.showSnackbar(data);
                }
            };
        }
    });

    cal.addEventListener('drcal.monthChange', function() {
        ev = gatherEvents(timezone);
    });

    cal.changeMonth(new Date());

    cal.addEventListener('click', function(event) {
        if (event.target.classList.contains('dayevent')) {
            const time = ICAL.Time.fromDateString(event.target.parentNode.getAttribute('date'));
            for (let i = 0, j = ev.length; i < j; i++) {
                if (hasEventInDate(ev[i], time, timezone) && event.target.textContent == ev[i].summary) {
                    showModal(ev[i]);
                    break;
                }
            }
        }
    });
    const buttons = cal.getElementsByTagName('button');
    for (let i = 0, j = buttons.length; i < j; i++) {
        buttons[i].classList.add('btn');
    }
    document.getElementById('calendar').appendChild(cal);
}

fetch('/assets/data/termine.ics')
.then(function(response) {
    return response.text();
})
.then(function(data) {
    buildCal(data);
});
