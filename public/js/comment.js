const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#comment-name").value.trim();
  const comment = document.querySelector("#comment-desc").value.trim();

  if (name && comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ name, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
