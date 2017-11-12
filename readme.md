## `<Flagstrap />` for Preact

A dropdown component that makes it possible to choose a country from a [list](https://github.com/bboydflo/flagstrap-preact/blob/master/src/js/countries.js). This component is suited only together with Bootstrap 3 styles and is a direct port of the [following plugin](https://github.com/blazeworx/flagstrap)

## Installation
```sh
$ npm install flagstrap-preact
```



> Make sure to enable transpilation for this module! Check [.babelrc](https://github.com/bboydflo/flagstrap-preact/blob/master/.babelrc) and [webpack configuration](https://github.com/bboydflo/flagstrap-preact/blob/master/https://github.com/bboydflo/flagstrap-preact/blob/master/webpack.config.js) if you have troubles.



## Usage Example


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
  onChange={onChanged}
/>
```


#### Demo

<img alt="preview" src="https://github.com/bboydflo/flagstrap-preact/blob/master/flagstrap-preact.gif" width="720">

---


## Props

| Prop                | Type       | Description         |
|---------------------|------------|---------------------|
| **`countries`**     | _Object_   | Object containing country code as keys and country names as values
| **`choose`**        | _String_   | Default dropdown label.
| **`selected`**      | _String_   | Default selected country code
| **`onChange`**      | _Function_ | Prop to handle dropdown change outside of Flagstrap component



---


### License

[MIT]


[MIT]: http://choosealicense.com/licenses/mit/
