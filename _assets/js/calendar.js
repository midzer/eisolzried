import Modal from 'bootstrap/js/dist/modal';

import { loadStyle } from './load/loadstyle'
import { createSnackbar } from './helper/createsnackbar'

function isBetween (first, last, time, timezone) {
  return (first.compareDateOnlyTz(time, timezone) === -1 &&
    last.compareDateOnlyTz(time, timezone) === 1) ||
    first.compareDateOnlyTz(time, timezone) === 0/* fix Feiertage ||
    last.compareDateOnlyTz(time, timezone) === 0*/
}

function hasEventInDate (event, time, timezone) {
  if (event.isRecurring()) {
    return event.iterator(time).next().compare(time) === 0
  }
  return isBetween(event.startDate, event.endDate, time, timezone)
}

function createEventDetails (event) {
  let details = `<p>Treffpunkt: ${event.location}
                 <br>
                 Beginn: ${event.startDate.toJSDate().toTimeString().substring(0, 5)}
                 <br>
                 Ende: ${event.endDate.toJSDate().toTimeString().substring(0, 5)}
                 </p>
                 <p>${event.description}</p>`
  let attachments = event.attachments
  for (var i in attachments) {
    details += `<a href="${attachments[i].getFirstValue()}">Zusatzinfo</a>`
  }
  return details
}

function buildCal (data) {
  const jCal = ICAL.parse(data),
    comp = new ICAL.Component(jCal),
    vevents = comp.getAllSubcomponents('vevent'),
    timezoneComp = comp.getFirstSubcomponent('vtimezone'),
    tzid = timezoneComp.getFirstPropertyValue('tzid'),
    timezone = new ICAL.Timezone({
      component: timezoneComp,
      tzid: tzid
    }),
    cal = drcal({
      'weekdays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      'startDay': 1
    })
  function gatherEvents () {
    const start = ICAL.Time.fromData({
      day: 1,
      month: cal.month(),
      year: cal.year()
    }),
      end = ICAL.Time.fromData({
        day: 6,
        month: cal.month() + 1,
        year: cal.year()
      })
    start.adjust(-6, 0, 0, 0)

    const ev = []
    for (let i = 0, j = vevents.length; i < j; i++) {
      const event = new ICAL.Event(vevents[i])
      if (event.isRecurring() || isBetween(start, end, event.startDate, timezone) && isBetween(start, end, event.endDate, timezone)) {
        // We have to check all recurring events in a month
        // or
        // Is event really within a month page?
        // Beware we show some days before and after month
        // from time to time
        ev.push(event)
      }
    }
    return ev
  }

  function showModal (event) {
    const modal = document.getElementById('modal')
    const modalTitle = modal.querySelector('.modal-title')
    modalTitle.textContent = event.summary
    const modalBody = modal.querySelector('.modal-body > p')
    modalBody.textContent = createEventDetails(event)
    const modalInstance = new Modal(modal)
    modalInstance.show()
  }

  let ev = []
  cal.addEventListener('drcal.renderDay', function (event) {
    const dayNum = document.createElement('div')
    dayNum.className = 'daynum'
    dayNum.appendChild(document.createTextNode(event.detail.date.getDate()))
    event.detail.element.appendChild(dayNum)
    const time = ICAL.Time.fromJSDate(event.detail.date)
    for (let i = 0, j = ev.length; i < j; i++) {
      if (hasEventInDate(ev[i], time, timezone)) {
        const dayEvent = document.createElement('button')
        dayEvent.type = 'button'
        dayEvent.className = 'btn btn-link dayevent'
        dayEvent.setAttribute('data-bs-toggle', 'modal')
        dayEvent.setAttribute('data-bs-target', '.modal')
        dayEvent.setAttribute('title', ev[i].summary)
        dayEvent.appendChild(document.createTextNode(ev[i].summary))
        event.detail.element.appendChild(dayEvent)
        if (event.detail.date.toDateString() === new Date().toDateString()) {
          const snackbar = createSnackbar()
          const data = {
            message: 'Heute ist was los!',
            timeout: 5000,
            actionHandler: function () {
              showModal(ev[i])
            },
            actionText: 'Zeigen'
          }
          snackbar.showSnackbar(data)
        }
      }
    }
  })

  cal.addEventListener('drcal.monthChange', function () {
    ev = gatherEvents(timezone)
  })

  cal.changeMonth(new Date())

  cal.addEventListener('click', function (event) {
    if (event.target.classList.contains('dayevent')) {
      const time = ICAL.Time.fromDateString(event.target.parentNode.getAttribute('date'))
      for (let i = 0, j = ev.length; i < j; i++) {
        if (hasEventInDate(ev[i], time, timezone) && event.target.textContent === ev[i].summary) {
          return showModal(ev[i])
        }
      }
    }
  })
  const buttons = cal.getElementsByTagName('button')
  for (let i = 0, j = buttons.length; i < j; i++) {
    buttons[i].classList.add('btn')
  }
  window.requestAnimationFrame(function () {
    document.getElementById('calendar').appendChild(cal)
  })
}
// Get data first
loadStyle('calendar.css')
.then(() => {
  fetch('https://data.feuerwehr-eisolzried.de/termine.ics')
  .then(response => {
    return response.text()
  })
  .then(data => buildCal(data))
})
