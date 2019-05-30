let minNumber = 0,
    maxNumber = 9,
    lightUpColor = 'yellow',
    defaultCellBgColor = '',
    tableNumbers;


tableNumbers = document.getElementById('table-numbers');


// задаю функцию для обработки onclick для каждого <td>
function setOnclickEveryTd() {
    let cells = tableNumbers.getElementsByTagName("td");
    for (let e = 0; e < cells.length; e++) {
        let cellForLightUp = cells[e];
        cells[e].onclick = function () {
            setDefaultCellBgColor();
            lightUpSimilarCells(cellForLightUp);
        };
    }
}
// функция устанавливает background-color у всех <td> по умолчанию
function setDefaultCellBgColor() {
    let cells = tableNumbers.getElementsByTagName("td");
    for (let e = 0; e < cells.length; e++) {

        cells[e].bgColor = defaultCellBgColor;

    }
}

// главная функция с рекурсией, которая подсвечивает одинаковые ячейки
function lightUpSimilarCells(cell) {
    let chekedRowIndex = cell.parentElement.rowIndex,
        checkedCellindex = cell.cellIndex,
        value = +(cell.textContent),
        checkedCellValue,
        currentCell;

    for (let j = chekedRowIndex - 1; j < chekedRowIndex + 2; j++) {

        for (let i = checkedCellindex - 1; i < checkedCellindex + 2; i++) {

            if (i >= 0 && j >= 0) {
                currentCell = tableNumbers.rows[j].cells[i];

                if (currentCell !== undefined) {
                    
                    if (i == checkedCellindex && j == chekedRowIndex) {
                        currentCell.bgColor = lightUpColor;
                    } else if (currentCell.bgColor !== lightUpColor) {
                        checkedCellValue = +(currentCell.textContent);

                        if (+(currentCell.textContent) == +(cell.textContent)) {
                            currentCell.bgColor = lightUpColor;
                            lightUpSimilarCells(currentCell);
                        }
                    }
                }

            }
        }
    }
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function rendomCellNumber() {
    let rowIndex = 2,
        cellIndex = 2,
        currentCell;

    for (let i = 0; i < tableNumbers.rows.length; i++) {
        for (let j = 0; j < tableNumbers.rows[i].cells.length; j++) {
            currentCell = tableNumbers.rows[i].cells[j];
            currentCell.textContent = randomInteger(minNumber, maxNumber);
        }
    }
}

function resetCells() {

    rendomCellNumber();
    setOnclickEveryTd();
    setDefaultCellBgColor();
}