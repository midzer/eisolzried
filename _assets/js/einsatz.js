function appendMessage (message) {
    const box = document.getElementById('adventure-box'),
      item = document.createElement('li')
    
    item.textContent = message
    
    box.appendChild(item)
}

function goToStage (number) {
    stage = number
    let text
    switch (number) {
        case 0:
        text = 'Willkommen beim Feuerwehr-Abenteuer! Möchtest du die Anleitung lesen?'
        break
        case 1:
        text = 'Dies ist ein sogenanntes Text Adventure. Mit deinen Eingaben, welche aus zwei bis drei Worten bestehen sollten, reist du durch die Geschichte. Du kannst GEHE ZU, BENUTZE und NEHME verwenden. Alles verstanden?'
        break
        case 2:
        text = 'Es ist Samstag nachmittag und du bist gerade zuhause. Während du gerade die Wohnung putzt, hörst du auf einmal die Sirene. Als aktives Mitglied der Feuerwehr weißt du was zu tun ist.'
        break
        case 3:
        text = 'Du erreichst das Feuerwehrhaus schnell, aber sicher. Andere Feuerwehrleute sind auch schon da. Das Einsatzfaxgerät hat eine Nachricht erhalten.'
        break
        case 4:
        text = 'Auf dem Fax steht: "Starke Rauchmeldung in der Rübengasse. Person vermisst". Deine Kollegen haben ihre Schutzanzüge bereits angelegt.'
        break
        case 5:
        text = 'Zügig und routiniert legst du deinen Schutzanzug an. Das Garagentor steht offen und das Fahrzeug (ein MLF) ist bereit zur Abfahrt.'
        break
        case 6:
        text = 'Du nimmst in der Mannschaftskabine neben deinen Kollegen Platz und der Fahrer lenkt das Feuerwehrfahrzeug aus der Feuerwehrgarage. Während der Einsatzfahrt besprichst du mit deinen Kollegen das weitere Vorgehen am Einsatzort. Ihr erledigt den Einsatz erfolgreich und kehrt im Anschluss wieder in das Feuerwehrhaus zurück. Bravo, du hast das Spiel gelöst!'
        break
    }
    appendMessage(text.toUpperCase())
}

function appendUnknown () {
    appendMessage('ICH KENNE DIESES WORT NICHT.')
}

function evaluateMessage (message) {
    switch (stage) {
        case 0:
        switch (message) {
            case 'ja':
            goToStage(1)
            break
            case 'nein':
            goToStage(2)
            break
            default:
            appendUnknown()
            break
        }
        break
        case 1:
        switch (message) {
            case 'ja':
            goToStage(2)
            break
            default:
            appendUnknown()
            break
        }
        break
        case 2:
        switch (message) {
            case 'gehe zu feuerwehr':
            case 'gehe zu feuerwehrhaus':
            goToStage(3)
            break
            default:
            appendUnknown()
            break
        }
        break
        case 3:
        switch (message) {
            case 'nehme fax':
            case 'lese fax':
            goToStage(4)
            break
            default:
            appendUnknown()
            break
        }
        break
        case 4:
        switch (message) {
            case 'nehme schutzanzug':
            case 'benutze schutzanzug':
            goToStage(5)
            break
            default:
            appendUnknown()
            break
        }
        break
        case 5:
        switch (message) {
            case 'gehe zu mlf':
            case 'gehe zu fahrzeug':
            case 'benutze mlf':
            case 'benutze fahrzeug':
            goToStage(6)
            break
            default:
            appendUnknown()
            break
        }
        break
    }
}

function sendMessage () {
    const input = document.getElementById('adventure-input'),
      message = input.value
    
    appendMessage('> ' + message)
    input.value = ''
    evaluateMessage(message.toLowerCase())
}

document.getElementById('adventure-btn').onclick = () => sendMessage()

document.getElementById('adventure-form').onkeypress = event => {
    if (event.keyCode === 13) {
      event.preventDefault()
      sendMessage()
    }
}

var stage
goToStage(0)
