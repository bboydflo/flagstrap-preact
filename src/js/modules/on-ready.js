// import _ from 'underscore';
import _$ from 'jquery';
// import Toastr from 'toastr';

// preact
import { h, render, Component } from 'preact';

// Promise/A+ api
import { Promise as P } from 'rsvp';

// modules
import jQ from './jquery-plugins';
// import pMap from './p-map';
// import Toast from './toast';

// countries array
let countries = [
  { 'US': 'English US' },
  { 'JP': '日本人' },
  { 'DK': 'Dansk' },
  { 'NL': 'Nederlands' },
  { 'DE': 'Deutsch' },
  { 'CZ': 'Český' },
  { 'GB': 'English GB' },
  { 'PH': 'English PH' },
  { 'AU': 'English AU' },
  { 'ES': 'Español' },
  { 'EE': 'Eesti' },
  { 'FI': 'Suomi' },
  { 'BG': 'български' },
  { 'NO': 'Norsk' },
  { 'PL': 'Polski' },
  { 'RU': 'Pусский' },
  { 'SE': 'Svenska' },
  { 'UA': 'Український' },
  { 'CN': '中国的' },
  { 'TH': 'ไทย;ประเทศไทย' },
  { 'MK': 'македонски' },
  { 'RS': 'Србин' },
  { 'VN': 'Tiếng Việt' }
];

export default () => {

  // get jquery
  const $ = jQ(_$);

  /* // get toast
  const toast = Toast(_, Toastr);

  // setup toast listener
  $.subscribe('toast', toast); */

  // add promise support for browsers that are not supporting promises
  global.Promise = P;

  class Flagstrap extends Component {
    render (props) {
      return <div
        class='flagstrap'
        data-input-name='country'
        data-selected-country='US'
      />;
    }

    componentDidMount () {

      // apply plugin
      $('.flagstrap').flagStrap({
        countries,
        placeholder: {
          text: 'Choose language'
        },
        onSelect: this.onChangeLang
      });
    }

    onChangeLang = (lang, el) => {
      console.log(lang, el);
    }
  }

  render(<Flagstrap />, document.getElementById('app'));
};
