(function () {
  'use strict';

  var ports = [
    { id: 'mumbai', name: 'Mumbai, India', country: 'India', lat: 18.9388, lon: 72.8354 },
    { id: 'mundra', name: 'Mundra, India', country: 'India', lat: 22.736, lon: 69.703 },
    { id: 'chennai', name: 'Chennai, India', country: 'India', lat: 13.0827, lon: 80.2707 },
    { id: 'visakhapatnam', name: 'Visakhapatnam, India', country: 'India', lat: 17.6868, lon: 83.2185 },
    { id: 'haldia', name: 'Haldia, India', country: 'India', lat: 22.0253, lon: 88.0583 },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.2644, lon: 103.8405 },
    { id: 'durban', name: 'Durban, South Africa', country: 'South Africa', lat: -29.8587, lon: 31.0218 },
    { id: 'rotterdam', name: 'Rotterdam, Netherlands', country: 'Netherlands', lat: 51.9244, lon: 4.4777 }
  ];

  var cargoProfiles = {
    'Iron ore': 27,
    'Coal': 31,
    'Bauxite': 29,
    'Limestone': 24,
    'Manganese ore': 34
  };

  function getPort(id) {
    return ports.find(function (port) { return port.id === id; });
  }

  function haversineNm(a, b) {
    var radius = 3440.065;
    var dLat = (b.lat - a.lat) * Math.PI / 180;
    var dLon = (b.lon - a.lon) * Math.PI / 180;
    var lat1 = a.lat * Math.PI / 180;
    var lat2 = b.lat * Math.PI / 180;
    var sinLat = Math.sin(dLat / 2);
    var sinLon = Math.sin(dLon / 2);
    var value = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
    return radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  function dateFrom(value) {
    var date = new Date(value + 'T00:00:00');
    return isNaN(date.getTime()) ? null : date;
  }

  function addDays(date, days) {
    var result = new Date(date.getTime());
    result.setDate(result.getDate() + Math.ceil(days));
    return result;
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function formatMoney(value) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value));
  }

  function predictFare(input) {
    var cargoBase = cargoProfiles[input.cargo] || 28;
    var distanceComponent = Math.min(22, input.distance / 260);
    var vesselAdjustment = input.vesselType === 'Handysize' ? 3 : input.vesselType === 'Panamax' ? -1 : 0;
    var seasonalAdjustment = input.startDate.getMonth() >= 5 && input.startDate.getMonth() <= 8 ? 2.5 : 0;
    var fuelAdjustment = (input.fuelPrice - 650) / 100 * 1.2;
    return Math.max(18, cargoBase + distanceComponent + vesselAdjustment + seasonalAdjustment + fuelAdjustment);
  }

  function buildScenario(input) {
    var origin = getPort(input.origin);
    var destination = getPort(input.destination);
    var distance = haversineNm(origin, destination);
    var speed = Number(input.speed) || 12;
    var fuelPrice = Number(input.fuelPrice) || 650;
    var startDate = dateFrom(input.startDate);
    var fare = predictFare({ cargo: input.cargo, distance: distance, vesselType: input.vesselType, speed: speed, fuelPrice: fuelPrice, startDate: startDate });
    var sailingDays = distance / speed / 24;
    var loadingDays = 1.5;
    var unloadingDays = 1.5;
    var returnDays = sailingDays;
    var arrivalDate = addDays(startDate, sailingDays);
    var returnDepartureDate = addDays(arrivalDate, unloadingDays);
    var returnDate = addDays(returnDepartureDate, returnDays);
    return {
      origin: origin.name,
      destination: destination.name,
      originId: origin.id,
      destinationId: destination.id,
      cargo: input.cargo,
      quantity: Number(input.quantity),
      startDate: input.startDate,
      distance: distance,
      vesselType: input.vesselType,
      speed: speed,
      fuelPrice: fuelPrice,
      fare: fare,
      totalFreight: fare * Number(input.quantity),
      sailingDays: sailingDays,
      loadingDays: loadingDays,
      unloadingDays: unloadingDays,
      arrivalDate: formatDate(arrivalDate),
      returnDepartureDate: formatDate(returnDepartureDate),
      returnDate: formatDate(returnDate),
      roundTripDays: sailingDays * 2 + loadingDays + unloadingDays
    };
  }

  function saveScenario(scenario) {
    sessionStorage.setItem('tideSeakVoyage', JSON.stringify(scenario));
  }

  function loadScenario() {
    try {
      return JSON.parse(sessionStorage.getItem('tideSeakVoyage') || 'null');
    } catch (error) {
      return null;
    }
  }

  window.TideVoyage = {
    ports: ports,
    getPort: getPort,
    haversineNm: haversineNm,
    buildScenario: buildScenario,
    saveScenario: saveScenario,
    loadScenario: loadScenario,
    formatDate: formatDate,
    formatMoney: formatMoney
  };
}());
