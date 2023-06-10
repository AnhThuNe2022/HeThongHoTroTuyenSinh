import React, { Component } from 'react';
import L from 'leaflet';

class Map extends Component {
  componentDidMount() {
    // Tạo một bản đồ Leaflet mới với các tùy chọn mặc định
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // Thêm một tile layer (OpenStreetMap) vào bản đồ
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);
  }

  render() {
    return (
      <div id="map" style={{ height: '400px' }}></div>
    );
  }
}

export default Map;