// Get the form element
const form = document.querySelector('#pricing-form');

// Add event listener to form submit

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default form submission behavior
  
  // Get the input values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const checkInDate = document.querySelector('#check-in-date').value;
  const numNights = parseInt(document.querySelector('#nights').value);
  const roomType = document.querySelector('input[name="room-type"]:checked').value;
  const numAdults = parseInt(document.querySelector('#adults').value);
  const numChildren = parseInt(document.querySelector('#children').value);
  const discount = document.querySelector('input[name="discount"]:checked').value;

  // Calculate the room rate based on the input values
  const rate = getRoomRate(checkInDate, roomType);
  const total = calculateTotal(rate, numNights, numAdults, numChildren, discount);

  // Display the rate and total to the user
  document.querySelector('#room-type').textContent = rate.toFixed(2);
  document.querySelector('#total').textContent = total.toFixed(2);
  document.querySelector('#confirmation').textContent = `Thank you, ${name}! Your reservation for a ${roomType} room for ${numAdults} adults and ${numChildren} children from ${checkInDate} to ${getNextDate(checkInDate, numNights)} has been confirmed.`;
});

// Helper function to get the room rate based on the check-in date and room type
function getRoomRate(checkInDate, roomType) {
  const baseRates = {
    'Queen': 150.00,
    'King': 200.00,
    '2-Bedroom Suite': 350.00
  };
  let rate = baseRates[roomType];

  // Check for holiday rates
  if (isHoliday(checkInDate)) {
    rate *= 1.5;
  }

  return rate;
}

// Helper function to check if the given date is a holiday
function isHoliday(date) {
  const holidays = ['01/01', '07/04', '12/25'];
  const monthDay = date.slice(5); // extract the month and day from the date string
  return holidays.includes(monthDay);
}

// Helper function to calculate the total cost of the reservation
function calculateTotal(rate, numNights, numAdults, numChildren, discount) {
  let subtotal = rate * numNights * (numAdults + 0.5 * numChildren);
  let discountAmount = 0;

  if (discount === 'AAA/Senior') {
    discountAmount = 0.1 * subtotal;
  } else if (discount === 'Military') {
    discountAmount = 0.2 * subtotal;
  }

  return subtotal - discountAmount;
}

// Helper function to get the date that is numDays after the given date
function getNextDate(date, numDays) {
  const d = new Date(date);
  d.setDate(d.getDate() + numDays);
  return d.toLocaleDateString();
}
