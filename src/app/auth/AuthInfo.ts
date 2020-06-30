// export class AuthInfo {

//     uid: String;
    

//     constructor(
//         public $uid:string
//     ) {
        
        
//     }


//     isLoggedIn() {
//         return !!this.$uid;
//     }

// }

export interface Roles { 
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }
  
export interface AuthInfo {
    claims:any
}