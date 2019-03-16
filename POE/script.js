










INIT()

async function INIT() {
    itembases = await loadjson("ItemBases.txt");
    SynthesisData = await loadjson("SynthesisData.txt");
}

function GetItemType(base) {
    values = ["Amulets", "Belts", "Body Armours", "Boots", "Bows", "Claws", "Daggers", "FishingRods", "Gloves", "Helmets", "One Hand Axes", "One Hand Maces", "One Hand Swords", "Quivers", "Rings", "Sceptres", "Shields", "Staves", "Thrusting One Hand Swords", "Two Hand Axes", "Two Hand Maces", "Two Hand Swords", "Wands"]
    for (let i = 0; i < values.length; i++) {
        if (itembases[values[i].replace(/ /g, "")].includes(base)) {
            return values[i]
        }
    }
    return "ERROR"
}

function submitItem(x) {

    currentItem = x.textarea.value;
    currentItemtype = GetItemType(currentItem.split("\n")[2])
    console.log("Item type is: " + currentItemtype)

    potentialMods = []

    for (let i = 0; i < SynthesisData.length; i++) {
        if (SynthesisData[i][2].includes(currentItemtype)) {
            potentialMods.push(SynthesisData[i])
        }
    }
    if (potentialMods.length >= 1) {
        let temparr = []
        let targetstage = 0
        while (potentialMods.length > 0) {
            let target = potentialMods[0][0];
            temparr.push([target])
            for (let i = 0; i < potentialMods.length; i++) {
                if (potentialMods[i][0] == target) {
                    temparr[targetstage].push(potentialMods[i])
                    potentialMods.splice(i, 1)
                    i = -1;
                }
            }
            targetstage += 1;

        }

        potentialMods = temparr;

        //FOR MAKING THE LIST OF MODS FROM AN ITEM

        modbox = document.getElementById("modbox");
        modbox.innerHTML = "";
        for (let i = 0; i < potentialMods.length; i++) {
            let modElem = document.createElement("div")
            modElem.innerHTML = potentialMods[i][0];
            modElem.onclick = function () {
                let target = document.getElementById("mod" + i)
                if (target.style.display === "none") {
                    target.style.display = "block";
                    modElem.classList.add("bold")
                } else {
                    target.style.display = "none";
                    modElem.classList.remove("bold")
                }

            }
            modbox.appendChild(modElem);
            let modlist = document.createElement("table")
            modlist.id = "mod" + i;
            modlist.classList.add("values")
            let temprow = document.createElement("tr");
            let tempcol = document.createElement("th");
            tempcol.innerHTML = "Fractured Requirement"
            temprow.appendChild(tempcol);
            tempcol = document.createElement("th");
            tempcol.innerHTML = "Synthesized Mod"
            temprow.appendChild(tempcol);
            modlist.appendChild(temprow);
            for (let j = 1; j < potentialMods[i].length; j++) {
                let temprow = document.createElement("tr");
                let tempcol = document.createElement("td");
                tempcol.innerHTML = potentialMods[i][j][1]
                temprow.appendChild(tempcol);
                tempcol = document.createElement("td");
                tempcol.classList.add("endtable")
                for (let k = 0; k < potentialMods[i][j][3].length; k++) {
                    tempcol.innerHTML += potentialMods[i][j][3][k];
                    if(k + 1 < potentialMods[i][j][3].length){
                        tempcol.innerHTML += " OR "
                    }
                    
                }
                
                temprow.appendChild(tempcol);
                modlist.appendChild(temprow);
            }
            modlist.style.display = "none"
            modbox.appendChild(modlist)


        }



    }


    //Finishing part of submit
    x.textarea.value = "";
    return false;
}


function loadjson(t) {
    promise = new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            resolve(JSON.parse(xhttp.responseText))
        }
        xhttp.open("GET", t, true);
        xhttp.send()
    });
    return promise;
}



function parseOldData() {
    //CODE TO PARSE AND SANITIZE
    data = []
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        arr = JSON.parse(xhttp.responseText)
        for (let i = 0; i < arr.data.length; i++) {
            data.push([])
            data[i][0] = arr.data[i][0].replace(/<span class='mod-value'>/, "").replace(/<\/span>/, "")
            data[i][1] = arr.data[i][1]
            data[i][2] = arr.data[i][2].split("<br>").join(",").split(",")
            for (let j = 0; j < data[i][2].length; j++) {
                data[i][2][j] = data[i][2][j].replace(/<\/?[^>]+(>|$)/g, "")
            }
            data[i][3] = arr.data[i][3].split("</li>")
            data[i][3].pop()
            for (let j = 0; j < data[i][3].length; j++) {
                data[i][3][j] = data[i][3][j].replace(/<\/?[^>]+(>|$)/g, "")
            }
        }
        result = JSON.stringify(data)
    }
    xhttp.open("GET", "olddata.txt", true);
    xhttp.send()

}

