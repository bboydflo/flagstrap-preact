import { h, render } from 'preact';
import Flagstrap from './flagstrap';

const cb = (lang) => {
  console.log('on language changed to: ' + lang);
};

// define a shorter list of countries
let cList = {
  'AF': 'Afghanistan',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa'
};

render(
  <div class='container' style='padding-top: 25px;'>
    <div class='row'>
      <Flagstrap countries={cList} onChanged={cb} />
    </div>
  </div>,
  document.getElementById('app')
);
