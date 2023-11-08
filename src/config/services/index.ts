function validatePhone(phoneNumber: string) {
   var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
   return phoneNumberPattern.test(phoneNumber);
}

