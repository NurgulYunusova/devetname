/* Fontlar, hazır cümlələr, tarix adları və ilkin ayarlar */
"use strict";

/* ================= Məlumat ================= */
const NAME_FONTS = [
  {family:"Great Vibes", style:"normal", weight:400, adj:1},
  {family:"Alex Brush", style:"normal", weight:400, adj:1},
  {family:"Pinyon Script", style:"normal", weight:400, adj:.9, amp:1.7},
  {family:"Allura", style:"normal", weight:400, adj:1.05},
  {family:"Imperial Script", style:"normal", weight:400, adj:.95},
  {family:"Corinthia", style:"normal", weight:700, adj:1.2},
  {family:"Ephesis", style:"normal", weight:400, adj:1.1},
  {family:"Petit Formal Script", style:"normal", weight:400, adj:.78},
  {family:"Dancing Script", style:"normal", weight:500, adj:.85},
  {family:"Playfair Display", style:"italic", weight:400, adj:.72},
  {family:"Cormorant Garamond", style:"italic", weight:500, adj:.85},
  {family:"Noto Serif Display", style:"normal", weight:400, adj:.74},
  {family:"Fraunces", style:"normal", weight:600, adj:.7},
  {family:"Lobster", style:"normal", weight:400, adj:.8},
  {family:"Pacifico", style:"normal", weight:400, adj:.68},
  {family:"Kaushan Script", style:"normal", weight:400, adj:.8},
  {family:"Caveat", style:"normal", weight:700, adj:1},
  {family:"Comfortaa", style:"normal", weight:700, adj:.68},
  {family:"Baloo 2", style:"normal", weight:800, adj:.75},
];
const TEXT_FONTS = [
  {family:"Cormorant Garamond", adj:1.12, digits:"EB Garamond"},
  {family:"Playfair Display", adj:.93, digits:"Noto Serif Display"},
  {family:"Lora", adj:.95},
  {family:"EB Garamond", adj:1.05},
  {family:"Libre Baskerville", adj:.86},
  {family:"Fraunces", adj:.93},
  {family:"Noto Serif Display", adj:1},
  {family:"Montserrat", adj:.88},
  {family:"Josefin Sans", adj:.98},
  {family:"Raleway", adj:.92},
  {family:"Lexend", adj:.88},
  {family:"Nunito", adj:.95},
  {family:"Comfortaa", adj:.86},
  {family:"Baloo 2", adj:.98},
];
const SAMPLE = "ƏəĞğIıİiÖöÜüÇçŞş Aa";

const TITLE = {toy:"Toy mərasimi", nisan:"Nişan mərasimi", xina:"Xına gecəsi"};
const INVITE = {
  toy:{
    oglan:["Sizi oğlumuzun və gəlinimizin toy mərasiminə dəvət edirik. Bu xoşbəxt günümüzdə bizimlə olmağınız ailəmiz üçün böyük şərəfdir.",
           "Oğlumuzun ömrünün ən gözəl gününü sizinlə bölüşmək istəyirik. Toy şənliyimizə xoş gəlmisiniz!"],
    qiz:["Sizi qızımızın və kürəkənimizin toy mərasiminə dəvət edirik. Sevincimizə şərik olmağınızı ürəkdən arzulayırıq.",
         "Qızımızın ən xoşbəxt gününü sizinlə bölüşmək istəyirik. Toy şənliyimizə xoş gəlmisiniz!"],
    cut:["Həyatımızın ən gözəl gününü sizinlə bölüşmək istəyirik. Sizi toy mərasimimizə dəvət edirik.",
         "İki ürəyin bir ömrə çevrildiyi bu xoş gündə sizi aramızda görmək istəyirik."],
    any:["Sevincimiz sizinlə tamamlanacaq. Bu xoş günümüzdə yanımızda olun."]
  },
  nisan:{
    oglan:["Sizi oğlumuzun nişan mərasiminə dəvət edirik. Bu xoş günümüzdə yanımızda olmağınızı arzulayırıq."],
    qiz:["Sizi qızımızın nişan mərasiminə dəvət edirik. Bu xoş günümüzdə yanımızda olmağınızı arzulayırıq."],
    cut:["Ömürlük yolumuzun ilk addımını sizinlə qeyd etmək istəyirik. Sizi nişan mərasimimizə dəvət edirik."],
    any:["Ailələrimizin qohum olduğu bu gözəl gündə sizi aramızda görmək istəyirik."]
  },
  xina:{
    oglan:["Sizi gəlinimizin xına gecəsinə dəvət edirik. Gəlin, bu gözəl gecəni birlikdə şənləndirək."],
    qiz:["Sizi qızımızın xına gecəsinə dəvət edirik. Gəlin, bu gözəl gecəni birlikdə şənləndirək."],
    cut:["Toydan öncəki ən şirin gecəmizi sizinlə keçirmək istəyirik. Sizi xına gecəmizə dəvət edirik."],
    any:["Xına yaxılan bu gecədə sevincimizə şərik olun."]
  }
};
const GREETINGS = ["Hörmətli {qonaq}!", "Əziz qonaqlarımız!", "Əziz dostlar və yaxınlar!", "Hörmətli qohumlar və dostlar!", "Bismillahir-Rahmanir-Rahim"];
const NOTES = ["Zəhmət olmasa, iştirakınızı əvvəlcədən bildirin.", "Dəvətnamə 2 nəfər üçündür.", "Dəvətnamə ailəniz üçündür.", "Gəlişiniz bizim üçün ən gözəl hədiyyədir."];
const CLOSINGS = ["Hörmətlə,", "Sizi səbirsizliklə gözləyirik!", "Gəlişiniz bizi sevindirəcək.", "Sevgi və hörmətlə,"];
const AZ_MONTHS = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avqust","sentyabr","oktyabr","noyabr","dekabr"];
const AZ_DAYS = ["bazar","bazar ertəsi","çərşənbə axşamı","çərşənbə","cümə axşamı","cümə","şənbə"];
const SIZES = {story:[1080,1920], card:[1240,1748]};

const AD_TITLE = {ozu:"Ad günü", valideyn:"Ad günü şənliyi", aile:"Yubiley"};
const AD_INVITE = {
  ozu:["Ad günümü ən yaxın insanlarımla qeyd etmək istəyirəm. Sizi şənliyimə dəvət edirəm!",
       "Yeni yaşımı sizinlə qarşılamaq istəyirəm. Gəlişiniz məni çox sevindirər."],
  valideyn:["Sizi övladımızın ad günü şənliyinə dəvət edirik. Bu sevincli günü birlikdə qeyd edək!",
            "Balacamız bir yaş da böyüyür! Bu xoş günü sizinlə qeyd etmək istəyirik."],
  aile:["Sizi əzizimizin yubileyinə dəvət edirik. Bu xoş günü birlikdə qeyd etmək bizim üçün böyük sevincdir.",
        "Bu əlamətdar günü ailəmiz və dostlarımızla birlikdə qeyd etmək istəyirik."],
  any:["Tort, musiqi və gülüş hazırdır, yalnız siz çatmırsınız!"]
};
const AD_GREETINGS = ["Əziz {qonaq}!", "Hörmətli {qonaq}!", "Salam, əziz dostlar!", "Əziz qohumlar və dostlar!"];
const AD_NOTES = ["Zəhmət olmasa, gələcəyinizi əvvəlcədən bildirin.", "Uşaqlar üçün animator və əyləncə olacaq.", "Geyim kodu: ağ və qızılı.", "Ən gözəl hədiyyə gəlişinizdir."];
const AD_CLOSINGS = ["Sizi gözləyirik!", "Səbirsizliklə gözləyirəm!", "Hörmətlə,", "Sevgi ilə,"];
const DEF_NAMES={oglan:"Murad",qiz:"Aylin"};
const AD_INVITE_G={
  oglan:["Sizi oğlumuzun ad günü şənliyinə dəvət edirik. Bu sevincli günü birlikdə qeyd edək!",
         "Balaca qəhrəmanımız bir yaş da böyüyür! Bu xoş günü sizinlə qeyd etmək istəyirik."],
  qiz:["Sizi qızımızın ad günü şənliyinə dəvət edirik. Bu sevincli günü birlikdə qeyd edək!",
       "Balaca şahzadəmiz bir yaş da böyüyür! Bu xoş günü sizinlə qeyd etmək istəyirik."]
};
const AD_NOTES_G={oglan:["Sevimli qəhrəmanının kostyumunda gəl!","Top və yaxşı əhval gətirməyi unutma!"],qiz:["Ən gözəl donunu geyin və gəl!","Şahzadə tacını unutma!"]};
const SWATCHES_G={
  oglan:["#2f80ed","#1d3557","#00b4d8","#2a9d8f","#ff3b30","#ff8a3d","#ffd400","#6c5ce7","#2a2a2a","#d4af61"],
  qiz:["#e05a9c","#ff6f91","#f7a1c4","#b57edc","#c39bd3","#ff8fab","#b76e79","#d4a24c","#7fd1ae","#5a2a4a"]
};
function defaultAdState(){
  return {
    template:"sar", gender:"qiz", side:"valideyn", person:"Aylin", age:"5", guest:"",
    greeting:AD_GREETINGS[0], invite:AD_INVITE_G.qiz[0], title:AD_TITLE.valideyn, note:"",
    closing:AD_CLOSINGS[0], family:"Hüseynovlar ailəsi",
    date:nextSaturday(), time:"15:00", venue:"Şirin dünya uşaq kafesi", address:"Bakı şəhəri, Neftçilər prospekti 10",
    nameFont:"Lobster", textFont:"Nunito", accent:"", size:"story", intro:"zerf", particles:true
  };
}

function defaultState(){
  return {
    template:"klassik", event:"toy", side:"oglan",
    groom:"Elvin", bride:"Aynur", connector:"&", order:"groom", guest:"",
    greeting:GREETINGS[0], invite:INVITE.toy.oglan[0], title:TITLE.toy, note:"",
    closing:CLOSINGS[0], family:"Məmmədovlar ailəsi",
    date:nextSaturday(), time:"18:00", venue:"Ulduz şadlıq sarayı", address:"Bakı şəhəri, Nizami küçəsi 25",
    nameFont:"Great Vibes", textFont:"Cormorant Garamond", accent:"", size:"story", intro:"saray", particles:true
  };
}
function nextSaturday(){
  const d=new Date(); d.setMonth(d.getMonth()+3); d.setDate(d.getDate()+((6-d.getDay()+7)%7));
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
