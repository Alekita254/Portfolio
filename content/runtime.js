const CONTENT_BUNDLE_KEY = "alex-os-content-bundle";

const isBrowser = typeof window !== "undefined";

const isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]";

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

export const mergeContentValue = (baseValue, overrideValue) => {
  if (Array.isArray(baseValue)) {
    return Array.isArray(overrideValue) ? overrideValue.slice() : cloneValue(baseValue);
  }

  if (isPlainObject(baseValue) || isPlainObject(overrideValue)) {
    const baseObject = isPlainObject(baseValue) ? baseValue : {};
    const overrideObject = isPlainObject(overrideValue) ? overrideValue : {};
    const result = {};
    const keys = new Set([...Object.keys(baseObject), ...Object.keys(overrideObject)]);

    keys.forEach((key) => {
      result[key] = mergeContentValue(baseObject[key], overrideObject[key]);
    });

    return result;
  }

  if (overrideValue === undefined) {
    return cloneValue(baseValue);
  }

  return cloneValue(overrideValue);
};

export const readContentBundle = () => {
  if (!isBrowser) {
    return null;
  }

  try {
    const rawBundle = window.localStorage.getItem(CONTENT_BUNDLE_KEY);
    if (!rawBundle) {
      return null;
    }

    const parsedBundle = JSON.parse(rawBundle);
    return isPlainObject(parsedBundle) ? parsedBundle : null;
  } catch (error) {
    return null;
  }
};

export const saveContentBundle = (bundle) => {
  if (!isBrowser) {
    return false;
  }

  window.localStorage.setItem(CONTENT_BUNDLE_KEY, JSON.stringify(bundle, null, 2));
  window.dispatchEvent(new CustomEvent("alex-os:content-updated", { detail: { bundle } }));
  return true;
};

export const resetContentBundle = () => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(CONTENT_BUNDLE_KEY);
  window.dispatchEvent(new CustomEvent("alex-os:content-updated", { detail: { bundle: null } }));
};

export const getContentBundleStorageKey = () => CONTENT_BUNDLE_KEY;