import * as dotenv from 'dotenv';
;

import Word from '../models/words';
import BaseCtrl from './base';

export default class WordCtrl extends BaseCtrl {
model = Word;

  getWord() {
  console.log('functions')
}
}
