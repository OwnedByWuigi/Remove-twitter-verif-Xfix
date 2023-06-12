// ==UserScript==
// @name         Remove Twitter Blue Promotions
// @namespace    davidstudios.uk
// @version      1.0
// @description  Removes the "Get Verified" box on the Home page and the "Verified" button on the sidebar
// @author       David Studios
// @match        *://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
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
        waitForElement(document, "aside[aria-label='Get Verified']", (element) => {
            element.parentElement?.remove();
        }, false);
        waitForElement(document, "a[aria-label='Verified'][href='/i/verified-choose']", (element) => {
            element.remove();
        }, false);
    });
})();
