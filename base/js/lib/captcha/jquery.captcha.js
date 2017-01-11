(function($){
	jQuery.fn.captchaWord = function(options){
		var element = this; 
		var button = $(this).find('[type=button]');
		var captcha_wrapper = $(this).find("#captcha_generate");
		captcha_wrapper.html('');
		//if(!$("#captcha_generate").find('.refresh-captcha').length){
			$('<canvas id="canvas" width="500" height="100"><label id="captcha_text"></label></canvas>').appendTo($(captcha_wrapper));
			$('<div class="captcha-box"><input type="text" class="text-box captcha-text" id="captcha_input" placeholder="Enter verification code" /><span class="refresh-captcha"></span></div>').appendTo($(captcha_wrapper));
		//}
		var input = this.find('#captcha_input'); 
		var label = this.find('#captcha_text'); 
		var i = 0;
		var j = 6;
		var randomNumber = 0;
		var randomMessage = '';
		while(i<j)
		{
			randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
			  if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
			  if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
			  if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
			  if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
			randomMessage += String.fromCharCode(randomNumber);
			i++;
		}
		$(element).find('#canvas').html('');
		$(element).find('#canvas').attr('data-val',randomMessage);
		var c = $(element).find('#canvas')[0];
		var ctx = c.getContext("2d");
		ctx.font="40px Tahoma";
		ctx.textBaseline="alphabetic";
		ctx.fillStyle = '#d8d8d8';
		//ctx.clearRect(0,0,c.width,c.height);
		ctx.fillRect(0,0,c.width,c.height);
		ctx.fillStyle = '#000';
		ctx.strokeStyle="#2992d6";
		var m = 50;
		ctx.moveTo(0,0);
		while(m>0){
			var m1 = Math.floor((Math.random() * 500));
			var m2 = Math.floor((Math.random() * 100));
			ctx.lineTo(m1,m2);
			ctx.moveTo(m1,m2);
			m--;
		}
		ctx.stroke();
		ctx.fillText(randomMessage, 190, 65);
	};
})(jQuery);