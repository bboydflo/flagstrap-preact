export default (_, Toastr) => {

  // define methods
  let extend = _.extend;
  let isEmpty = _.isEmpty;

  // private helper function
  return (ev, o) => {

    let { type, message, options = null } = o;

    // set up default toastr options
    let _options = {
      'closeButton': true,
      'debug': false,
      'positionClass': 'toast-bottom-full-width margin-bottom',
      'onclick': null,
      'showDuration': '5000',
      'hideDuration': '500',
      'timeOut': '3000',
      'progressBar': true,
      'extendedTimeOut': '500',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };

    // adjust options each time a toast is published
    if (options === null || options === undefined || isEmpty(options)) {
      extend(Toastr.options, _options);
    } else if (typeof options === 'object' && !isEmpty(options)) {
      extend(Toastr.options, _options, options);
    }

    // check toast type
    switch (type) {
      case 0:
      case 'info':
        Toastr.info(message);
        break;
      case 1:
      case 'success':
        Toastr.success(message);
        break;
      case 2:
      case 'warning':
        Toastr.warning(message);
        break;
      case 3:
      case 'error':
        Toastr.error(message);
        break;
    }
  };
};
