export interface GanarizeConfig {
  text: string;
  en?: GanarizeConfigPerLanguage;
  ko?: GanarizeConfigPerLanguage;
}
export interface GanarizeConfigPerLanguage {
  target: ReplaceTarget;
  gana: Gana;
}
export default function ganarize(config: GanarizeConfig): string {
  let text = config.text;
  if (config.en) text = process(text, config.en, enRegex1, enRegex2, enTable);
  if (config.ko) text = process(text, config.ko, koRegex1, koRegex2, koTable);
  return text;
  function process(
    text: string,
    config: GanarizeConfigPerLanguage,
    regex1: RegExp,
    regex2: RegExp,
    table: { [pattern: string]: HiKaEnKo },
  ): string {
    switch (config.target) {
      default:
        return text;
      case ReplaceTarget.EveryLetter:
        return text.replaceAll(regex1, (a) => table[a][config.gana]);
      case ReplaceTarget.EveryFirstLetterOfWord:
        return replaceEveryWord(
          text,
          (a) => a.replace(regex2, (a) => table[a][config.gana]),
        );
      case ReplaceTarget.EveryFirstLetterOfLine:
        return replaceEveryFirstWord(
          text,
          (a) => a.replace(regex2, (a) => table[a][config.gana]),
        );
    }
  }
}
export enum ReplaceTarget {
  EveryLetter,
  EveryFirstLetterOfWord,
  EveryFirstLetterOfLine,
}
export enum Gana {
  Hiragana,
  Katakana,
}

export const data = [
  "あ:ア:a:아,い:イ:i:이,う:ウ:u:우,え:エ:e:에,お:オ:o:오,,,",
  "か:カ:ka:카,き:キ:ki:키,く:ク:ku:쿠,け:ケ:ke:케,こ:コ:ko:코,きゃ:キャ:kya:캬,きゅ:キュ:kyu:큐,きょ:キョ:kyo:쿄",
  "さ:サ:sa:사,し:シ:shi:시,す:ス:su:스,せ:セ:se:세,そ:ソ:so:소,しゃ:シャ:sha:샤,しゅ:シュ:shu:슈,しょ:ショ:sho:쇼",
  "た:タ:ta:타,ち:チ:chi:치,つ:ツ:tsu:츠,て:テ:te:테,と:ト:to:토,ちゃ:チャ:cha:차,ちゅ:チュ:chu:추,ちょ:チョ:cho:초",
  "な:ナ:na:나,に:二:ni:니,ぬ:ヌ:nu:누,ね:ネ:ne:네,の:ノ:no:노,にゃ:二ャ:nya:냐,にゅ:二ュ:nyu:뉴,にょ:二ョ:nyo:뇨",
  "は:ハ:ha:하,ひ:ヒ:hi:히,ふ:フ:fu:후,へ:ヘ:he:헤,ほ:ホ:ho:호,ひゃ:ヒャ:hya:햐,ひゅ:ヒュ:hyu:휴,ひょ:ヒョ:hyo:효",
  "ま:マ:ma:마,み:ミ:mi:미,む:ム:mu:무,め:メ:me:메,も:モ:mo:모,みゃ:ミャ:mya:먀,みゅ:ミュ:myu:뮤,みょ:ミョ:myo:묘",
  "や:ヤ:ya:야,,ゆ:ユ:yu:유,,よ:ヨ:yo:요,,,",
  "ら:ラ:ra:라,り:リ:ri:리,る:ル:ru:루,れ:レ:re:레,ろ:ロ:ro:로,りゃ:リャ:rya:랴,りゅ:リュ:ryu:류,りょ:リョ:ryo:료",
  "わ:ワ:wa:와,ゐ:ヰ:wi:이,,ゑ:ヱ:we:에,を:ヲ:wo:오,,,",
  "が:ガ:ga:가,ぎ:ギ:gi:기,ぐ:グ:gu:구,げ:ゲ:ge:게,ご:ゴ:go:고,ぎゃ:ギャ:gya:갸,ぎゅ:ギュ:gyu:규,ぎょ:ギョ:gyo:교",
  "ざ:ザ:za:자,じ:ジ:ji:지,ず:ズ:zu:즈,ぜ:ゼ:ze:제,ぞ:ゾ:zo:조,じゃ:ジャ:ja:자,じゅ:ジュ:ju:주,じょ:ジョ:jo:조",
  "だ:ダ:da:다,ぢ:ヂ:ji:지,づ:ヅ:zu:즈,で:デ:de:데,ど:ド:do:도,ぢゃ:ヂャ:ja:자,ぢゅ:ヂュ:ju:주,ぢょ:ヂョ:jo:조",
  "ば:バ:ba:바,び:ビ:bi:비,ぶ:ブ:bu:부,べ:ベ:be:베,ぼ:ボ:bo:보,びゃ:ビャ:bya:뱌,びゅ:ビュ:byu:뷰,びょ:ビョ:byo:뵤",
  "ぱ:パ:pa:파,ぴ:ピ:pi:피,ぷ:プ:pu:푸,ぺ:ペ:pe:페,ぽ:ポ:po:포,ぴゃ:ピャ:pya:퍄,ぴゅ:ピュ:pyu:퓨,ぴょ:ピョ:pyo:표",
  "ん:ン:n:응",
];

export type HiKaEnKo = [string, string, string, string];

export const table = data
  .flatMap((row) => row.split(","))
  .filter((x) => x)
  .map((x) => x.split(":")) as HiKaEnKo[];

export const enTable: { [en: string]: HiKaEnKo } = Object.fromEntries(
  table.slice().sort(
    ([, , a], [, , b]) => b.length - a.length,
  ).map((hikaenko) => [hikaenko[2], hikaenko]),
);
export const enRegex1 = new RegExp(Object.keys(enTable).join("|"), "g");
export const enRegex2 = new RegExp(`^(?:${Object.keys(enTable).join("|")})`);

export const koTable: { [ko: string]: HiKaEnKo } = {};
for (const hikaenko of table) {
  const [, , , ko] = hikaenko;
  if (ko in koTable) continue;
  koTable[ko] = hikaenko;
}
export const koRegex1 = new RegExp(Object.keys(koTable).join("|"), "g");
export const koRegex2 = new RegExp(`^(?:${Object.keys(koTable).join("|")})`);

export function replaceEveryWord(
  text: string,
  fn: Parameters<typeof String.prototype.replaceAll>[1],
) {
  return text.replaceAll(everyWordRegex, fn);
}
export function replaceEveryFirstWord(
  text: string,
  fn: Parameters<typeof String.prototype.replaceAll>[1],
) {
  return text.replaceAll(everyFirstWordRegex, fn);
}
export const everyWordRegex = /[ぁ-んァ-ンa-zA-Z가-힣]+/g;
export const everyFirstWordRegex = /(?<=^\s*)[ぁ-んァ-ンa-zA-Z가-힣]+/gm;
