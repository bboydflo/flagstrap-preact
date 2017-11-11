/--------------------------------------------------/
import { h } from 'preact';

// pure functional stateless preact component
export default (props) => {

  // log
  console.log(props);

  return <div class="shell">Shell</div>;
};

/--------------------------------------------------/
import { h, Component } from 'preact';

// pure functional stateless preact component
export default class Shell extends Component {

  constructor(props) {
    super(props);

    // define components internal state
    this.state = {
      user: null
    };
  }

  componentDidMount() {

    // Now attached to the DOM
    console.log('now attached to the dom');
  }

  componentWillUnmount() {

    // About to be removed
    console.log('about to remove from dom');
  }

  render(props, state) {

    // analogous to a functional component
    return <div class class="shell">Hello Preact!</div>;
  }
};