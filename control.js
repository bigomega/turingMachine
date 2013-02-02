
var currPos=0,
	a=[],
	keyPressFlag=0,
	keyPressTimer=0,
	sId=0;


move=function(dir){
	//$("audio").remove();
	/*$("<audio></audio>").attr({ 
		'src':'audio/typewriter-return-1.mp3', 
		'volume':0.5,
		'autoplay':'autoplay'
	}).appendTo("body");*/
	$("#moveS")[0].play();
	if(dir==0){
		//move marker right ie strip to left
		strip="";
		if(a[currPos-6]==undefined)
			strip="strip";
		else if(a[currPos-6]==1)
			strip="number1";
		else if(a[currPos-6]==0)
			strip="number0";

		if(!document.getElementById('s'+(currPos-6))){
			$("#mover").prepend("<div id='s"+(currPos-6)+"' class='"+strip+"'></div>").css("left","-=40");
		}
		$("#mover").animate({
			left: '+=40'
		},100).queue(function(next){
			$("#s"+(currPos+5)).remove();
			currPos-=1;
			next();
		});
	}
	else{
		//move marker left ie strip to right
		strip="";
		if(a[currPos+6]==undefined)
			strip="strip";
		else if(a[currPos+6]==1)
			strip="number1";
		else if(a[currPos+6]==0)
			strip="number0";

		if(!document.getElementById('s'+(currPos+6))){
			$("#mover").append("<div id='s"+(currPos+6)+"' class='"+strip+"'></div>");
		}
		$("#mover").animate({
			left: '-=40'
		},100).queue(function(next){
			$("#s"+(currPos-5)).remove();
			$("#mover").css("left","+=40")
			currPos+=1;
			next();
		});
	}
}

set=function(val){
	if(val==undefined){
		//null
		//$("audio").remove();
		/*$("<audio></audio>").attr({ 
			'src':'audio/typewriter-paper-1.mp3', 
			'volume':0.5,
			'autoplay':'autoplay'
		}).appendTo("body");*/
		$("#clearS")[0].play();
		
		if (a[currPos]==undefined) {return;};
		if(a[currPos]==1){
			$("#s"+currPos).removeClass().addClass("number1").delay(50).queue(function(nxt){
				$(this).removeClass().addClass("number11").delay(50).queue(function(nxt){
					$(this).removeClass().addClass("number12").delay(50).queue(function(nxt){
						$(this).removeClass().addClass("number13").delay(50).queue(function(nxt){
							$(this).removeClass().addClass("number14").delay(50).queue(function(nxt){
								$(this).removeClass().addClass("strip");
							nxt();
							});
						nxt();
						});
					nxt();
					});
				nxt();
				});
			nxt();
			});
		}
		else{
			$("#s"+currPos).removeClass().addClass("number0").delay(50).queue(function(nxt){
				$(this).removeClass().addClass("number01").delay(50).queue(function(nxt){
					$(this).removeClass().addClass("number02").delay(50).queue(function(nxt){
						$(this).removeClass().addClass("number03").delay(50).queue(function(nxt){
							$(this).removeClass().addClass("number04").delay(50).queue(function(nxt){
								$(this).removeClass().addClass("strip");
							nxt();
							});
						nxt();
						});
					nxt();
					});
				nxt();
				});
			nxt();
			});
		}
		a[currPos]=undefined;
	}
	else if(val==1){
		//set 1
		//$("audio").remove();
		/*$("<audio></audio>").attr({ 
			'src':'audio/typewriter-key-1.mp3', 
			'volume':0.5,
			'autoplay':'autoplay'
		}).appendTo("body");*/
		$("#typeS")[0].play();
		if(a[currPos]==1){
			return;
		}
		a[currPos]=1;
		$("#s"+currPos).removeClass().addClass("number14").delay(50).queue(function(nxt){
			$(this).removeClass().addClass("number13").delay(50).queue(function(nxt){
				$(this).removeClass().addClass("number12").delay(50).queue(function(nxt){
					$(this).removeClass().addClass("number11").delay(50).queue(function(nxt){
						$(this).removeClass().addClass("number1").delay(50).queue(function(nxt){
						nxt();
						});
					nxt();
					});
				nxt();
				});
			nxt();
			});
		nxt();
		});
	}
	else if(val==0){
		//set 0
		//$("audio").remove();
		/*$("<audio></audio>").attr({ 
			'src':'audio/typewriter-key-1.mp3', 
			'volume':0.5,
			'autoplay':'autoplay'
		}).appendTo("body");*/
		$("#typeS")[0].play();
		if(a[currPos]==0){
			return;
		}
		a[currPos]=0;
		$("#s"+currPos).removeClass().addClass("number04").delay(50).queue(function(nxt){
			$(this).removeClass().addClass("number03").delay(50).queue(function(nxt){
				$(this).removeClass().addClass("number02").delay(50).queue(function(nxt){
					$(this).removeClass().addClass("number01").delay(50).queue(function(nxt){
						$(this).removeClass().addClass("number0").delay(50).queue(function(nxt){
						nxt();
						});
					nxt();
					});
				nxt();
				});
			nxt();
			});
		nxt();
		});
	}
}

singleClick=function(event){
	el=$(document.elementFromPoint(event.clientX,event.clientY));
	//alert(el.attr("class"));
	//if the dblckick is blcokced using a timer then class is RIGHT_BUTTON else PRESSING
	if(el.is("div .left_button_pressing"))
		move(0);
	else if(el.is("div .right_button_pressing"))
		move(1);
	else if(el.is("div .zero_button_pressing"))
		set(0);
	else if(el.is("div .one_button_pressing"))
		set(1);
	else if(el.is("div .null_button_pressing"))
		set(undefined);
}

doubleCick=function(event){
	//singleClick(event);
	//doNothing : this's for cancelling dblclick
}

$(document).ready(function(){
	a[0]=0;
	a[-1]=1;
	a[1]=0;

	$("#control").click(function(event){
		/*
		that=this;
		setTimeout(function(){
			dbclick=parseInt($(that).data('double'),10);
			if(dbclick>0)
				$(that).data('double',dbclick-1);
			else
				singleClick.call(that,event);
		},1000);
	}).dblclick(function(){
		$(this).data('double',2);
		doubleCick.call(this,event);
	});
	ERROR RECTIFIED by reducing the animation time*/
		singleClick(event);
	});

	$("#control").mousedown(function(event){
		el=$(document.elementFromPoint(event.clientX,event.clientY));
		if(el.is("div .left_button")){
			el.removeClass().addClass("left_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("left_button_pressed");
				next();
			});
		}
		else if(el.is("div .right_button")){
			el.removeClass().addClass("right_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("right_button_pressed");
				next();
			});
		}
		else if(el.is("div .zero_button")){
			el.removeClass().addClass("zero_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("zero_button_pressed");
				next();
			});
		}
		else if(el.is("div .one_button")){
			el.removeClass().addClass("one_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("one_button_pressed");
				next();
			});
		}
		else if(el.is("div .null_button")){
			el.removeClass().addClass("null_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("null_button_pressed");
				next();
			});
		}
	});
	$(document).mouseup(function(event){
//		alert($("#but1").hasClass("left_button_pressed"));
		$(".left_button_pressed").removeClass().addClass("left_button_pressing").delay(50).queue(function(next){
			$(this).removeClass().addClass("left_button");
			next();
		});
		$(".right_button_pressed").removeClass().addClass("right_button_pressing").delay(50).queue(function(next){
			$(this).removeClass().addClass("right_button");
			next();
		});
		$(".zero_button_pressed").removeClass().addClass("zero_button_pressing").delay(50).queue(function(next){
			$(this).removeClass().addClass("zero_button");
			next();
		});
		$(".one_button_pressed").removeClass().addClass("one_button_pressing").delay(50).queue(function(next){
			$(this).removeClass().addClass("one_button");
			next();
		});
		$(".null_button_pressed").removeClass().addClass("null_button_pressing").delay(50).queue(function(next){
			$(this).removeClass().addClass("null_button");
			next();
		});
	});

	$(document).keydown(function(event){
		if(event.keyCode==37){
			//left
			if(keyPressFlag==0){
				move(0);
				keyPressFlag=1;
				setTimeout(function(){keyPressFlag=0;},150);
				$(".left_button").removeClass().addClass("left_button_pressing").delay(50).queue(function(next){
					$(this).removeClass().addClass("left_button_pressed").delay(50).queue(function(next){
						$(this).removeClass().addClass("left_button_pressing").delay(50).queue(function(next){
							$(this).removeClass().addClass("left_button").delay(50);
							next();
						});
						next();
					});
					next();
				});
			}
		}
		else if(event.keyCode==39){
			//right
			if(keyPressFlag==0){
				move(1);
				keyPressFlag=1;
				setTimeout(function(){keyPressFlag=0},150);
				$(".right_button").removeClass().addClass("right_button_pressing").delay(50).queue(function(next){
					$(this).removeClass().addClass("right_button_pressed").delay(50).queue(function(next){
						$(this).removeClass().addClass("right_button_pressing").delay(50).queue(function(next){
							$(this).removeClass().addClass("right_button").delay(50);
							next();
						});
						next();
					});
					next();
				});
			}
		}
		else if(event.keyCode==38){
			//up
			set(1);
			$(".one_button").removeClass().addClass("one_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("one_button_pressed").delay(50).queue(function(next){
					$(this).removeClass().addClass("one_button_pressing").delay(50).queue(function(next){
						$(this).removeClass().addClass("one_button").delay(50);
						next();
					});
					next();
				});
				next();
			});
		}
		else if(event.keyCode==40){
			//down
			set(0);
			$(".zero_button").removeClass().addClass("zero_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("zero_button_pressed").delay(50).queue(function(next){
					$(this).removeClass().addClass("zero_button_pressing").delay(50).queue(function(next){
						$(this).removeClass().addClass("zero_button").delay(50);
						next();
					});
					next();
				});
				next();
			});
		}
		else if(event.keyCode==32){
			//space
			set(undefined);
			$(".null_button").removeClass().addClass("null_button_pressing").delay(50).queue(function(next){
				$(this).removeClass().addClass("null_button_pressed").delay(50).queue(function(next){
					$(this).removeClass().addClass("null_button_pressing").delay(50).queue(function(next){
						$(this).removeClass().addClass("null_button").delay(50);
						next();
					});
					next();
				});
				next();
			});
		}
	});
});