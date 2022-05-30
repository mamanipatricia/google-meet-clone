import Hashids from 'hashids';
import {hashIdsSalt} from '../config/config';

export const encodeId = (id: number): string => {
  const hash = new Hashids(hashIdsSalt);
  return hash.encode(id);
};

export const decodeId = (id: string): bigint | number => {
  const hash = new Hashids(hashIdsSalt);
  return hash.decode(id)[0];
};
