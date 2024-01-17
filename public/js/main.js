function onSubmit(e) {
  e.preventDefault();

  document.querySelector("#prompt").textContent = "";

  const prompt = document.querySelector("#prompt").value;
  const size = "small";

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch("http://localhost:5000/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    removeSpinner();
    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function guessImage() {
  makeHidden();
  setTimeout(function () {
    moveElements();
    document.querySelector("#prompt").value = "";
  }, 300);
  setTimeout(function () {
    makeVisible();
    document.querySelector("#prompt").placeholder =
      "Guess the prompt used to make this image";
  }, 900);
}

function makeHidden() {
  document.querySelector("#prompt").classList.remove("visible");
  document.querySelector("#get-image").classList.remove("visible");

  document.querySelector("#prompt").classList.add("hidden");
  document.querySelector("#get-image").classList.add("hidden");
}

function moveElements() {
  document.querySelector("#image-display").classList.add("move-up");
  document.querySelector("#image-form").classList.add("move-down");
}

function makeVisible() {
  document.querySelector("#prompt").classList.remove("hidden");
  document.querySelector("#get-image").classList.remove("hidden");

  document.querySelector("#prompt").classList.add("visible");
  document.querySelector("#get-image").classList.add("visible");
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
document.querySelector("#image-form").addEventListener("submit", onSubmit);
