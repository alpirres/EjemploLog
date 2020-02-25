import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Observable, observable, Subscription } from 'rxjs';
import { Comida } from '../Model/Comida';

@Injectable({
  providedIn: 'root'
})

//este es el servicio que se comunica con firebase
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
   * funcion que añade una nueva comida 
   * @param myComida 
   */
  addTodo(myComida:Comida):Promise<firebase.firestore.DocumentReference>{
   return this.myCollection.add(myComida);
  }

  /**
   * funcion para obtener todos los datos
   * @param id 
   */
  readTodoById(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  /**
   * funcion que actualiza una comida mediante su id
   * @param id 
   * @param data 
   */
  updateTodo(id:string, data:Comida):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  /**funcion que elimina
   * 
   * @param id 
   */
  deleteTodo(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

/**
 * funcion que filtra mediante el parametro de la fecha
 * @param fecha 
 */
  searchTodo(fecha:string): Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(fecha).get();
  }

}
