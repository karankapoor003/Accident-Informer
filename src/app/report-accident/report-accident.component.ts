import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Subscriber } from 'rxjs';
import { RequestsService } from '../requests.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-report-accident',
  templateUrl: './report-accident.component.html',
  styleUrls: ['./report-accident.component.css']
})
export class ReportAccidentComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('closebutton') closebutton;
  
  public geocoder = new google.maps.Geocoder();
  videoHeight = 0;
  videoWidth = 0;
  captures: Array<any>;
  public location = "undefined";
  public photo;
  public latlng;
  constraints = {
    audio: false,
    video: {
        width: { ideal: 640 },
        height: { ideal: 360 },
        facingMode: "environment"
    }
};
 

  
  constructor(private requestService: RequestsService, private renderer: Renderer2) {
    this.captures = [];
  }
    

  ngOnInit(): void {
    this.startCamera();
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
      this.latlng={
        "lat":position.coords.latitude,
        "lng":position.coords.longitude
      }
      this.geocodeLatLng(this.geocoder,position.coords.latitude,position.coords.longitude);
    });
  }


  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }
 
  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.photo = this.videoElement.nativeElement;
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  report() {
    this.requestService.postAccidents(this.photo,this.location,this.latlng).subscribe((data)=>{
      console.log(data);
      // this.alertWithSuccess
      Swal.fire({
        title: 'Accident Reported!!',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      // alert('Accident Reported!!')
      // window.location.reload();

    })
  }
  closemodal()
  {
    var modal=document.getElementById("modal");
    modal.style.display="none";
  }

  geocodeLatLng(
    geocoder: google.maps.Geocoder,
    lat: number, long: number
  ) {
    const latlng = {
      lat: lat,
      lng: long,
    };
    geocoder.geocode(
      { location: latlng },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === "OK") {
          if (results[0]) {
            this.location = results[0].formatted_address;
          } else {
            this.location = "No results found";
          }
        } else {
          this.location = "Geocoder failed due to: " + status;
        }
      }
    );
  }
}
