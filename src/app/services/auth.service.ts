import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { RouterModule, RouterLink, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:User;

  constructor(private local:NativeStorage, private google:GooglePlus, private router:Router) { }
  
  public async checkSession():Promise<void>{
    if(!this.user){
      try{
        this.user= await this.local.getItem('user')
      }catch(err){
        this.user=null;
      }
    }
  }

  public isAuthenticated():boolean{
    return this.user?true:false;
  }

  public loginGoogle():Promise<boolean>{
    return new Promise((resolve)=>{
      this.google.login({})
      .then(d=>{
        if(d && d.email){
          let user :User={
            email:d.email,
            displayName:d.displayName,
            imageUrl:d.imageUrl,
            userId:d.userId
          }
          this.user=user;
          this.saveSesion(user);
          resolve(true);
        }else{
          resolve(false);
        }
      })
      .catch(err=>resolve(false));
    });
  }

  registerUser(email:string, password:string){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
      })
   }

   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>{
        reject(err)})
    })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }
  
   userDetails(){
     return firebase.auth().currentUser;
   }
  


  /**
   * 
   * @param user 
   */
  public async saveSesion(user?:User){
    if(user){
      await this.local.setItem('user',user);
    }else{
      await this.local.remove('user');
    }
  }

  public async logOut(){
    await this.google.logout();
    this.user=null;
    this.saveSesion();
    this.router.navigate(['/login'])
  }
}
