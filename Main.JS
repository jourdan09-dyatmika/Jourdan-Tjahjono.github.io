$(function(){


	var w  = $(window).width();
	var h = $(window).height();


	var lineCount = $(".code").height() / 25;
	for(var i = 1; i <= lineCount; i++){
		$(".line-count").append("<span>"+i+"</span>")
	}


	$(window).hover(function(e){
		lineCount = $(".code").height() / 25;
		var pY = e.pageY;
		for(var c = 1; c <= lineCount; c++){
			if(pY > $(".line-count span:nth-child("+c+")").offset().top && pY < $(".line-count span:nth-child("+c+")").offset().top + 25){
					$(".line-count span:nth-child("+c+")").css({
						background:"rgba(255,255,255,.1)"
					})
			}
		}
	},function(){
		$(".line-count span").css({
			background:"#272822"
		})
	});


	$(".code-items .code-item").append('<span class="directional-arrow"></span>')


	$(".code-items .code-item .directional-arrow").click(function(){

		if($(this).parent().hasClass('close')){
			$(this).parent().removeClass('close')
			$(".code-item-content",$(this).parent()).show();

			$(".line-count").html("");
			var lineCount = $(".code").height() / 25;
			for(var i = 1; i <= lineCount; i++){
				$(".line-count").append("<span>"+i+"</span>")
			}
		}else{
			$(this).parent().addClass('close');
			$(".code-item-content",$(this).parent()).hide();

            $(".line-count").html("");
			var lineCount = $(".code").height() / 25;
			for(var i = 1; i <= lineCount; i++){
				$(".line-count").append("<span>"+i+"</span>")
			}
		}

	})
	

});
