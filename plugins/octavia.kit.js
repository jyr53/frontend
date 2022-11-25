/*
 * ============================
 * File: Octavia.kit.js
 * Project: Octavia-Admin
 * File Created: Monday, 13th April 2020 6:18:44 pm
 * Author:UILIB
 * AuthorUrl:https://ui-lib.com/
 * -----
 * Last Modified: Monday, 13th April 2020 7:16:37 pm
 * Modified By: naime hossain (naime.hossain93@gmail.com)
 * -----
 * Copyright 2020 - 2021 UILIB, UILIB
 * ============================
 */
import Vue from "vue";

Vue.component(
  "HorizontalBar",
  // The `import` function returns a Promise.

  () => import("~/layouts/horizontal/Index")
);
