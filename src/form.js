const selectElement = document.getElementById("branch");
const result = document.getElementById("result");
const input = document.getElementById("copy"); // copy image
const branchNameElement = document.getElementById("branch-name");
const insertBranchElement = document.getElementById("insertBranch");
const insertBranchNameElement = document.getElementById("insertBranchName");
const yourMessageElement = document.getElementById("your-message");
const insertCommitElement = document.getElementById("commit");
const folderNameElement = document.getElementById("folder-name");
const fileNameElement = document.getElementById("file-name");

// hard-coded default values
const delayInMilliSeconds = 2100
const imgEl = "../assets/images/copy.png"
const tempImgEl = "../assets/images/copy-checked.png"
let branchSelect = "features";
let branchName = "branch-name";
let yourMessage = "your-message";
let fileName = 'file-name';
let folderName = 'folder-name';

// text-inserts
insertBranchElement.textContent = branchSelect
insertBranchNameElement.textContent = branchName
insertCommitElement.textContent = yourMessage
fileNameElement.textContent = fileName
folderNameElement.textContent = folderName

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

fileNameElement.addEventListener("input", (event) => {
    fileName = event.target.value;
})

folderNameElement.addEventListener("input", (event) => {
    folderName = event.target.value;
})

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

function copyTextFindFolderName(imgEl) {
    navigator.clipboard.writeText(`find . -name "${folderName}" -type d`)
    flashImage(imgEl, tempImgEl);
    showCopyToast();
}

function copyTextFindFileName(imgEl) {
    navigator.clipboard.writeText(`find . -name "${fileName}" -type f`)
    flashImage(imgEl, tempImgEl);
    showCopyToast();
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

function copyTextMain(imgEl) {
    navigator.clipboard.writeText(  `git add -A; ` +
                                    `git commit -m "${yourMessage}"; ` +
                                    `git push;`)
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