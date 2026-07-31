export type Locale = 'en';

export interface Dictionary {
  dir: 'ltr';
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    types: string;
    admin: string;
    history: string;
    language: string;
  };
  generator: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    enterData: string;
    customize: string;
    preview: string;
    downloadPng: string;
    downloadSvg: string;
    downloadPdf: string;
    print: string;
    copyImage: string;
    saveToHistory: string;
    shareLink: string;
    copied: string;
    saved: string;
    instantPreview: string;
    scanHint: string;
  };
  types: {
    url: { label: string; desc: string; inputLabel: string; placeholder: string };
    wifi: { label: string; desc: string; ssid: string; password: string; encryption: string; hidden: string };
    vcard: { label: string; desc: string; firstName: string; lastName: string; phone: string; email: string; org: string; title: string; website: string; street: string; city: string; note: string };
    email: { label: string; desc: string; email: string; subject: string; body: string };
    sms: { label: string; desc: string; phone: string; message: string };
    crypto: { label: string; desc: string; currency: string; address: string; amount: string; memo: string };
    pdf: { label: string; desc: string; title: string; fileUrl: string; descLabel: string };
    text: { label: string; desc: string; textLabel: string; placeholder: string };
    whatsapp: { label: string; desc: string; phone: string; message: string };
    event: { label: string; desc: string; title: string; location: string; start: string; end: string; descLabel: string };
    location: { label: string; desc: string; lat: string; lng: string; placeLabel: string };
  };
  customizer: {
    presets: string;
    dotsStyle: string;
    cornerSquareStyle: string;
    cornerDotStyle: string;
    colors: string;
    solidColor: string;
    gradient: string;
    bgColor: string;
    transparentBg: string;
    logo: string;
    selectLogo: string;
    uploadLogo: string;
    removeLogo: string;
    logoSize: string;
    frame: string;
    selectFrame: string;
    frameText: string;
    frameColor: string;
    errorCorrection: string;
    highResolution: string;
  };
  seo: {
    whyUseTitle: string;
    howToTitle: string;
    faqTitle: string;
  };
}
