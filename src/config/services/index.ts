function validatePhone(phoneNumber: string) {
   const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
   return phoneNumberPattern.test(phoneNumber);
}

