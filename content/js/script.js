/* Author: 

*/
$(document).ready(function(){
  // $('.writing_services>dl').tabs();
  // $('.additional_services>dl').tabs();
  
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
});
