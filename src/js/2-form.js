const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

// 🔹 Input
form.addEventListener("input", () => {
  const data = new FormData(form);

  const obj = {
    email: data.get("email")?.trim() || "",
    message: data.get("message")?.trim() || "",
  };

  saveToLS(STORAGE_KEY, obj);
});

// 🔹 Load
document.addEventListener("DOMContentLoaded", () => {
  const saved = loadFromLS(STORAGE_KEY, {});

  form.elements.email.value = saved.email || "";
  form.elements.message.value = saved.message || "";
});

// 🔹 Submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const data = new FormData(form);

  const email = data.get("email")?.trim();
  const message = data.get("message")?.trim();

  if (!email || !message) {
    alert("Fill please all fields");
    return;
  }

  const obj = { email, message };

  console.log(obj);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key, defaultValue = {}) {
  const jsonData = localStorage.getItem(key);

  if (!jsonData) return defaultValue;

  try {
    return JSON.parse(jsonData);
  } catch {
    return defaultValue;
  }
}




/* const formData = {
  email: "",
  message: "",
};

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

form.addEventListener("input", e => {
  const { name, value } = e.target;

  if (name === "email" || name === "message") {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  const parsed = JSON.parse(saved);

  formData.email = parsed.email || "";
  formData.message = parsed.message || "";

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});


form.addEventListener("submit", e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = "";
  formData.message = "";

  form.reset();
}); */