const HOST = 'https://n1banner.firebaseapp.com/';

type BannerConfigType = {
  size: string;
  container: HTMLElement;
  languages: string[];
};

declare global {
  interface Window {
    jooBanner: JooBanner;
  }
}

class JooBanner {
  createIframe(size: string): HTMLElement {
    size = size || '200x200';
    const [width, height] = size.split('x');
    let iframe = null;
    if (width && height) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('width', width);
      iframe.setAttribute('height', height);
      iframe.setAttribute('src', `${HOST}?bannerSize=${size}`);
      iframe.setAttribute('frameBorder', 0);
      iframe.setAttribute('scrolling', 'no');
    }
    return iframe;
  }

  isAllowedForLang(bannerLangs: string[]): boolean {
    if (!bannerLangs || !bannerLangs.length) return true;
    const { language, languages } = navigator;
    const allowedLangs = bannerLangs.filter((bannerLang: string) => {
      if (languages) return languages.includes(bannerLang);
      return language.indexOf(bannerLang) > -1;
    });
    return !!allowedLangs.length;
  }

  addBanner(config: BannerConfigType): void {
    const { size, container, languages } = config;
    const iframe = this.createIframe(size);
    const isAllowed = this.isAllowedForLang(languages);
    if (container && isAllowed) container.appendChild(iframe);
  }
}

const jooBanner = new JooBanner();

window.jooBanner = jooBanner;

export default jooBanner;
