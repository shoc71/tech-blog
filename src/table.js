import { tagColors } from "../assets/tags/tagColor.js";
import { postData } from "./pages.js";

const displayTableData = document.querySelector("#displayTable tbody");

// Create links dynamically
const posts = Object.fromEntries(
  postData.map(post => [
    post.name.replace(/\s+/g, "_"),
    `<a href="./posts/${post.name.toLowerCase().replace(/\s+/g, "-")}.html" class="link-white-hover">${post.name}</a>`
  ])
);

const tableContents = postData.map((post, index) => ({
  id: index + 1,
  link: posts[post.name.replace(/\s+/g, "_")],
  date: post.date,
  tags: post.tags
}));

function renderTable() {
    displayTableData.innerHTML = tableContents.map(row => `
        <tr>
        <td>${row.id}</td>
        <td style="">${row.link}</td>
        <td>${row.date}</td>
        <td style="max-width: 150px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
            ${row.tags.map(tag => `
                <span class="tag-badge" style="background-color: ${tagColors[tag] || '#555'}">
                    ${tag}
                </span>
            `).join(" ")}
        </td>
        </tr>
    `).join("");
}

window.addEventListener("DOMContentLoaded", () => {
  renderTable();
});