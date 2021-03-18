 import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  public backendURL = "";
  public directionsURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?";
  public api_key = "AIzaSyD6_3OqaGltffOaYOfROZSVEJTFznfRdFU";
  public geocoding="https://maps.googleapis.com/maps/api/geocode/json?";
  constructor(private http:HttpClient) { }

  getDirections(to,from){
    return  this.http.get(this.directionsURL+'origin='+from+'&'+'destination='+to+'&'+'key='+this.api_key)
  }

  postAccidents(photo,location,latlng){
    return this.http.post(this.backendURL+'report-accident',{photo,location,latlng});
  }

  getAccidents(){
    return this.http.get(this.backendURL+'getAccidents');
  }
   
  getaddress(){
      return this.http.get(this.geocoding+'lat =')
  }


}
