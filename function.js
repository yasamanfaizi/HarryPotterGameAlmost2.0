function getCount(){
    database.ref("playerCount").on("value",(data)=>{
        playerCount = data.val()
    })
}
function updateCount(count){
    database.ref("/").update({
        playerCount: count
    })
}

function getState(){
    database.ref("state").on("value",(data)=>{
        state = data.val()
    })
}
function updateState(state){
    database.ref("/").update({
        state: state
    })
}