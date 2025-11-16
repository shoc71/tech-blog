// ------------------
// Constant
// ------------------
const displayTable = document.querySelector("#displayTable tbody");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const orderContentButton = document.querySelector("#order");
const searchInput = document.getElementById("searchInput");
const pageInfo = document.getElementById("pageInfo");

let reverseOrderButtonClicked = false;
let currentIndex = 0;
const pageSize = 7;

const postData = [
  { name: "Common Commands", date: "2025-10-15", tags: ["Reference", "INCOMPLETE"] },
  { name: "Smart Characters", date: "2025-10-22", tags: ["Hot Take", "INCOMPLETE"] },
  { name: "Social Status", date: "2025-11-11", tags: ["New", "INCOMPLETE"] },
];

// Create links dynamically
const posts = Object.fromEntries(
  postData.map(post => [
    post.name.replace(/\s+/g, "_"),
    `<a href="./posts/${post.name.toLowerCase().replace(/\s+/g, "-")}.html" class="link-white-hover">${post.name}</a>`
  ])
);

const tagColors = {
  "Analysis": "#1abc9c",
  "Hot Take": "#e74c3c",
  "New": "#3498db",
  "Idea": "#f1c40f",
  "Thought": "#9b59b6",
  "Tech": "#16a085",
  "Past": "#95a5a6",
  "Research": "#2980b9",
  "Books": "#d35400",
  "Mind": "#8e44ad",
  "Society": "#2ecc71",
  "INCOMPLETE": "#7f8c8d"
};

const tableContents = postData.map((post, index) => ({
  id: index + 1,
  link: posts[post.name.replace(/\s+/g, "_")],
  date: post.date,  // use the custom date here
  tags: post.tags
}));


// init render
let filteredData = [...tableContents]

// ------------------
// Render function
// ------------------
function renderTable() {
    const displayData = reverseOrderButtonClicked ? [...filteredData].reverse() : filteredData;
    const pageData = displayData.slice(currentIndex, currentIndex + pageSize);

    displayTable.innerHTML = pageData.map(row => `
        <tr>
        <td>${row.id}</td>
        <td style="">${row.link}</td>
        <td>${row.date}</td>
        <td style="max-width: 150px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" class="text-turncate">
            ${row.related || undefined}
        </td>
        <td style="max-width: 150px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
            ${row.tags.map(tag => `
                <span class="tag-badge" style="background-color: ${tagColors[tag] || '#555'}">
                    ${tag}
                </span>
            `).join(" ")}
        </td>
        </tr>
    `).join("");

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex + pageSize >= filteredData.length;

    // Update page number
  const currentPage = Math.floor(currentIndex / pageSize) + 1;
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// ------------------
// Event Listeners
// ------------------

// mouse clicks
orderContentButton.addEventListener("click", () => {
    reverseOrderButtonClicked = !reverseOrderButtonClicked;
    currentIndex = 0;
    renderTable();
});

// Next / Previous
nextButton.addEventListener("click", () => {
    currentIndex += pageSize;
    renderTable();
});

prevButton.addEventListener("click", () => {
    currentIndex -= pageSize;
    renderTable();
});

// Live search filter
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    filteredData = tableContents.filter(row => {
        const titleText = row.link.replace(/<[^>]+>/g, "").toLowerCase(); // strip <a> tags
        const tagsText = row.tags.join(" ").toLowerCase();
        return titleText.includes(query) || tagsText.includes(query);
    });

    currentIndex = 0; // reset to first page
    renderTable();
});

// Initial render
window.addEventListener("DOMContentLoaded", () => {
  renderTable();
});