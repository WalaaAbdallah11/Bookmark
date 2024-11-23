var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var tbody = document.getElementById("tbody");

var bookmarkList = [];

if (localStorage.getItem("bookmarkList") !== null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"))
    displayBookmark()
}

function addBookmark() {

    var nameRegex = /^[\w ]{3,}$/;
    var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if (nameRegex.test(siteNameInput.value) && urlRegex.test(siteUrlInput.value)) {

        var bookmark = {
            name: siteNameInput.value,
            website: siteUrlInput.value

        }
        bookmarkList.push(bookmark);
        console.log(bookmark);
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
        displayBookmark();
        clearBookmark();
    } else {
        alert("The name must contain at least 3 characters and The URL must be valid");

    }

}

function displayBookmark() {
    var cartona = "";
    for (var i = 0; i < bookmarkList.length; i++) {
        cartona += `<tr class="text-center">
                            <td>${i}</td>
                            <td>${bookmarkList[i].name}</td>
                            <td><button type="button" onclick="visitBookmark(${i})" class="btn btn-success opacity-75"><i class="fa-solid fa-eye me-2"></i></i>Visit</button></td>
                            <td><button type="button" onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
                        </tr>`
    }
    tbody.innerHTML = cartona;
}

function clearBookmark() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function deleteBookmark(bookIndex) {
    bookmarkList.splice(bookIndex, 1)

    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmark();
}

function visitBookmark(bookIndex) {

    window.open(`${bookmarkList[bookIndex].website}`, "_blank")
}



