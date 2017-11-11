/* eslint-disable */
(function (w) {
  'use strict';

  // spinner options
  var opt = {
    color: '#000',
    lines: 10,
    length: 8,
    width: 4,
    radius: 8
  };

  var d = document,
    e = d.documentElement,
    f = d.getElementById('spinner'),
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  // init namespace
  w._SmartPigs = w._SmartPigs || {};

  // create global namespace (SmartPigs)
  w._SmartPigs.spinner = {
    state: false,
    show: function() {

      // create overlay element
      var overlay = d.createElement('div');

      // add class name
      overlay.className = 'overlay';

      // set overlay style
      overlay.style.width           = x + 'px';
      overlay.style.height          = y + 'px';
      overlay.style.position        = 'fixed';
      overlay.style.left            = 0;
      overlay.style.top             = 0;
      overlay.style.backgroundColor = '#000';
      overlay.style.opacity         = parseFloat( '0.25' );
      overlay.style.zIndex          = 10000;

      // cache spinner element
      var spinner = new w.Spinner( opt ).spin();

      // attach spinner to the body element
      f.appendChild( spinner.el );

      // attach overlay
      f.appendChild( overlay );

      // update global state
      w._SmartPigs.spinner.state = true;
    },
    hide: function() {
      f.innerHTML = '';

      // update global state
      w._SmartPigs.spinner.state = false;
    },
    toggleSpinner: function() {
      return w._SmartPigs.spinner.state ? w._SmartPigs.spinner.hide() : w._SmartPigs.spinner.show();
    }
  };

  // show spinner
  w._SmartPigs.spinner.show();
})(window);
