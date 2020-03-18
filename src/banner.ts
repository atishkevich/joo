const HOST = 'https://n1banner.firebaseapp.com/';
const BANNER_URL = 'https://joopartners.com/a93bc4827';

declare const firebase: any;

declare global {
  interface Window {
    firebaseConfig: any;
  }
}

class Banner {
  private readonly host: string = HOST;

  private size = '200x200';

  private readonly url: string = BANNER_URL;

  private readonly container: HTMLElement = document.getElementById('root');

  private db: any = firebase.database();

  constructor() {
    if (!this.isIframe()) window.location.href = this.url;
    this.render();
    document.querySelector('img').addEventListener('click', this.trackBannerClick.bind(this));
  }

  getDimensions(): { width: string; height: string } {
    const urlSize = this.parseUrlParams('bannerSize');
    if (urlSize) this.size = urlSize;
    const [width, height] = this.size.split('x');
    return { width, height };
  }

  parseUrlParams(param: string): any {
    const urlString = window.location.href;
    const url = new URL(urlString);
    return url.searchParams.get(param);
  }

  isIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  fetch(url: string, success?: Function, error?: Function): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (success) success(xhr.responseText);
      } else if (error) {
        error(error);
      }
    };
    xhr.send();
  }

  track(path: string): void {
    const saveToDb = (data: any): void => {
      const { size } = this;
      const key = this.db.ref(path).push().key;
      this.db.ref(`${path}/${key}`).set({
        size,
        data,
      });
    };
    this.fetch(
      'https://www.cloudflare.com/cdn-cgi/trace',
      saveToDb,
      saveToDb,
    );
  }

  trackBannerView(): void {
    this.track('stats/views');
  }

  trackBannerClick(): void {
    console.log('track');
    this.track('stats/clicks');
  }

  render(): void {
    this.trackBannerView();
    const { width, height } = this.getDimensions();
    const html = `
      <a href="${this.url}" target="_blank">
        <img src="${this.host}/banners/joo_banner_${width}x${height}.gif" alt="JOO CASINO. 100 Фри спинов!">
      </a>
    `;
    this.container.innerHTML = html;
  }
}

const banner = new Banner();

export default banner;
