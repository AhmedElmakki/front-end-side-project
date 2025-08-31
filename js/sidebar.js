// Load the sidebar HTML into the container
fetch("sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar-container").innerHTML = data;

    const collapsibles = document.querySelectorAll(".collapsible");

    // Restore open/closed states from localStorage
    collapsibles.forEach((button, index) => {
      const isActive = localStorage.getItem("sidebar-section-" + index) === "true";
      if (isActive) {
        button.classList.add("active");
        const content = button.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
      }

      // Attach toggle behavior
      button.addEventListener("click", () => {
        button.classList.toggle("active");

        const content = button.nextElementSibling;
        if (button.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
          localStorage.setItem("sidebar-section-" + index, "true");
        } else {
          content.style.maxHeight = null;
          localStorage.setItem("sidebar-section-" + index, "false");
        }
      });
    });

    // Disable current page link
    const currentPage = window.location.pathname.split("/").pop(); // e.g. "index.html"
    document.querySelectorAll(".sidebar a").forEach(link => {
      const targetPage = link.getAttribute("href");
      if (targetPage === currentPage) {
        link.classList.add("disabled-link");
        link.removeAttribute("href"); // makes it unclickable
      }
    });
  })
  .catch(err => console.error("Sidebar failed to load:", err));
