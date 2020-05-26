$(document).ready(function () {
  var percentVar;
  $('input[type="radio"]').change(function () {
    if ($(this).attr('id') == 'answer1-2' || $(this).attr('id') == 'answer1-4') {
      $(this).parents('.assessment-page').find('.question-next').attr('href', '#answer1-2_next');
      percentVar = '50%';



    } else if ($(this).attr('id') == 'answer1-1' || $(this).attr('id') == 'answer1-3') {
      $(this).parents('.assessment-page').find('.question-next').attr('href', '#answer1-1_next');

      percentVar = '20%';

    } else if ($(this).attr('id') == 'answer2-1') {
      $(this).parents('.assessment-page').find('.question-next').attr('href', '#answer2-1_next');
      percentVar = '50%';

    } else if ($(this).attr('id') == 'answer2-2' || $(this).attr('id') == 'answer2-3' || $(this).attr('id') == 'answer2-4') {
      $(this).parents('.assessment-page').find('.question-next').attr('href', '#answer2-2_next');

      percentVar = '40%';


    } else if ($(this).attr('id') == 'answer3-1' || $(this).attr('id') == 'answer3-2') {
      $(this).parents('.assessment-page').find('.next-page').show();
      $(this).parents('.assessment-page').find('.question-next').attr('href', '#answer3-1_next');
      $(this).parents('.assessment-page').find('.submit').hide();

      percentVar = '60%';

    } else if ($(this).attr('id') == 'answer3-3') {
      $(this).parents('.assessment-page').find('.next-page').hide();
      $(this).parents('.assessment-page').find('.submit').show();
      percentVar = '75%';
    }



  })

  $('.next-page').click(function (e) {
    e.preventDefault();
    var check_answer = 0;
    var from_btn = $(this);



    $(from_btn.parents('.assessment-page').find('.required input')).each(function () {
      if ($(this).is(':checked')) {
        check_answer = 1;
        return false;
      }
    });

    if (check_answer) {
      $('.assessment-page').removeClass('active');
      $(from_btn.attr('href')).addClass('active');
    } else {
      from_btn.parents('.assessment-page').find('.container').append('<div class="warning">Choose one of the options or enter a value!</div>');

      setTimeout(function () {
        $('.warning').remove();
      }, 1500);
    }

    $('.progress-line span').css({
      'width': percentVar,
    })
    $('.progress-line .percent').text(percentVar);


  })

  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var submitBtn = $(this);

    var required = submitBtn.parents('.assessment-page').find('.required');


    required.each(function () {


      $(this).find('input').each(function () {
        var val = $(this).val();

        if ($(this).is(':checked') && $(this).attr('type') == 'radio' ||
          val.length >= 1 && $(this).attr('type') == 'text' ||
          val.length >= 1 && $(this).attr('type') == 'number') {
          error = 0;
          return false;
        } else {
          error = 1;
          return false;
        }

      })


    })



    if (!error) {
      submitBtn.unbind('submit').submit();
      /*Редирект на определенную страницу спс*/
      setTimeout(function () {
       window.location.href = submitBtn.data('redirect');
      }, 800); 
      
    } else {
      submitBtn.parents('.assessment-page').find('.container').append('<div class="warning">Choose one of the options or enter a value!</div>');

      setTimeout(function () {
        $('.warning').remove();
      }, 1500);
    }

  });




  $('.assessment form').on('submit', function (e) {
    e.preventDefault();

    console.log('submit');
    /*  var $form = $(this);
      $form.find('.order-btn').addClass('inactive');
      $form.find('.order-btn').prop('disabled', true);



      $.ajax({
        type: 'POST',
        url: 'crm/index.php',
        dataType: 'json',
        data: $form.serialize(),
        success: function (response) {}
      });

      setTimeout(function () {
       window.location.href = "success.html";
      }, 800); */

  });
  
  
  
  
  	//open popup
	$('.cd-popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
  
  
  

});
