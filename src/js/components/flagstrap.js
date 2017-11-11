// http://blazeworx.github.io/flagstrap/
/* import { h } from 'preact';

export default function Flagstrap (props) {
  return <div class='flagstrap' data-input-name='country' data-selected-country={props.pLang} />;
} */

import { h, Component } from 'preact';
import $ from 'jquery';
import Language from '../modules/lang';

/**
   * cs;Český;Česká republika
   * da;Dansk;Danmark
   * de;Deutch;Deutchland
   * en-gb;English GB;Great Britain
   * en-ph;English PH;Philippines
   * en-us;English US;USA
   * en-au;English AU;Australia
   * es;Español;España
   * et;Eesti;Eesti
   * fi;Suomi;Suomi
   * ja;日本人;日本
   * nl;Nederlands;Nederland
   * no;Norsk;Norge
   * pl;Polski;Polska
   * ru;Pусский;Россия
   * sv;Svenska;Sverige
   * uk;Український;Україна
   * zh;中国的;中国
   * th;ไทย;ประเทศไทย
   * mk;македонски;Македонија
   * sr;Србин;Србија
   * bg;български;България
   * vi;Tiếng Việt;Việt Nam
   */

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

export default class Flagstrap extends Component {

  render ({pLang}) {
    return <div class='flagstrap' data-input-name='country' data-selected-country={pLang} />;
  }

  componentDidMount () {

    // apply plugin
    $('.flagstrap').flagStrap({
      countries,
      placeholder: {
        text: Language.labels.progLang[this.props.cLang]
      },
      onSelect: this.props.onChangeLang
    });
  }

  componentWillUnmount () {

    // log
    console.log('component will unmount');

    // remove flagstrap plugin
    $('.flagstrap').remove();
  }

  shouldComponentUpdate () {
    return false;
  }
}
