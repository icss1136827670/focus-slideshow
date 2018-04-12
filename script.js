$(function() {
	
	var imageWidth = 600;//图片固定宽度
	
	var currIndex = 0;//当前显示图片的索引
		
	//左箭头单击切换
	$('#prev').click(function() {
		
		//判断动画是否进行中
		if ( $('#list:animated').length != 0 )
			return;
		
		animate(imageWidth);
		
		//索引递减
		currIndex --;
		
		if (currIndex < 0)
			currIndex = 4;
		
		highlight();//高亮
	});
	
	//右箭头单击切换
	$('#next').click(function() {
		
		//判断动画是否进行中
		if ( $('#list:animated').length != 0 )
			return;
		
		animate(-imageWidth);	
		
		//索引递增
		currIndex ++;
		
		if (currIndex > 4)
			currIndex = 0;
			
		highlight();//高亮
	});
	
	//切换按钮单击切换
	$('#buttons span').click(function() {
		
		//判断动画是否进行中
		if ( $('#list:animated').length != 0 )
			return;
		
		//获得当前索引
		var index = $(this).index();
		
		//计算偏移量
		var offset = imageWidth * (currIndex - index);
		
		//调用运动函数
		animate(offset);		
		
		//记录当前下标
		currIndex = index;
		
		highlight();//高亮
	});	
	
	/*
	 * 运动函数
	 * offset表示位置的大小
	 */
	function animate(offset) {
		
		//获得当前位置加上偏移大小的新位置
		var newLeft = parseInt($('#list').css('left')) + offset;
		
		//动画过渡位置
		$('#list').animate({left:newLeft},1000,function() {
								
			//如果已经到达最后一张替身图
			if ( newLeft <= -3600 ) {
				$('#list').css('left',-600);
			}
			
			//如果已经到达第一张替身图
			if (newLeft >= 0) {
				$('#list').css('left',-3000);
			}
			
		});
		
	}
	
	/**
	 * 高亮函数
	 */
	function highlight() {		
		//去掉所有高亮
		$('#buttons span').removeClass('on');		
		//当前按钮高亮
		$('#buttons span').eq(currIndex).addClass('on');		
	}
	
	/*
	 * 定时器自动轮播
	 */
	var timerId = window.setInterval(function() {
		
		$('#next').click();
		
	},2000);
	
	//鼠标移上，自动轮播停止
	$('#container').mouseenter(function() {
		
		window.clearInterval(timerId);
		
	});
	
	//鼠标离开，自动轮播继续
	$('#container').mouseleave(function() {
		
		timerId = window.setInterval(function() {
		
			$('#next').click();
		
		},2000);
		
	});
	
});