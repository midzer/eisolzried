import EmojiButton from 'emoji-button'

const emojiButton = document.getElementById('emoji-btn')
const picker = new EmojiButton({position: 'top-end'})

picker.on('emoji', emoji => document.getElementById('chat-input').value += emoji)

emojiButton.onclick = () => picker.pickerVisible ? picker.hidePicker() : picker.showPicker(emojiButton)

// Show initially as requested already
emojiButton.click()
