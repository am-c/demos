var num_correct = 0;
var drag_num;
$(init);

function init() {
  num_correct = 0;
  $('.drag-wrap').html('');
  $('.dropp').html('');
  $('.am-cube').hide();

  // Drag Array  
  var draggy = [
    ['logos/logo-9.png" class="draggy-0', 0]
  ];
  // Randomize Drag Array
  /*  draggy.sort(function() {
      return Math.random() - 0.5;
    });*/

  // Create Logo drag
  for (var i = 0; i < draggy.length; i++) {

    $('<div class="b4-pickup"> <img src="' + draggy[i][0] + '" draggable="false" ></div>').data('number', draggy[i][1]).appendTo('.drag-wrap').draggable({
      stack: '.drag-wrap div',
      cursor: 'pointer',
      revert: true
    });

  }

  $('.b4-pickup').draggable({
    revert: true
  });

  // Target Array

  var hotSpotz = [
    []
  ];

  $.each(hotSpotz, function(addNumbr) {

    $('<div class="hs' + addNumbr + '"></div>').appendTo('.dropp').droppable({
      accept: '.drag-wrap div',
      hoverClass: 'hovered',
      over: lessOpac,
      out: fullOpac,
      drop: land
    });

  });

  function lessOpac() {
    $('.b4-pickup img').css("opacity", "0.6");
  }

  function fullOpac() {
    $('.b4-pickup img').css("opacity", "1");
  }

  function land(event, ui) {

    var $this = $(this);

    var hotSpotDrop = $this.index();

    drag_num = ui.draggable.data('number');
    // Check if correct 
    if (hotSpotDrop === drag_num) {
      $('.am-cube').show();
      ui.draggable.removeClass("droppedRevert");
      ui.draggable.draggable('option', 'revert', false);
      ui.draggable.addClass("dropped");
      $('.dropped img').remove();
      $('.hs0').fadeOut(50, function() {
        $(this).remove();
      });
      // Run the effect


      $this.append(ui.draggable);
      num_correct++;
    } else {
      ui.draggable.removeClass("dropped");
    }

    $('.resetbtn').click(function() {
      ui.draggable.removeClass("dropped");

    });

    var disImg = $this.children().children();

    disImg.effect('bounce', {
      times: 10
    }, 1500);

  }

}
