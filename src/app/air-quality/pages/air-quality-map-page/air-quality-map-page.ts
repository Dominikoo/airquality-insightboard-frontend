import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';
import { LocationService } from '../../services/location.service';
import { LocationDto } from '../../models/location.model';
import { environment } from '../../../../environments/environment';
import { format, getAqiColor } from '../../utils/aqi-color.util';

@Component({
  selector: 'app-air-quality-map-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './air-quality-map-page.html',
  styleUrls: ['./air-quality-map-page.scss'],
})
export class AirQualityMapPage implements OnInit, OnDestroy {

  map!: mapboxgl.Map;
  locations: LocationDto[] = [];
  hoveredLocationId?: string;

  constructor(private locationsService: LocationService) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [19.1451, 52.2370], // Polska
      zoom: 5
    });

    this.map.on('load', () => this.loadLocations());
  }

  loadLocations() {
    this.locationsService.getAll().subscribe(locations => {
      this.locations = locations;
      this.addMarkers(locations);
    });
  }

  addMarkers(locations: LocationDto[]) {
    locations.forEach(location => {
        if(location.airQuality?.index) {
        const color = getAqiColor(location.airQuality?.index ? location.airQuality.index : 500);

        const el = document.createElement('div');
        el.className = 'city-marker';
        el.style.setProperty('--color', color);

        el.addEventListener('mouseenter', () => this.showTooltip(location));
        el.addEventListener('mouseleave', () => this.hideTooltip());

        new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .addTo(this.map);
      }
    });
  }

  tooltip?: mapboxgl.Popup;

  showTooltip(location: LocationDto) {
    const aq = location.airQuality;
    const color = getAqiColor(aq?.index ? aq.index : 500);

    this.tooltip = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 12,
    })
      .setLngLat([location.longitude, location.latitude])
      .setHTML(`
        <div class="tooltip">

          <strong>${location.name}</strong><br/><br/>

          <div class="aq-row">
            <span class="aq-label">AQI:</span>
            <span class="aq-value aqi-value-right" style="color:${color}">${format(aq.index)}</span>
          </div>

          <div class="aq-row">
            <span class="aq-label">PM10:</span>
            <span class="aq-value">${format(aq?.pm10)}</span>
          </div>

          <div class="aq-row">
            <span class="aq-label">PM2.5:</span>
            <span class="aq-value">${format(aq?.pm25)}</span>
          </div>

          <div class="aq-row">
            <span class="aq-label">NO₂:</span>
            <span class="aq-value">${format(aq?.no2)}</span>
          </div>

          <div class="aq-row">
            <span class="aq-label">SO₂:</span>
            <span class="aq-value">${format(aq?.so2)}</span>
          </div>

          <div class="aq-row">
            <span class="aq-label">O₃:</span>
            <span class="aq-value">${format(aq?.o3)}</span>
          </div>

          <div style="margin-top:8px; font-size:12px; opacity:0.6;">
            Updated: ${aq?.updatedAt ? new Date(aq?.updatedAt).toLocaleString() : '-'}
          </div>

        </div>
      `)
      .addTo(this.map);
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = undefined;
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
