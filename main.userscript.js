// ==UserScript==
// @name         Remove Twitter Blue / X Premium nags and ad revenue ads
// @namespace    davidstudios.uk
// @version      1.1-rc
// @description  Removes the Eloninization from Twitter
// @author       DavidTDC3377/OwnedByWuigi
// @match        *://*.twitter.com/* *://*.x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// ==/UserScript==
"use strict";
(() => {
    /**
     * Calls the provided callback when the document is loaded
     */
    function onReady(fn) {
        if (document.readyState != "loading") {
            fn();
        }
        else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    /**
     * Waits for Element added as a descendant of `parent` that matches `selector`.
     */
    function waitForElement(parent, selector, callback, runOnce = true) {
        const elementNow = parent.querySelector(selector);
        if (elementNow) {
            callback(elementNow);
            if (runOnce) {
                return;
            }
        }
        const observer = new MutationObserver((records) => {
            records.forEach((record) => {
                record.addedNodes.forEach((parentElement) => {
                    if (parentElement instanceof Element) {
                        parentElement.querySelectorAll(selector).forEach((element) => {
                            if (runOnce) {
                                observer.disconnect();
                            }
                            callback(element);
                        });
                    }
                });
            });
        });
        observer.observe(parent, {
            childList: true,
            subtree: true,
        });
    }
    onReady(() => {
        waitForElement(document, "aside[aria-label='Get Verified']", (element) => { // is this nag still there?
            element.parentElement?.remove();
        }, false);
        
        waitForElement(document, "aside[aria-label='X Premium']", (element) => {
            element.parentElement?.remove();
        }, false);

        waitForElement(document, "aside[aria-label='Twitter Blue']", (element) => { // just in case elon is lazy, might remove soon
            element.parentElement?.remove();
        }, false);
        
        waitForElement(document, "aside[aria-label='You may be missing out on ads revenue sharing!']", (element) => {
            element.parentElement?.remove();
        }, false);
        
        waitForElement(document, "a[aria-label='Verified'][href='/i/verified-choose']", (element) => {
            element.remove();
        }, false);
    });
})();
