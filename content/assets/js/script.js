/* Author: 

*/
$(document).ready(function(){
  // $('.writing_services>dl').tabs();
  // $('.additional_services>dl').tabs();
  function createTabs() {
    $('dl').addClass('clearfix')
    $('dd').addClass('hidden')
  
    $.each($('dl'), function(key, element) {
      $(element).find('dd').first().removeClass('hidden');
      $(element).find('dt').click(function(event) {
        index = $.inArray($(event.target)[0], $(event.target).siblings('dt').andSelf())
          tabContents = $($(event.target).siblings('dd'));
          $.each(tabContents, function(tabKey, tabContent) {
              if (tabKey == index) {
               $(tabContent).removeClass('hidden')
              }else{
                $(tabContent).addClass('hidden')
              }
          })
      })
    });
  };
    
  function replaceHeart() {
    $('*:contains("❤"):last').html($('*:contains("❤"):last').text().replace("❤", "<span id='heart'>❤</span>"))
  };
  
  function addWrapperClasses(section) {
    $("."+section+"_wrapper:last").addClass('last')
    $("."+section+"_wrapper:first").addClass('first')
  };
  
  function setActiveMenuItem(id) {
    $('#nav>li').removeClass('active');
    $('#nav>li#nav_'+id).addClass('active');
  };
  
	$('.wrapper').each(function(i) {
		var position = $(this).position();
    // console.log(position);
    // console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
		$(this).scrollspy({
			min: position.top,
			max: position.top + $(this).height(),
			onEnter: function(element, position) {

        elementClass = $(element).attr('class').split(" ");
        setActiveMenuItem(elementClass[0].substr(0,elementClass[0].length - "_wrapper".length))
        // if(console) console.log('entering ' +  element.id);
        // $("body").css('background-color', element.id);
			},
			onLeave: function(element, position) {
        // if(console) console.log('leaving ' +  element.id);
			//	$('body').css('background-color','#eee');
			}
		});
	});
  
  
  addWrapperClasses("home")
  addWrapperClasses("writing_services")
  addWrapperClasses("additional_services")
  addWrapperClasses("our_clients")
  addWrapperClasses("about_us")
  addWrapperClasses("contact_us")

  replaceHeart()
  createTabs()
});


