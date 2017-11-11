// jquery plugins
import 'bootstrap/js/alert';
import 'bootstrap/js/collapse';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/modal';
import 'bootstrap/js/tooltip';
import 'bootstrap/js/tab';
import 'bootstrap/js/transition';
import 'flagstrap';

// do some setup and export enhanced object
export default ($) => {

  // attach variable to global scope
  global.$ = $;

  // return enhanced jquery object
  return $;
};
