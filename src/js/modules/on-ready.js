// import _ from 'underscore';
import _$ from 'jquery';
// import Toastr from 'toastr';

// preact
import { h, render, Component } from 'preact';

// Promise/A+ api
import { Promise as P } from 'rsvp';

// modules
import jQ from './jquery-plugins';
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
    constructor (props) {
      super(props);

      this.state = {
        selected: props.selected || ''
      };
    }

    render ({ countries, choose = 'Choose language' }, { selected }) {
      let iconSelected = selected ? `flagstrap-icon flagstrap-${selected.toLowerCase()}` : 'flagstrap-icon';
      let selectedCountry = countries.filter(c => {
        let keys = Object.keys(c);
        return c.selected || c[keys[0]] === selected;
      });

      if (selectedCountry.length === 0) {

      }
      return (
        <div class='flagstrap'>
          <select name='country' style='display: none;'>
            <option>{choose}</option>
            {countries.map(c => {
              let keys = Object.keys(c);
              let sel = c[keys[0]] === selected ? 'selected' : false;
              return <option value={keys[0]} selected={sel}>{c[keys[0]]}</option>;
            })}
          </select>
          <button type='button' data-toggle='dropdown' class='btn btn-default btn-md dropdown-toggle' aria-expanded='false'>
            <span class='flagstrap-selected'>
              <i class={iconSelected} style='margin-right: 10px;' />{selectedCountry.length ? selectedCountry[selected] : choose}
            </span>
            <span class='caret' style='margin-left: 10px;' />
          </button>
          <ul aria-labelled-by='flagstrap-drop-down' class='dropdown-menu' style='height: auto; max-height: 250px; overflow-x: hidden;'>
            <li>
              <a data-val={choose}>
                <i class='flagstrap-icon flagstrap-choose language' style='margin-right: 10px;' />{choose}
              </a>
            </li>
            {countries.map(c => {
              let keys = Object.keys(c);
              return (
                <li>
                  <a data-val={keys[0]} onClick={this.changeLang(c[keys[0]])}>
                    <i class={`flagstrap-icon flagstrap-${keys[0].toLowerCase()}`} style='margin-right: 10px;' />{c[keys[0]]}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    changeLang = (lang) => {
      console.log('language change:', lang);
    }
  }

  render(
    <div class='container'>
      <div class='row'>
        <Flagstrap countries={countries} choose='Choose language' selected='' />
      </div>
    </div>,
    document.getElementById('app'));
};
