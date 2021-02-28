import { listKey } from "../settings.js";
import { saveToStorage } from "../utils/storage.js";

export default function createList(listItems) {
    const listContainer = document.querySelector("ul");

    listContainer.innerHTML = "";

    console.log(listItems);

    listItems.forEach(function (listItem) {
        let checked = "";

        if (listItem.complete) {
            checked = "checked";
        }

        listContainer.innerHTML += `<li><span class="${checked}">${listItem.item}</span> <input ${checked} type="checkbox" data-id="${listItem.id}" /></li>`;
    });

    const checkboxes = document.querySelectorAll("li input");

    checkboxes.forEach(function (box) {
        box.addEventListener("click", toggleComplete);
    });

    function toggleComplete() {
        const id = event.target.dataset.id;
        const checked = event.target.checked;

        const updatedList = updateList(listItems, id, checked);
        saveToStorage(listKey, updatedList);
        createList(updatedList);
    }
}

function updateList(listItems, id, checked) {
    const thisItemIndex = listItems.findIndex(function (item) {
        if (item.id === parseInt(id)) {
            return true;
        }
    });

    listItems[thisItemIndex].complete = checked;

    console.log(listItems);

    return listItems;
}
