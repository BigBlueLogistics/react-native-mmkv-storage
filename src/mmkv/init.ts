import mmkvJsiModule, { mmkvBridgeModule } from '../module/index';

// Installing JSI Bindings as done by
// https://github.com/mrousavy/react-native-mmkv

/**
 * Check if functions installed from JSI are present in global object.
 */
export function isLoaded() {
  return typeof mmkvJsiModule?.getStringMMKV === 'function';
}

/**
 * Install bindings lazily.
 *
 * Note: You don't need to call this normally.
 */
export function init() {
  try {
    if (!isLoaded()) {
      const installed = mmkvBridgeModule.install();
      if (!installed) throw new Error('JSI bindings were not installed for: MMKVStorage');

      if (!isLoaded()) {
        throw new Error('JSI bindings installation failed for: MMKVStorage');
      }
      return installed;
    }
    return true;
  } catch (e) {
    console.error('JSI bindings were not installed for: MMKVStorage', e);
    return false;
  }
}
