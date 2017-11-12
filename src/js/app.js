import { h, render } from 'preact';
import Flagstrap from './flagstrap';

const cb = (lang) => {
  console.log('on language changed to: ' + lang);
};

// define shorter list of countries
let cList = {
  'AF': 'Afghanistan',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa'
};

render(
  <Flagstrap countries={cList} onLanguageChanged={cb} selected='AS' />,
  document.getElementById('app')
);
