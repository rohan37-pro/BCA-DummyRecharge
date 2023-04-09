import { legacy_createStore as createStore } from "redux";


export const storage = createStore(manageStore)



// store = {
//     datafromDB: {},
//     userinfo : {
//         loggedin : false,
//         email: ""
//     }
//      recharge : {
//          phone : 0,
//          isp : "Jio",
//          plan : 0
//      }
//      rechargeDetails : {1 : {
//            'email': 'jio@'
//            'phone' : 1243
//            'isp': 'jio'
//            'plan' : 1234
//             datetime : '234'
//       }}
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
    },
    recharge : {
        phone : 0,
        isp : "Jio",
        plan : 0
    },
    rechargeDetails : {}
} , action){

        switch (action.type){
            case "settextfromDB":
                return { ...storage, datafromDB : action.payload}
            
            case "setemail":
                console.log("setemail activated")
                return { ...storage, userinfo : { ...storage["userinfo"], loggedin: true ,email: action.payload}}

            case "setdefault":
                return { 
                    datafromDB: {"account-create": NaN, "reason": ""},
                    userinfo : {
                        loggedin : false,
                        email: ""
                    },
                    recharge : {
                        phone : 0,
                        isp : "Jio",
                        plan : 0
                    }
                }
            case "addrecharge" :
                console.log("case recharge activated")
                console.log("returning", { ...storage, recharge : { phone : action.payload.phone, isp: action.payload.isp, plan: action.payload.plan}})
                return { ...storage, recharge : { phone : action.payload.phone, isp: action.payload.isp, plan: action.payload.plan}}
            case "addRechargeDetails":
                return { ...storage, rechargeDetails : action.payload }

            default :
                return storage;
        }
    
}