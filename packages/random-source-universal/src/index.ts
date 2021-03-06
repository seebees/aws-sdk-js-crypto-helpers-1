import {
  randomValues as browserRandomValues
} from '@aws-crypto/random-source-browser';
import {
  randomValues as nodeRandomValues
} from '@aws-crypto/random-source-node';
import {randomValues as IRandomValues} from '@aws-sdk/types';

/**
 * @implements {IRandomValues}
 */
export function randomValues(byteLength: number): Promise<Uint8Array> {
  if (supportsCryptoModule) {
    return nodeRandomValues(byteLength);
  }

  return browserRandomValues(byteLength);
}

/**
 * Try to require Node's crypto module and record whether the operation
 * succeeded.
 *
 * @internal
 */
const supportsCryptoModule: boolean = (() => {
  try {
    return !!require('crypto').randomBytes;
  } catch {
    return false;
  }
})();
