$(document).ready(function() {

  var my_selector_generator = new CssSelectorGenerator;

  // An experiment to edit static template content
  $('#main-title').on('blur', function(ev) {
    var element = ev.target;
    var $target = $(element);
    var id = $target.attr('id');
    var text = $target.text();
    var template = $('meta[name=temply-template-path]').attr('content');
    var change = {
      id: id,
      text: text,
      template: template
    };
    $.post('/api/edit', change, null, 'json');
  })

  // An experiment to edit static template content
  $('#save-changes').on('click', function(ev) {
    var html = $('.cms-render-database-content').last().html();
    $.ajax('/api/plugin/cms-render-database-content', {
      method: 'POST',
      accepts: 'application/json',
      contentType: 'text/plain',
      data: html,
      success: saveChanges
    });
    //$.post('/api/plugin/cms-render-database-content', html, saveChanges, 'text/html');
    function saveChanges(data) {
      $.ajax('/api/plugin/cms-data-in-memory-database', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
      });
      //$.post('/api/plugin/cms-data-in-memory-database', data, null, 'json');
    }
  })

  $(".owl-carousel").owlCarousel(
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
      element: "#tour-main-title",
      placement: "top",
      title: "Edit this title",
      content: "Click on this title to edit"
    },
    {
      element: "#editable-article",
      placement: "left",
      title: "Edit this article",
      content: "Click on the title and description of this article to edit"
    },
    {
      element: "#save-changes",
      placement: "bottom",
      title: "Save changes",
      content: "Click on this button to save changes"
    },
    {
      orphan: true,
      title: "Reload the page",
      content: "Hit refresh on your browser. Changes will persist."
    }
  ]});

  // Initialize the tour
  tour.init();

  // Start the tour
  tour.start();

});
