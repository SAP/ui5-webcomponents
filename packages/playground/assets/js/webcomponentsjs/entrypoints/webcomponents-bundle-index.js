// Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

'use strict';

/*
 * Polyfills loaded: HTML Imports, Custom Elements, Shady DOM/Shady CSS, platform polyfills, template
 * Used in: webcomponents bundle to load ALL the things
 */

import './webcomponents-sd-ce-pf-index.js';

const customElements = window.customElements;

let shouldFlush = false;
/** @type {?function()} */
let flusher = null;

if (customElements['polyfillWrapFlushCallback']) {
  customElements['polyfillWrapFlushCallback']((flush) => {
    flusher = flush;
    if (shouldFlush) {
      flush();
    }
  });
}

function flushAndFire() {
  if (window.HTMLTemplateElement.bootstrap) {
    window.HTMLTemplateElement.bootstrap(window.document);
  }
  flusher && flusher();
  shouldFlush = true;
  window.WebComponents.ready = true;
  document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));
}

if (document.readyState !== 'complete') {
  // this script may come between DCL and load, so listen for both, and cancel load listener if DCL fires
  window.addEventListener('load', flushAndFire)
  window.addEventListener('DOMContentLoaded', () => {
    window.removeEventListener('load', flushAndFire);
    flushAndFire();
  });
} else {
  flushAndFire();
}