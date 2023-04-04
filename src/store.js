import { legacy_createStore as createStore } from "redux";


export const storage = createStore(manageStore)



// store = {
//     datafromDB: {},
//     userinfo : {
//         loggedin : false,
//         email: ""
//     }
// }


// action = {
//     type : 
//     payload :{       
//     }
// }



function manageStore(storage = { 
    datafromDB: {"account-create": NaN, "reason": ""},
    userinfo : {
        loggedin : false,
        email: ""
    }
} , action){

        switch (action.type){
            case "settextfromDB":
                return { ...storage, datafromDB : action.payload}
            
            case "setemail":
                return { ...storage, userinfo : { ...storage["userinfo"], loggedin: true ,email: action.payload}}

            default :
                return storage;
        }
    
}