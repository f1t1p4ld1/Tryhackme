// ===== CONFIG =====
const iframe = document.getElementById("page_frame");

// ===== CHANGE FRAME + ACTIVE LINK =====
function changeFrame(file_path, el = null) {
  iframe.src = file_path;

  // Guardar última página
  localStorage.setItem("last_page", file_path);

  // Quitar active anterior
  document.querySelectorAll('.link').forEach(link => {
    link.classList.remove('active');
  });

  // Marcar actual
  if (el) {
    el.classList.add('active');
  }
}

// ===== EVENT DELEGATION (más eficiente) =====
document.addEventListener("click", function (e) {

  // CLICK EN LINK
  if (e.target.classList.contains("link")) {
    const file = e.target.getAttribute("onclick")
      ?.match(/'([^']+)'/)?.[1];

    if (file) {
      changeFrame(file, e.target);
    }
  }

  // CLICK EN TOGGLE
  if (e.target.classList.contains("toggle")) {
    toggleSubTree(e.target);
  }

});

// ===== TOGGLE SUBTREE =====
function toggleSubTree(button) {
  const li = button.parentElement;
  const subtree = li.querySelector("ul");

  if (!subtree) return;

  subtree.classList.toggle("hide");

  // cambiar símbolo
  button.textContent = subtree.classList.contains("hide") ? "+" : "-";

  // animación suave
  subtree.style.transition = "all 0.2s ease";
}

// ===== EXPAND / COLLAPSE ALL =====
function expandAllSubtrees() {
  document.querySelectorAll(".subtree").forEach(ul => {
    ul.classList.remove("hide");
  });

  document.querySelectorAll(".toggle").forEach(btn => {
    btn.textContent = "-";
  });
}

function collapseAllSubtrees() {
  document.querySelectorAll(".subtree").forEach(ul => {
    ul.classList.add("hide");
  });

  document.querySelectorAll(".toggle").forEach(btn => {
    btn.textContent = "+";
  });
}

// ===== SIDEBAR TOGGLE =====
function toggle_tree_panel() {
  const sidebar = document.querySelector(".sidebar");
  const btn = document.getElementById("tree_panel_toggle_btn");

  if (sidebar.style.display === "none") {
    sidebar.style.display = "flex";
    btn.innerHTML = "⬅";
  } else {
    sidebar.style.display = "none";
    btn.innerHTML = "➡";
  }
}

// ===== INIT =====
window.onload = function () {

  // Crear botón toggle sidebar
  const layout = document.querySelector(".layout");

  const btn = document.createElement("button");
  btn.id = "tree_panel_toggle_btn";
  btn.innerHTML = "⬅";
  btn.onclick = toggle_tree_panel;

  layout.appendChild(btn);

  // Restaurar última página
  const lastPage = localStorage.getItem("last_page");
  if (lastPage) {
    iframe.src = lastPage;
  }

  // KEYBINDS
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggle_tree_panel();
    }
  });

};