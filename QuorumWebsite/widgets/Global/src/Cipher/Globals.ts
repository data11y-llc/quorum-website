import { frequencyType } from './Types.js';

export const LOADER = 'cipherLoader';

export const sentenceOptionsCaesarSub = new Map([
  ['Caesar decrypted 1', 'Here is a plain text message that hasn\'t been encrypted at all. You can click the buttons below to experiment with the frequency analysis and random substitution tools. Try clicking all the buttons - sort the substitutions in different ways. What\'s the most frequently occuring letter? Once you have a sense for what\'s happening, try to crack a random substitution cipher!'],
  ['Caesar encrypted 1', 'pmzm qa i xtiqv bmfb umaaiom bpib piav\'b jmmv mvkzgxbml ib itt. gwc kiv ktqks bpm jcbbwva jmtwe bw mfxmzqumvb eqbp bpm nzmycmvkg ivitgaqa ivl zivlwu acjabqbcbqwv bwwta. bzg ktqksqvo itt bpm jcbbwva - awzb bpm acjabqbcbqwva qv lqnnmzmvb eiga. epib\'a bpm uwab nzmycmvbtg wkkczqvo tmbbmz? wvkm gwc pidm i amvam nwz epib\'a pixxmvqvo, bzg bw kziks i zivlwu acjabqbcbqwv kqxpmz!'],
  ['Caesar decrypted 2', 'abc def ghi jkl mno pqr stu vwx yz'],
  ['Caesar encrypted 2', 'lmn opq rst uvw xyz abc def ghi jk'],
  ['Caesar decrypted 3', 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'],
  ['Caesar encrypted 3', 'cbs hkc hvfss tcif twjs gwl gsjsb swuvh bwbs hsb szsjsb hkszjs hvwfhssb tcifhssb twthssb gwlhssb gsjsbhssb swuvhssb bwbshssb hksbhm'],
])

export const sentenceOptionsRandomSub = new Map([
  ['Random decrypted 1', 'Here is a plain text message that hasn\'t been encrypted at all. You can click the buttons below to experiment with the frequency analysis and random substitution tools. Try clicking all the buttons - sort the substitutions in different ways. What\'s the most frequently occuring letter? Once you have a sense for what\'s happening, try to crack a random substitution cipher!'],
  ['Random encrypted 1', 'rvkv yf j hwjyg ovdo uvffjqv orjo rjfg\'o mvvg vgiklhovb jo jww. lan ijg iwyiz orv mnooagf mvwat oa vdhvkyuvgo tyor orv pkvcnvgil jgjwlfyf jgb kjgbau fnmfoyonoyag oaawf. okl iwyizygq jww orv mnooagf - fako orv fnmfoyonoyagf yg byppvkvgo tjlf. trjo\'f orv uafo pkvcnvgowl aiinkygq wvoovk? agiv lan rjsv j fvgfv pak trjo\'f rjhhvgygq, okl oa ikjiz j kjgbau fnmfoyonoyag iyhrvk!'],
  ['Random decrypted 2', 'abc def ghi jkl mno pqr stu vwx yz'],
  ['Random encrypted 2', 'iel vbk fnr cst oyp qau wxj mgd hz'],
  ['Random decrypted 3', 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'],
  ['Random encrypted 3', 'ekg bhe bptgg leqt lsdg rsc rgdgk gsypb kskg bgk gzgdgk bhgzdg bpstbggk leqtbggk lslbggk rscbggk rgdgkbggk gsypbggk kskgbggk bhgkba'],
])

const [firstKey] = sentenceOptionsCaesarSub.keys();

export namespace CipherGlobals {
  export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  export const sentence: string = sentenceOptionsCaesarSub.get(firstKey) || "";
}

export namespace CipherGlobals {
  export let OG_MESSAGE_FREQUENCY: frequencyType;
  export const STD_ENGLISH_FREQUENCY: frequencyType = { a: 0.08167, b: 0.01492, c: 0.02782, d: 0.04253, e: 0.12702, f: 0.02228, g: 0.02015, h: 0.06094, i: 0.06966, j: 0.00153, k: 0.00772, l: 0.04025, m: 0.02406, n: 0.06749, o: 0.07507, p: 0.01929, q: 0.00095, r: 0.05987, s: 0.06327, t: 0.09056, u: 0.02758, v: 0.00978, w: 0.02361, x: 0.0015, y: 0.01974, z: 0.00074 }
}

export enum Pitch {
  normal = 1,
  locked = 1.5,
  unlocked = 0.5
}

export const RATE = 1.4;
