const selectElement = document.getElementById("branch");
const result = document.getElementById("result");
const input = document.getElementById("copy"); // copy image
const branchNameElement = document.getElementById("branch-name");
const insertBranchElement = document.getElementById("insertBranch");
const insertBranchNameElement = document.getElementById("insertBranchName");
const yourMessageElement = document.getElementById("your-message");
const insertCommitElement = document.getElementById("commit");

// hard-coded default values
const delayInMilliSeconds = 2100
const imgEl = "../assets/images/copy.png"
const tempImgEl = "../assets/images/copy-checked.png"
let branchSelect = "features";
let branchName = "branch-name";
let yourMessage = "your-message";

// text-inserts
insertBranchElement.textContent = branchSelect
insertBranchNameElement.textContent = branchName
// insertCommitElement.textContent = yourMessage

// ---------------------
// Event Listeners
// ---------------------
selectElement.addEventListener("change", (event) => {
    branchSelect = event.target.value;
    insertBranchElement.textContent = branchSelect
});

branchNameElement.addEventListener("input", (event) => {
    branchName = event.target.value;
    insertBranchNameElement.textContent = branchName
});

yourMessageElement.addEventListener("input", (event) => {
    yourMessage = event.target.value
    insertCommitElement.textContent = yourMessage
})

// ---------------------
// DOMContentLoader
// ---------------------
// function renderGitCommand() {
//     const branch = localStorage.getItem("branch") || "";
//     const branchName = localStorage.getItem("branchName") || "";
//     const commitMsg = localStorage.getItem("commitMsg") || "";

//     document.querySelectorAll(".insertBranch").forEach(el => {
//         el.textContent = branch;
//     });

//     document.querySelectorAll(".insertBranchName").forEach(el => {
//         el.textContent = branchName;
//     });

//     document.querySelectorAll(".commit").forEach(el => {
//         el.textContent = commitMsg;
//     });
// }

// window.addEventListener("DOMContentLoaded", renderGitCommand);

// ---------------------
// Functions
// ---------------------
function showCopyToast() {
    const toast = document.getElementById("copy-toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, delayInMilliSeconds)
}

function flashImage(imgElement, tempSrc, duration = delayInMilliSeconds) {
    const originalSrc = imgElement.src;
    imgElement.src = tempSrc;

    setTimeout(() => {
        imgElement.src = originalSrc;
    }, duration);
}

function copyTextNewBranch(imgEl) {  
    navigator.clipboard.writeText(`git checkout -b ${branchSelect}/${branchName}`);
    flashImage(imgEl, tempImgEl);
    showCopyToast();
}

function copyTextAddBranch(imgEl) {
    navigator.clipboard.writeText(`git add -A`)
    flashImage(imgEl, tempImgEl);
    showCopyToast();
}

function copyTextCommitBranch(imgEl) {
    navigator.clipboard.writeText(`git commit -m "${yourMessage}"`)
    flashImage(imgEl, tempImgEl);
    showCopyToast();
}

function copyTextPushBranch(imgEl) {
    navigator.clipboard.writeText(`git push -u origin ${branchSelect}/${branchName}`);
    flashImage(imgEl, tempImgEl);
    showCopyToast();
}

function copyTextEverything(imgEl) {
    navigator.clipboard.writeText(`git checkout -b ${branchSelect}/${branchName}; ` +
                                    `git add -A; ` +
                                    `git commit -m "${yourMessage}"; ` +
                                    `git push -u origin ${branchSelect}/${branchName};`)
    flashImage(imgEl, tempImgEl);
    showCopyToast();
}