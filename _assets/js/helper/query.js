'use strict';

export function query(selector) {
    return Array.from(document.getElementsByClassName(selector));
}
