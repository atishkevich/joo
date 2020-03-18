# JOO Casino banner rotation.

Для инсталляции кода нужно вставить скрипт:

[https://n1banner.firebaseapp.com/client.min.js](https://n1banner.firebaseapp.com/client.min.js)

Инициализировать каждый блок с баннером:

```
window.addEventListener('load', function () {
  var container = document.getElementById('anyId');
  jooBanner.addBanner({
    size: '250x250',
    container: container,
    languages: ['ru', 'en']
  });
})
```
где

size: string - размер баннера (250х250, 200x300, 240x400)

container: HtmlElement - контейнер в котором отрисовать баннер

languages: string[] - массив языков, для которых отрисовывать баннер. (Пока показываем по локали, есть возможность по гео показывать)

Локали для начала думаю стоит выбрать ['ru', 'be', 'kk', 'uk']

## Как работает

Скрипт отрисовывает ифрейм. В ифрейме открывает страницу, которая хостится на Firebase.

Картинки раздаются через firebase cdn с минимальным latency. Скрипт в ифрейме ведет учет показов/кликов и логгирует это дело в firebase.

Код клиентской части и отрисовки баннера и статистики можно посмотреть в /src

