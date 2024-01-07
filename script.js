async function sendFAI() {
    // get values from input fields

    let gpn = document.getElementById("gpn").value;
    // Item
    let ilen = document.getElementById("item_length").value;
    let iwid = document.getElementById("item_width").value;
    let ihei = document.getElementById("item_height").value;
    let iwei = document.getElementById("item_weight").value;

    // Box
    let blen = document.getElementById("box_length").value;
    let bwid = document.getElementById("box_width").value;
    let bhei = document.getElementById("box_height").value;
    let bwei = document.getElementById("box_weight").value;

    // calculate ghost pallet


    let pLength = 121;
    let pWidth = 101;
    let pHeight = 111;

    let layers = Math.floor(pHeight/bhei)

    let perLayer1 = Math.floor(pLength/blen) * Math.floor(pWidth/bwid)
    let perLayer2 = Math.floor(pLength/bwid) * Math.floor(pWidth/blen)

    let maxBoxes = layers * Math.max(perLayer1,perLayer2)


    //TODO : format payload correctly

    var payload = {
        gpn: gpn,
        item: {
            length : ilen,
            width : iwid,
            height: ihei,
            weight: iwei
        },
        box: {
            length : blen,
            width : bwid,
            height: bhei,
            weight: bwei
        },
        pallet: {
            length:pLength,
            width:pWidth,
            height:pHeight,
            maxQuantity: maxBoxes
        }
        
    };

    console.log(JSON.stringify(payload))

    
    // var data = new FormData();
    // data.append( "json", JSON.stringify( payload ) );
    
    // //TODO : add correct headers / attributes 

    // fetch("/echo/json/",
    // {
    //     method: "POST",
    //     body: data
    // })
    // .then(function(res){ return res.json(); })
    // .then(function(data){ alert( JSON.stringify( data ) ) })
}

document.getElementById("submit_button").addEventListener("click", sendFAI);
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        console.log('details',details)
        //TODO : search details.requestHeaders for access token
        let accessToken = ""
        if(details.requestHeaders){
            for(let i = 0; i<details.requestHeaders.length; i++ ){
                let reqHeader = details.requestHeaders[i]
                console.log('reqHeader',reqHeader)
                if(reqHeader.name == "Cookie"){
                    accessToken = reqHeader.value
                }
            }
        }

        if(accessToken){
            console.log("Access Token:")
            console.log(accessToken)
        }
      return details;
    },
    {urls: ["<all_urls>"]},
    ["requestHeaders", "extraHeaders"]
  )