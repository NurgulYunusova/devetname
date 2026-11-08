# Dəvətnamə Hazırla

Toy, nişan, xına gecəsi və ad günü üçün animasiyalı dəvətnamə sazlayıcısı. Nəticə PNG, video (MP4/WebM) və PDF kimi yüklənir.

Açmaq üçün `index.html` faylını iki dəfə klikləyin. Server və quraşdırma lazım deyil.

## Quruluş

```
index.html                  səhifənin HTML-i (panel və önizləmə)
css/style.css               interfeys stilləri
js/
  data.js                   fontlar, hazır cümlələr, ay və gün adları, ilkin ayarlar
  utils.js                  köməkçilər: easing, rəng, mətn bölmə, upperAz (i → İ)
  ornaments.js              canvas bəzəkləri: buta, çiçək, şar, tac, möhür, fiyonk...
  particles.js              hərəkətli hissəciklər: ləçək, ulduz, konfetti...
  templates/
    core.js                 mkT(): şablon yaratma köməkçisi
    toy-esas.js             TEMPLATES obyekti burada yaradılır + ilk 6 toy şablonu
    ad-esas.js              ad günü: hər kəs üçün şablonlar
    ad-oglan-qiz.js         ad günü: oğlan və qız şablonları
    toy-kolleksiya.js       toy: minimalist, nostalji, klassik, çiçəkli, milli
  layout.js                 mətn bloklarının düzəni, ölçüyə sığdırma
  render.js                 kadr çəkmə, animasiya vaxtları, fon keşi
  intros.js                 açılışlar: saray qapısı, zərf, pərdə
  app.js                    vəziyyət, panel, şablon şəbəkəsi, yükləmə, başlanğıc
```

Skriptlər ES modulu deyil, adi `<script>` fayllarıdır və `index.html`-də göstərilən ardıcıllıqla yüklənir. Səbəbi budur ki, brauzerlər `file://` ünvanında ES modullarını bloklayır, ona görə modul olsaydı, iki kliklə açmaq işləməzdi. Ardıcıllıq vacibdir: `toy-esas.js` `TEMPLATES` obyektini yaradır, sonrakı şablon faylları ona `Object.assign` ilə əlavə edir.

## Yeni şablon əlavə etmək

Uyğun fayla `mkT({...})` ilə yeni bir giriş əlavə edin:

```js
Object.assign(TEMPLATES,{
  yeniSablon:mkT({
    kinds:["toy"], cat:"minimal",            // toy üçün kateqoriya: minimal | vintage | klassik | cicek | milli
    // ad günü üçün: kinds:["ad"], who:["oglan"] | ["qiz"] | ["oglan","qiz"]
    name:"Görünən ad", nameFont:"Great Vibes", textFont:"Lora",
    particles:"dust",                        // none | petals | stars | dust | confetti | hearts | bubbles
    areaF:[.12,.88,.72],                     // mətn sahəsi: yuxarı, aşağı (hündürlüyün payı), en (enin payı)
    pal:{bg1:"#...",bg2:"#...",text:"#...",muted:"#...",accent:"#..."},
    deco(ctx,W,H,pal,p,b,t){ /* p: 0→1 görünmə, b: miqyas (W/1080), t: saniyə */ }
  })
});
```

Fontlar yalnız `data.js`-dəki siyahılardan seçilir. Hamısı Azərbaycan hərfləri (Ə ə Ğ ğ I ı İ i Ö ö Ü ü Ç ç Ş ş) üçün yoxlanılıb. Yeni font əlavə etməzdən əvvəl onun "ə" hərfini dəstəklədiyini yoxlayın. Parisienne, Cinzel, Sacramento, Bodoni Moda, DM Serif Display, Fredoka və Sniglet kimi fontlarda bu hərf yoxdur.

## Yoxlama

URL-ə `?tpl=<şablon>&t=<saniyə>` əlavə etsəniz, animasiya o anda dayanır. Bu, ekran şəkli ilə yoxlamaq üçündür, məsələn `index.html?tpl=mohur&t=99` (son kadr).
