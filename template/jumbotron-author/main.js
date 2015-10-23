$(document).ready(function() {
 
  $("#ala-carousel").owlCarousel(
    {
      items : 1
  }
  );

  $('#help').on('click', function() {
    tour.restart();
  });
 
  // Instance the tour
  var tour = new Tour({
    steps: [
    {
      orphan: true,
      title: "Welcome to Author mode",
      content: "This mode allows you to edit this page's content."
    },
    {
      element: "#main-title",
      placement: "top",
      title: "Edit this title",
      content: "Click on this title to edit"
    },
    {
      element: "#save-changes",
      placement: "bottom",
      title: "Save changes",
      content: "Click on this button to save changes"
    }
  ]});

  // Initialize the tour
  tour.init();

  // Start the tour
  tour.start(true);

});