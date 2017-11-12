## `<Flagstrap />` for Preact

A dropdown component that makes it possible to choose a country from a list. This component is suited only together with Bootstrap 3 styles and is a direct port of the [following plugin](https://github.com/blazeworx/flagstrap)


#### [Demo](https://jsfiddle.net/)

<a href="https://jsfiddle.net/developit/qqan9pdo/">
<img alt="preview" src="https://i.gyazo.com/866e97be9075dd63260dbc5df30075ec.gif" width="420">
</a>

---


## Usage Example

Provide the list of items as `data`, an item renderer as `renderRow`, and the height of a single row as `rowHeight`. Everything else is optional.

```js
const onChanged = (countryCode) => {
  console.log('new selected country: ', countryCode);
}

<Flagstrap
    countries={
      'AF': 'Afghanistan',
      'AL': 'Albania',
      'DZ': 'Algeria',
      'AS': 'American Samoa'
    }
    choose={'Choose language'}
    selected={'AS'}
    onChange={onChanged}
/>
```


---


## Props

| Prop                | Type       | Description         |
|---------------------|------------|---------------------|
| **`countries`**     | _Object_   | Object containing country code as keys and country names as values 
| **`choose`**        | _String_   | Default dropdown label.
| **`selected`**      | _String_   | Default selected country code
| **`onChange`**      | _Funtion_  | Prop to handle dropdown change outside of Flagstrap component \*\*


---

## Simple Example

[**View this example on JSFiddle**](https://jsfiddle.net/`)

```js
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

```

---


### License

[MIT]


[MIT]: http://choosealicense.com/licenses/mit/
