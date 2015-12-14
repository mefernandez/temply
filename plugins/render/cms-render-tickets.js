'use strict';

var log = require('debug')('temply:cms-render-tickets');

module.exports = function(data, $element, callback) {
  if (!data) {
    callback();
    return;
  }
  
  var tickets = data.contents;
  log(JSON.stringify(tickets));
  

  tickets.forEach(function(ticket){
  	log(ticket);
  	var date = new Date(ticket.dateCreated);  	
  	$element.append('<tr class="clickable-row" data-href="/ticket/'+ticket.ticket_id+'"><td>'+date.toLocaleString()+'</td><td>'+ticket.status+'</td><td>'+ticket.worklog+'</td><td>'+ticket.customer+'</td><td>'+ticket.ticket_id+'</td><td>'+ticket.title+'</td></tr>');
  });
  
  callback(data);

}