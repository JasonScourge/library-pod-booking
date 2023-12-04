import React from "react";

import alertUser from "../utils/alertUser";
import { range } from "../utils/arrayUtils";
import validateNric from "../utils/validateNricFin";

test("Test Alert User", async () => {
  const event = new Event("event");
  const element = alertUser(event);
  expect(element).toBeUndefined();
});

test("Test Array Utils range", async () => {
  const element = range(1, 8);
  expect(element[0]).toEqual(1);
  expect(element[7]).toEqual(8);
});

test("Test validateNric to validate correct NRICS", async () => {
  let element = validateNric("S9021775E");
  expect(element).toBeTruthy;

  element = validateNric("T4680121G");
  expect(element).toBeTruthy;

  element = validateNric("M3957601L");
  expect(element).toBeTruthy;

  element = validateNric("F9614941R");
  expect(element).toBeTruthy;

  element = validateNric("G9551609U");
  expect(element).toBeTruthy;
});

test("Test validateNric to validate wrong NRICS", async () => {
  let element = validateNric("a");
  expect(element).toBeFalsy;

  element = validateNric("G9551609UX");
  expect(element).toBeFalsy;
});
