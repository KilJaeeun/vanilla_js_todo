//1. column add start
const create_column = (column_input) => {
    const new_column = document.createElement("div");
    new_column.classList.add("column");

    new_column.innerHTML =
        `  <div class="column-name ">

                <div class="text ">` +
        column_input +
        `</div>
                <span  onclick=" deleteNode(this)">x</span></div>
              <div class="column-contents ">
            </div> <div class="row-add">
                 <form action="" onsubmit="return false" onclick="add_row(this)" class="row_add">
                    <input type="text " name="row-add" id="rowAdd"> <button type="submit">add</button>
                </form>

                </div>`;
    document.querySelector(".container").appendChild(new_column);
    return new_column;
    setLocalDatabase();
};

const column_add = document.querySelector("#column_add");
if (column_add) {
    column_add.addEventListener("submit", () => {
        const column_input = document.querySelector("#column_input").value;
        //  console.log(column_input)
        if (document.querySelector("#column_input").value) {
            create_column(column_input);
            document.querySelector("#column_input").value = "";
        }
    });
}
//1. column add end

const deleteNode = (node) => {
    const to_be_deleted = node.parentNode;
    //       console.log(to_be_deleted.parentNode.classList)
    if (to_be_deleted.classList.contains("column-name")) {
        to_be_deleted.parentNode.parentNode.removeChild(to_be_deleted.parentNode);
    } else {
        to_be_deleted.parentNode.removeChild(to_be_deleted);
    }
    setLocalDatabase();
};
//2. row add start
const add_row = (node) => {
    // console.log(node)
    // console.log(node.childNodes[1].value);
    if (node.childNodes[1].value) {
        const row = document.createElement("div");
        row.classList.add("row");
        //
        row.innerHTML =
            ` <div class="text ">` +
            node.childNodes[1].value +
            `</div> <span  onclick=" deleteNode(this)">x</span></div>`;

        node.parentNode.previousElementSibling.appendChild(row);
        node.childNodes[1].value = "";
    }
    setLocalDatabase();
};
window.onload = () => {
    document.querySelectorAll(".row_add").forEach((node) => {
        node.addEventListener("submit", () => {
            add_row(node);
        });
    });
    document.querySelectorAll("span").forEach((node) => {
        node.addEventListener("click", () => {
            deleteNode(node);
        });
    });
    const loadedToDos = localStorage.getItem("db");
    if (loadedToDos) {
        const parsedToDos = JSON.parse(loadedToDos);

        for (let column_input in parsedToDos) {
            const new_column = create_column(column_input);
            for (row of parsedToDos[column_input]) {
                const new_row = document.createElement("div");
                new_row.classList.add("row");
                new_row.innerHTML =
                    ` <div class="text ">` +
                    row +
                    `</div> <span  onclick=" deleteNode(this)">x</span></div>`;
                new_column.querySelector(".column-contents").appendChild(new_row);
            }
        }
    }
};

//2. row add end
//3.delete example start

//3.delete example end
// 4. localStorage 저장 start
function setLocalDatabase() {
    const columns = document.querySelectorAll(".column");
    const db = {};
    for (column of columns) {
        const column_name = column.querySelector(".column-name .text").innerText;
        const rows = column.querySelectorAll(".row .text");
        db[column_name] = [];
        for (row of rows) {
            // console.log(row.innerText)
            db[column_name].push(row.innerText);
        }
    }
    console.log(db);
    localStorage.setItem("db", JSON.stringify(db));
}
// 4. localStorage 저장 end
// 5. 새로고침시, localStorage 불러오기 start

// 5. 새로고침시, localStorage 불러오기 end