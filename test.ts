import ganarize, { Gana, ReplaceTarget } from "./ganarize.ts";

console.log(
  ganarize({
    text: `사귀자!
시큰둥~
스케줄이 바빠서 이만.
세번째 차였다⋯⋯.
소개팅은 나랑 맞지 않아.`,
    ko: { target: ReplaceTarget.EveryFirstLetterOfLine, gana: Gana.Hiragana },
  }),
);
console.log("====================");
console.log(
  ganarize({
    text: `오늘 여정
android kotlin 라이브러리를 하나 만들자 (android도 모르고 kotlin도 모름) ->
android studio 설치 ->
여기서는 kotlin만 우선 연습해보기가 곤란하네 ->
intellij ce 설치 ->
kotlin 비동기 프로그래밍 문서 정독 ->
kotlin 비동기 대략 이해한것 같다. 이제 써봐야지 ->
gradle 이슈`,
    en: { target: ReplaceTarget.EveryFirstLetterOfWord, gana: Gana.Katakana },
    ko: { target: ReplaceTarget.EveryLetter, gana: Gana.Hiragana },
  }),
);
