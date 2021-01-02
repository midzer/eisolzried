import { EmojiButton } from '@joeattardi/emoji-button'

const emojiButton = document.getElementById('emoji-btn'),
  picker = new EmojiButton({position: 'top-end', autoFocusSearch: false})

picker.on('emoji', selection => document.getElementById('chat-input').value += selection.emoji)

emojiButton.onclick = () => picker.pickerVisible ? picker.hidePicker() : picker.showPicker(emojiButton)

// Show initially as requested already
emojiButton.click()
