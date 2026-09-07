const KEY = "praktika.progress.v1";
const validModule = (id) => typeof id === "string" && /^0[1-7]$/.test(id);
const validExercise = (id) =>
  typeof id === "string" && /^0[1-7]-\d{2}$/.test(id);
const clean = (input, validate) =>
  Array.isArray(input) ? [...new Set(input.filter(validate))] : [];
export function gradeQuiz(quiz, selected) {
  return {
    correct: Number.isInteger(selected) && selected === quiz.answer,
    explanation: quiz.explanation,
  };
}
export function resumeExercise(exercises, state) {
  const last = exercises.find((item) => item.id === state.last);
  if (last && !state.completed.includes(last.id)) return last;
  return (
    exercises.find(
      (item) =>
        item.module === last?.module && !state.completed.includes(item.id),
    ) ||
    exercises.find((item) => !state.completed.includes(item.id)) ||
    last ||
    exercises[0]
  );
}
export function createStore(storage) {
  let persistent = true;
  let state = {
    completed: [],
    saved: [],
    quizzes: [],
    last: null,
    largeText: false,
    reduceMotion: false,
  };
  try {
    storage ??= globalThis.localStorage;
    const raw = JSON.parse(storage.getItem(KEY) || "{}");
    if (raw && typeof raw === "object" && !Array.isArray(raw))
      state = {
        completed: clean(raw.completed, validExercise),
        saved: clean(raw.saved, validModule),
        quizzes: clean(raw.quizzes, validModule),
        last: validExercise(raw.last) ? raw.last : null,
        largeText: raw.largeText === true,
        reduceMotion: raw.reduceMotion === true,
      };
  } catch {
    /* Defaults keep learning available when storage data is invalid. */
  }
  const save = () => {
    try {
      storage.setItem(KEY, JSON.stringify(state));
    } catch {
      persistent = false;
    }
  };
  return {
    get: () => structuredClone(state),
    get persistent() {
      return persistent;
    },
    complete(id, done) {
      if (!validExercise(id)) return;
      state.completed = state.completed.filter((value) => value !== id);
      if (done) state.completed.push(id);
      save();
    },
    bookmark(id) {
      if (!validModule(id)) return;
      state.saved = state.saved.includes(id)
        ? state.saved.filter((value) => value !== id)
        : [...state.saved, id];
      save();
    },
    visit(id) {
      if (validExercise(id)) {
        state.last = id;
        save();
      }
    },
    passQuiz(id) {
      if (validModule(id)) {
        state.quizzes = [...new Set([...state.quizzes, id])];
        save();
      }
    },
    preference(key, value) {
      if (["largeText", "reduceMotion"].includes(key)) {
        state[key] = value === true;
        save();
      }
    },
  };
}
