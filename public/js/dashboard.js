/* ========================================================
   RoomRent — Dashboard Client Logic (dashboard.html)
   ======================================================== */
(function () {
  'use strict';

  function bindTabs() {
    var tabListings = document.getElementById('tab-listings');
    var tabBookings = document.getElementById('tab-bookings');
    var tabContracts = document.getElementById('tab-contracts');

    var secListings = document.getElementById('sec-listings');
    var secBookings = document.getElementById('sec-bookings');
    var secContracts = document.getElementById('sec-contracts');

    if (!tabListings || !tabBookings || !tabContracts) return;

    function reset() {
      tabListings.classList.remove('active');
      tabBookings.classList.remove('active');
      tabContracts.classList.remove('active');

      if (secListings) secListings.classList.remove('active');
      if (secBookings) secBookings.classList.remove('active');
      if (secContracts) secContracts.classList.remove('active');
    }

    tabListings.addEventListener('click', function () {
      reset();
      tabListings.classList.add('active');
      if (secListings) secListings.classList.add('active');
    });

    tabBookings.addEventListener('click', function () {
      reset();
      tabBookings.classList.add('active');
      if (secBookings) secBookings.classList.add('active');
    });

    tabContracts.addEventListener('click', function () {
      reset();
      tabContracts.classList.add('active');
      if (secContracts) secContracts.classList.add('active');
    });
  }

  document.addEventListener('DOMContentLoaded', bindTabs);
})();
