// Load the sidebar HTML into the container
fetch("sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar-container").innerHTML = data;

    // Now re-attach collapsible button behavior after sidebar loads
    document.querySelectorAll(".collapsible").forEach(button => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");

        const content = button.nextElementSibling;
        if (button.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  })
  .catch(err => console.error("Sidebar failed to load:", err));
