'use strict';


(((() => {
  this.currentScript = {
    getAttribute: (e) => {
      if (e == "data-module") {
        return "/src/NISTWorker.bs.js";
      }
      return null;
    },
    hasAttribute: () => true,
    src: "/moduleserve/load.js"
  };
  this.window = this;
  this.document = this;
  importScripts("/moduleserve/load.js");
  })()));

/*  Not a pure module */
