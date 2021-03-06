import {Sha256 as BrowserSha256} from '@aws-crypto/sha256-browser';
import {Hash as NodeHash} from '@aws-sdk/hash-node';
import {Hash, SourceData} from '@aws-sdk/types';

export class Sha256 implements Hash {
  private readonly hash: Hash;

  constructor(secret?: SourceData) {
  if (supportsCryptoModule()) {
    this.hash = new NodeHash('sha256', secret);
  } else {
    this.hash = new BrowserSha256(secret);
  }
  }

  update(data: SourceData, encoding?: 'utf8' | 'ascii' | 'latin1'): void {
  this.hash.update(data, encoding);
  }

  digest(): Promise<Uint8Array> {
  return this.hash.digest();
  }
}

function supportsCryptoModule(): boolean {
  try {
  return !!require('crypto').createHash;
  } catch {
  return false;
  }
}
