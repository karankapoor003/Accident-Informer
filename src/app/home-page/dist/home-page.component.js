"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePageComponent = void 0;
var core_1 = require("@angular/core");
// import { ViewChild } from '@angular/core';
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(requestsService) {
        this.requestsService = requestsService;
        // public mapElement = document.getElementById('map');
        this.infoWindow = new google.maps.InfoWindow();
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var mapProperties = {
            center: new google.maps.LatLng(35.2271, -80.8431),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log(pos);
            var position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };
            _this.infoWindow.setPosition(position);
            _this.infoWindow.setContent('Location found.');
            _this.infoWindow.open(_this.map);
            _this.map.setCenter(position);
        });
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    };
    HomePageComponent.prototype.getDirections = function () {
        this.requestsService.getDirections(this.to, this.from).subscribe(function (data) {
            console.log(data);
        });
    };
    __decorate([
        core_1.ViewChild('map', { static: true })
    ], HomePageComponent.prototype, "mapElement");
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'app-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css']
        })
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
