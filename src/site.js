export const CONTACT = Object.freeze({
  whatsapp: '5545998066142',
  whatsappDisplay: '(45) 99806-6142',
  phone: '+554437780417',
  phoneDisplay: '(44) 3778-0417',
  email: 'rotasegur2016@gmail.com',
  address: 'Avenida Paraná, 557',
  city: 'Formosa do Oeste – PR',
  postalCode: '85830-000',
});

export function whatsappUrl(message = '') {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
