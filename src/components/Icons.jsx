export function IconLibrary() {
  return (
  <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
    <symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/></symbol>
    <symbol id="i-camera" viewBox="0 0 24 24"><path d="m3 6 12-3 5 7-12 4-5-8Zm5 8-1 4h7m-4-5 1 5m9-8 2 2-4 2"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="m5 3 4 1 1 5-3 2a13 13 0 0 0 6 6l2-3 5 1 1 4c-2 5-9 1-13-3S0 5 5 3Z"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.3-4.5A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="m8 7 1.5 2-1 1.5a7 7 0 0 0 3 3l1.5-1 2 1.5c0 3-4 2-6-1s-4-6-1-7Z"/></symbol>
    <symbol id="i-monitor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-6-9 3-3 4 4 4-5"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></symbol>
    <symbol id="i-scan" viewBox="0 0 24 24"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M2 12h20"/><path d="M9 7h6m-6 10h6"/></symbol>
    <symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></symbol>
  </svg>
  );
}

export function Icon({ name, className = "", ...props }) {
  return <svg className={`icon ${className}`.trim()} aria-hidden="true" {...props}><use href={`#i-${name}`} /></svg>;
}
