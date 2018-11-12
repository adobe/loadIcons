(function() {
  function injectSVG(svgURL, callback) {
    function handleError(string) {
      string = 'loadIcons: '+string;
      var error = new Error(string);

      console.error(error.toString());

      if (typeof callback === 'function') {
        callback(error);
      }
    }

    var error;
    // 200 for web servers, 0 for CEP panels
    if (this.status !== 200 && this.status !== 0) {
      handleError('Failed to fetch icons, server returned ' + this.status);
      return;
    }

    // Parse the SVG
    var parser = new DOMParser();
    try {
      var doc = parser.parseFromString(this.responseText, 'image/svg+xml');
      var svg = doc.firstChild;
    }
    catch (err) {
      handleError('Error parsing SVG: ' + err);
      return;
    }

    // Make sure a real SVG was returned
    if (svg && svg.tagName === 'svg') {
      // Hide the element
      svg.style.display = 'none';

      svg.setAttribute('data-url', svgURL);

      // Insert it into the head
      document.head.insertBefore(svg, null);

      // Pass the SVG to the callback
      if (typeof callback === 'function') {
        callback(null, svg);
      }
    }
    else {
      handleError('Parsed SVG document contained something other than an SVG');
    }
  }

  function loadIcons(svgURL, callback) {
    // Request the SVG sprite
    var req = new XMLHttpRequest();
    req.open('GET', svgURL, true);
    req.addEventListener('load', injectSVG.bind(req, svgURL, callback));
    req.addEventListener('error', function(event) {
      handleError('Request failed');
    });
    req.send();
  }

  window.$loadIcons = window.loadIcons = loadIcons;
}());
