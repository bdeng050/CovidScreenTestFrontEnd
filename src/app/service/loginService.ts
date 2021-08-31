import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../model/User";

@Injectable({ providedIn: 'root' })
export class LoginService{
  private loginURL: string = 'http://127.0.0.1:8081/login'
  private registrationURL: string = 'http://127.0.0.1:8081/add'
  private getAllPersonURL: string= 'http://127.0.0.1:8081/allPerson'
  private deletePersonURL: string= 'http://127.0.0.1:8081/delete'
  private updatePersonURL: string= 'http://127.0.0.1:8081/update'
  private findPersonURL : string= 'http://123.0.0.1:8081/find'
  private updateCovidURL: string='http://123.0.0.1:8081/updateCovid'
  private updateCovid2URL: string='http://123.0.0.1:8081/updateCovid2'
  private openURL: string= 'https://opendata.arcgis.com/datasets/6bfe7832017546e5b30c5cc6a201091b_0/FeatureServer/0/query?where=1%3D1&outFields=Date,Total_Active_Cases_by_Date&outSR=4326&f=json'

  constructor(private http: HttpClient) {}

  public loginCheck(user:User): Observable<any>{
    return this.http.post(this.loginURL,user);
  }
  public registration(user:User): Observable<any>{
    return this.http.post(this.registrationURL,user);
  }
  public getAllPerson():Observable<any>{
    return this.http.get(this.getAllPersonURL);
  }
  public deletePerson(id:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('ID', id); 
    return this.http.delete(this.deletePersonURL,{params});
  }
  public updatePerson(user:User):Observable<any>{
    return this.http.put(this.updatePersonURL,user);
  }
  public findPerson(id:number):Observable<any>{
    // let params = new HttpParams();
    // params = params.append('id', id);
    // let teststr = this.findPersonURL+'/'+id;
    // console.log(id);
    // console.log(teststr);
    //console.log(this.http.get(teststr));
    // return this.http.get(teststr);
    //console.log(this.http.get(this.getAllPersonURL));
    //const headers = new HttpHeaders().append('header', 'value');
    // const params = new HttpParams().append('param', id);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('id', id);
    return this.http.get(this.findPersonURL+'/'+id);
  }
  public updateCovid(user:User):Observable<any>{
    return this.http.put(this.updateCovidURL,user);
  }
  public updateCovid2(id:number):Observable<any>{
    let url= 'http://123.0.0.1:8081/updateCovid2/${id}'
    return this.http.get(url);
  }
  public getCase():Observable<any>{
    return this.http.get(this.openURL);
  }
}
