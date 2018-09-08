#!/bin/bash
node_modules/.bin/minimalcss --nosandbox --verbose --loadimages https://feuerwehr-eisolzried.de > minimalcss.txt

# Missing in extracted (full page) CSS:
# .invisible, .btn-link, #chatbox children, .tooltip,
# .dropdown-menu.show, .close, .calendar, .collapsing, .carousel
