// longlist - a minimalist javascript list pager

// Copyright 2011, 2012, 2013, 2014, 2015 Chris Forno
// Copyright 2016 Dennis Rohner
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).

// Unsupported browsers:
// Internet Explorer <= 8

// Assumptions:
// * The list has a single <ul>.

(function () {

  // Fire a custom event named "name" from element "element" with
  // extra data "data" attached to the details of the event.
  function customEvent(name, element, data) {
    var evt;
    try {
      evt = new CustomEvent(name, {detail: data});
    } catch(e) {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, true, true, data);
    }
    element.dispatchEvent(evt);
  }

  window.longlist = function (list, options) {
    if (list.children.length === 0) throw new Error('longlist: Missing list items');

    // How many items per page should we display?
    var perPage = options !== undefined && 'perPage' in options ? options.perPage : 10;
    // Which page should we start on?
    var startPage = options !== undefined && 'startPage' in options ? options.startPage : 1;
    // What's the maximum number of on either side of the current page?
    var maxLinks = options !== undefined && 'maxLinks' in options ? options.maxLinks : 9;
    var currentPage = null;
    var items = list.children;
    var len = items.length;
    var nPages = Math.max(1, Math.ceil(len / perPage));

    var prev = document.createElement('a');
    prev.className = 'page prev';
    prev.setAttribute('href', '');

    var next = document.createElement('a');
    next.className = 'page next';
    next.setAttribute('href', '');

    var leftElipsis = document.createElement('span');
    leftElipsis.className = 'elipsis';

    var rightElipsis = document.createElement('span');
    rightElipsis.className = 'elipsis';

    var links = [];
    for (var i = 1; i <= nPages; i++) {
      var link = document.createElement('a');
      link.className = 'page direct';
      link.setAttribute('href', '');
      link.textContent = i;
      links.push(link);
    }

    var controls = document.createElement('nav');
    controls.className = 'paging-controls';
    controls.appendChild(prev);
    controls.appendChild(links[0]);
    controls.appendChild(leftElipsis);
    controls.appendChild(document.createTextNode(' '));
    for (var i = 2; i < nPages; i++) {
      controls.appendChild(links[i - 1]);
      controls.appendChild(document.createTextNode(' '));
    }
    controls.appendChild(rightElipsis);
    controls.appendChild(links[links.length - 1]);
    controls.appendChild(next);

    list.gotoPage = function (n) {
      if (n < 1 || n > nPages) throw new RangeError('longlist: gotoPage number must be between 1 and ' + nPages);

      // Hide or show the previous/next controls if we're moving to the first/last page.
      prev.style.visibility = n === 1 ? 'hidden' : '';
      next.style.visibility = n === nPages ? 'hidden' : '';

      // Display up to maxLinks links.
      var nLinksLeft = Math.min(n, maxLinks - Math.min(nPages - n, Math.floor(maxLinks / 2))) - 1;
      var nLinksRight = Math.min(nPages - n, maxLinks - nLinksLeft - 1);
      for (var i = 1; i <= links.length; i++) {
        if (i === n) { // current page
          links[i-1].style.display = '';
          links[i-1].removeAttribute('href');
        } else if (i === 1 || // Always show the first page number.
                   i === nPages || // Always show the last page number.
                   (i > n - nLinksLeft && i < n + nLinksRight)) {
          links[i-1].setAttribute('href', '');
          links[i-1].style.display = '';
        } else {
          links[i-1].style.display = 'none';
        }
      }

      // Hide or show elipses based on how far away we are from the ends.
      leftElipsis.style.display = n > nLinksLeft + 1 ? '' : 'none';
      rightElipsis.style.display = n < nPages - nLinksRight ? '' : 'none';

      var index = Math.min(currentPage * perPage, len);
      if (currentPage !== null) { // Hide currently displayed items.
        for (var i = (currentPage - 1) * perPage; i < index; i++) {
          items[i].style.display = 'none';
        }
        list.removeChild(list.children[index]);
      } else { // Hide all items
        for (var i = 0; i < len; i++) {
          items[i].style.display = 'none';
        }
      }
      // Display new items.
      index = Math.min(n * perPage, len);
      for (var i = (n - 1) * perPage; i < index; i++) {
        items[i].style.display = '';
      }
      list.insertBefore(controls, list.children[index]);

      currentPage = n;

      customEvent('longlist.pageChange', list, {page: n});      
    };

    controls.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        if (event.target.className == 'page prev') {
          list.gotoPage(currentPage - 1);
        } else if (event.target.className == 'page next') {
          list.gotoPage(currentPage + 1);
        } else {
          list.gotoPage(parseInt(event.target.textContent, 10));
        }
      }
    });

    list.gotoPage(startPage);
  };
})();
