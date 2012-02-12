/* Author: 

*/
var imprintVisible = false;

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

function scrollToSection(section) {
  offset = -140;
  
  if (window.innerWidth <= 768) {
    offset = -230;
  };
  
  
  if (section == 'home') {
    $('#logo').click(function() {
      $.scrollTo( $('.'+ section +':first'), 300, {offset:{top: offset}});
    })
  };
  $('#nav_'+section).click(function() {
    $.scrollTo( $('.'+ section +':first'), 300, {offset:{top: offset}});
  })
};

function createTabs() {
  $('dl').addClass('clearfix')
  $('dd').addClass('hidden')
  
  $.each($('dl'), function(key, element) {
    $(element).find('dd').first().removeClass('hidden');
    $(element).find('dt').first().addClass('active');

    $.each($('dl>dt'), function(key, tab) {
      $(tab).wrapInner('<span/>');
    })

    $(element).find('span').click(function(event) {
      $(event.target).parent().parent().siblings('dt').andSelf().removeClass('active');
      $(this).parent().parent().addClass('active');
      index = $.inArray($(this).parent().parent()[0], $(event.target).parent().parent().siblings('dt').andSelf())
      if (index != -1) {
        tabContents = $($(event.target).parent().parent().siblings('dd'));
        $.each(tabContents, function(tabKey, tabContent) {
            if (tabKey == index) {
             $(tabContent).removeClass('hidden')
            }else{
              $(tabContent).addClass('hidden')
            }
        })
      };
    })
  });
};

$(document).ready(function(){
  replaceHeart()
  createTabs()
  
  $('.wrapper').each(function(i) {
    var position = $(this).position();
    $(this).scrollspy({
      min: position.top,
      max: position.top + $(this).height(),
      onEnter: function(element, position) {
        elementClass = $(element).attr('class').split(" ");
        setActiveMenuItem(elementClass[0].substr(0,elementClass[0].length - "_wrapper".length))
      },
      onLeave: function(element, position) {
      }
    });
  });
  
  sections = ['home', 'writing_services', 'additional_services', 'our_clients', 'about_us', 'contact_us', 'imprint'];
  
  $.each(sections, function(key, section) {
    addWrapperClasses(section)    
    scrollToSection(section)
  })
  
  
  // setup accordion
  // $('.imprint').hide();
  // $('.imprint h2').click(function(){
  //   if (imprintVisible) {
  //     $($('.imprint')[1]).slideUp();
  // 
  //     imprintVisible = false;
  //   }else{
  //     $($('.imprint')[1]).slideDown(300, function() {
  //       $.scrollTo( $('.imprint'), 300,  {offset:{top: -250}});
  //       imprintVisible = true;
  //     });
  // 
  // 
  //   }
  //   return false;
  // });
  
  
  
  
  // width  = document.getElementsByClassName('content')[0].clientWidth + 100;
  // height = document.getElementsByClassName('content')[0].clientHeight + 80;


  width      = $('dl>dt').first().width()
  height     = $('dl>dt').first().height()
  lightBeige = "#fbf6f1";
  darkBeige  = "#f7ebdf";


  $.each($('dl>dt'), function(key, element) {
    $(element).append('<canvas id="canvas'+key+'"></canvas>');
    var canvas=document.getElementById("canvas"+key);
    canvas.setAttribute('width', width+22);
    canvas.setAttribute('height', height+3);

    var context=canvas.getContext('2d');

    context.strokeStyle   = '#D8C5B4';
    if ($($(element).closest('article')).attr('class').search('writing_services') == 0) {
        context.fillStyle     = darkBeige;
    };
    
    if ($($(element).closest('article')).attr('class').search('additional_services') == 0) {
        context.fillStyle     = lightBeige;
    };
    
    context.lineWidth     = 1;
    context.shadowColor   = "#f"
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur    = 10;

    roundedRect(context,1,0,width+13,height+1,4,true,true);
    
  })
  
  

});


/* roundedRect(ctx,x,y,width,height,radius,fill,stroke)
   Arguments:  ctx - the context to be used to draw with.
         x,y - the top left corner
         width - how wide the rectangle
         height - how high the rectangle
         radius - the radius of the corner
         fill   - true if the rectangle should be filled
         stroke - true if the rectangle should be stroked */

var roundedRect=function(ctx,x,y,width,height,radius,fill,stroke)
{
    ctx.save();	// save the context so we don't mess up others
    ctx.beginPath();

    // draw top and top right corner
    ctx.moveTo(x+radius,y+0.5);
    ctx.arcTo(x+width,y+0.5,x+width+0.5,y+radius,radius);
            
    ctx.lineTo(x+width+0.5, y+height/2-4+0.5)
    ctx.lineTo(x+width+4+0.5,y+height/2+0.5)
    ctx.lineTo(x+width+0.5,y+height/2+4+0.5)
    
    // ctx.quadraticCurveTo(x+width, y+height/2, x+width+5, y+height/2);
    // ctx.quadraticCurveTo(x+width, y+height/2, x+width, y+height/2+5);
    // ctx.arcTo(x+width+10, y+height/2, x+width+20, y+height/2, 8)
    // ctx.arcTo(x+width+10, y+height/2, x+width+20, y+height/2, 8)
    // ctx.lineTo(x+width+10, y+height/2)
    // ctx.lineTo(x+width, y+height/2+10)
            
            
    // draw right side and bottom right corner
    ctx.arcTo(x+width+0.5,y+height+0.5,x+width-radius,y+height+0.5,radius); 

    // draw bottom and bottom left corner
    ctx.arcTo(x-0.5,y+height+0.5,x+0.5,y+height-radius+0.5,radius);

    // draw left and top left corner
    ctx.arcTo(x+0.5,y-0.5,x+radius+0.5,y+0.5,radius);

    if(fill){
      ctx.fill();
    }
    if(stroke){
      ctx.stroke();
    }

    // ctx.shadowOffsetX = 10;
    // ctx.shadowOffsetY = 10;
    // ctx.shadowBlur = 10;
    // ctx.shadowColor = "black";
    // 
    ctx.restore();// restore context to what it was on entry
}




