Stripe.setPublishableKey('pk_test_7GDovncuZoBcEOSkMyqSql6d');

$(document).on('ready', function() {
  $('form-errors').hide();
});

$('#product-form').on('submit', function(event){

  console.log('email= ' + $('#stripeEmail').val());

  var value = $('#cc-exp').val();

  _ref = value.split(/[\s\/]+/, 2), month = _ref[0], year = _ref[1];
  if (year.length === 2 && /^\d+$/.test(year)) {
    prefix = (new Date).getFullYear();
    prefix = prefix.toString().slice(0, 2);
    year = prefix + year;
  }
  var month = parseInt(month, 10);
  var year = parseInt(year, 10);

  console.log('month ' + month);
  console.log('yr ' + year);
  
  event.preventDefault();

  $('form-errors').hide();

  Stripe.card.createToken({
    number: $('#cc-number').val(),
    cvc: $('#cc-cvv').val(),
    exp_month: month,
    exp_year: year 
  }, stripeResponseHandler);

  $('#submit-btn').prop("disabled", true);

});

function stripeResponseHandler(status, response) {
  var $form = $('#product-form');
  if (response.error) {
    // Show the errors on the form
    $('#form-errors').show();
    $('#form-errors').html(response.error.message);
    $('#submit-btn').prop("disabled", false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    console.log($form.get(0));
    $form.get(0).submit();
  }
}







// var stripe = Stripe('pk_test_7GDovncuZoBcEOSkMyqSql6d');
// var elements = stripe.elements();

// var card = elements.create('card', {
//   style: {
//     base: {
//       iconColor: '#666EE8',
//       color: '#31325F',
//       lineHeight: '40px',
//       fontWeight: 300,
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSize: '15px',

//       '::placeholder': {
//         color: '#CFD7E0',
//       },
//     },
//   }
// });
// card.mount('#card-element');

// function setOutcome(result) {
//   var successElement = document.querySelector('.success');
//   var errorElement = document.querySelector('.error');
//   successElement.classList.remove('visible');
//   errorElement.classList.remove('visible');

//   if (result.token) {
//     // Use the token to create a charge or a customer
//     // https://stripe.com/docs/charges



//     successElement.querySelector('.token').textContent = result.token.id;
//     successElement.classList.add('visible');
//   } else if (result.error) {
//     errorElement.textContent = result.error.message;
//     errorElement.classList.add('visible');
//   }
// }

// card.on('change', function(event) {
//   setOutcome(event);
// });

// document.querySelector('form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   var form = document.querySelector('form');
//   var extraDetails = {
//     name: form.querySelector('input[name=cardholder-email]').value,
//   };
//   stripe.createToken(card, extraDetails).then(setOutcome);
// });