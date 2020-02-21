import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Observable, observable, Subscription } from 'rxjs';
import { Comida } from '../Model/Comida'

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  myCollection:AngularFirestoreCollection;
  
  constructor(private fireStore:AngularFirestore) { 
    this.myCollection=fireStore.collection<any>(environment.coleccion);
  }

   /**
   * 
   */
  reedTodo(): Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

  readTodo(timer: number=10000): Observable<Comida[]>{
    return new Observable((observer)=>{
      let subcripcion:Subscription;
      let tempo=setTimeout(()=>{
        subcripcion.unsubscribe();
        observer.error("TimeOut passsssssed")
      },timer);
      subcripcion=this.reedTodo().subscribe((lista)=>{
        clearTimeout(tempo);
        let listado=[];
        lista.docs.forEach((nota)=>{
          listado.push({id: nota.id, ...nota.data()})
        });
        observer.next(listado);
        observer.complete();
      })
    });
  }

  /**
   * 
   * @param myComida 
   */
  addTodo(myComida:Comida):Promise<firebase.firestore.DocumentReference>{
   return this.myCollection.add(myComida);
  }

  /**
   * 
   * @param id 
   */
  readTodoById(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  /**
   * 
   * @param id 
   * @param data 
   */
  updateTodo(id:string, data:Comida):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  /**
   * 
   * @param id 
   */
  deleteTodo(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }


  searchTodo(title:string): Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(title).get();
  }

}
