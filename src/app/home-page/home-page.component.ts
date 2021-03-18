import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule , NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { } from 'googlemaps';
import { RequestsService } from '../requests.service';
import { ReportAccidentComponent } from '../report-accident/report-accident.component';

// import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  @ViewChild('map', { static: true }) mapElement: any;
  @ViewChild('canva', { static: true }) canvaElement: any;

  public infoWindow = new google.maps.InfoWindow();

  
  public map: google.maps.Map;
  public directionsService = new google.maps.DirectionsService();
  public directionsRenderer = new google.maps.DirectionsRenderer();
  public to;
  public from;
  public request;
  public accidents;
  public line;
  constructor(private requestsService:RequestsService, private modalService: NgbModal) { 
    this.accidents=[];
  }

  ngOnInit(): void {
    this.requestsService.getAccidents().subscribe((accident)=>{
      this.accidents=accident;
      console.log(this.accidents);
      for(let acc of this.accidents){
        this.addMarker(this.map,acc.latlng);
      }
    })

    const mapProperties = {
      center: new google.maps.LatLng(20.0123533,64.4487244),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // const myLatLng = { lat: 20.0123533, lng: 64.4487244 };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.directionsRenderer.setMap(this.map);


  }

  getDirections(){
    this.getRoutes(this.directionsService,this.directionsRenderer,this.map);
  }


  getRoutes(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    map:google.maps.Map
    ){
      this.request = {
        origin: this.from,
        destination: this.to,
        travelMode: 'DRIVING',
        provideRouteAlternatives:true

      };
      directionsService.route(this.request, function(result, status) {
        if (status == 'OK') {
          console.log(result);
          var colors=["#7B1FA2","#E2C044","#F5853F","#FFCDBC"];
          for(var i in result.routes){
    
            new google.maps.Polyline({
              map: map,
              strokeColor:colors[i],
              path:result.routes[i].overview_path
            })
              
          }
          directionsRenderer.setDirections(result);
        } else {
          console.log('Directions request failed due to ' + status)
        }
      });
    }

   reportAccident(){
    this.modalService.open(ReportAccidentComponent);
   } 

   addMarker(map:google.maps.Map,latlng:google.maps.LatLngLiteral){
    new google.maps.Marker({
      position: latlng,
      map:map,
      title: "Hello World!",
    }); 
   }

}