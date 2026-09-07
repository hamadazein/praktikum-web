import test from "node:test";
import assert from "node:assert/strict";
import { createStore, gradeQuiz, resumeExercise } from "../assets/js/state.mjs";
const memory = (value) => ({
  value,
  getItem() {
    return this.value ?? null;
  },
  setItem(key, value) {
    this.value = value;
  },
});
test("practice completion persists and never double counts", () => {
  const storage = memory();
  const store = createStore(storage);
  store.complete("01-01", true);
  store.complete("01-01", true);
  assert.deepEqual(createStore(storage).get().completed, ["01-01"]);
  store.complete("01-01", false);
  assert.equal(store.get().completed.length, 0);
});
test("bookmarks toggle separately from practices", () => {
  const store = createStore(memory());
  store.bookmark("02");
  assert.deepEqual(store.get().saved, ["02"]);
  assert.deepEqual(store.get().completed, []);
  store.bookmark("02");
  assert.deepEqual(store.get().saved, []);
});
test("corrupt persisted records recover without bogus progress", () => {
  for (const value of [
    "invalid",
    "null",
    "[]",
    '{"completed":[null,23,"01-01","bad"],"saved":1,"quizzes":null}',
  ]) {
    const state = createStore(memory(value)).get();
    assert.ok(state.completed.every((id) => /^0[1-7]-\d{2}$/.test(id)));
    assert.deepEqual(state.saved, []);
    assert.deepEqual(state.quizzes, []);
  }
});
test("blocked storage allows learning in memory and exposes session-only persistence", () => {
  const store = createStore({
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("blocked");
    },
  });
  store.complete("02-01", true);
  store.bookmark("02");
  assert.deepEqual(store.get().completed, ["02-01"]);
  assert.equal(store.persistent, false);
});
test("quiz feedback distinguishes correct, wrong and unanswered", () => {
  const quiz = {
    answer: 1,
    explanation: "HTML menjelaskan struktur.",
    options: ["Warna", "Struktur", "Database"],
  };
  assert.equal(gradeQuiz(quiz, 1).correct, true);
  assert.equal(gradeQuiz(quiz, 0).correct, false);
  assert.equal(gradeQuiz(quiz, null).correct, false);
  assert.equal(gradeQuiz(quiz, 1).explanation, quiz.explanation);
});
test("resume points to unfinished current practice then next practice", () => {
  const exercises = [
    { id: "01-01", module: "01" },
    { id: "01-02", module: "01" },
    { id: "02-01", module: "02" },
  ];
  assert.equal(
    resumeExercise(exercises, { last: "01-01", completed: [] }).id,
    "01-01",
  );
  assert.equal(
    resumeExercise(exercises, { last: "01-01", completed: ["01-01"] }).id,
    "01-02",
  );
  assert.equal(
    resumeExercise(exercises, { last: "01-02", completed: ["01-01", "01-02"] })
      .id,
    "02-01",
  );
});
