/**
* 基础统计数据
*@author zhouquan
*/
(function($) {
	var guid_dbfen		= 0,	//用户访问的唯一标识
		url_dbfen		= 0,	//访问url
		refer_dbfen		= "none",	//来源url
		ua_dbfen		= 0,	//浏览器类型、版本
		screen_dbfen	= 0,	//屏幕分辨率
		os_dbfen		= 0,	//操作系统
		user_id_dbfen	= 0,	//用户id
		ci_session_dbfen= 0,	//用户session
		vfcode_dbfen	= 0,	//用户邀请码
		depth_dbfen		= 0;	//访问深度
	
	/**
	 * 获取访问url
	*/
	url_dbfen = window.location.href;
	
	/**
	 * 获取来源url
	*/
	if(document.referrer){
		refer_dbfen = document.referrer;
	};
	
	/**
	 * 获取浏览器类型、版本
	*/
	ua_dbfen = navigator.userAgent;
	
	/**
	 * 获取屏幕分辨率
	*/
	screen_dbfen = screen.width + " * " + screen.height;
	
	/**
	 * 获取操作系统
	*/
	os_dbfen = navigator.userAgent;
	
	/**
	 * 获取访问深度
	*/
	function getCookieVal(offset){
		var endstr=document.cookie.indexOf(";",offset);
		if(endstr==-1)
		endstr=document.cookie.length;
		return unescape(document.cookie.substring(offset,endstr));
	};
	function GetCookie(name){
		var arg=name+"=";
		var alen=arg.length;
		var clen=document.cookie.length;var i=0;
		while(i<clen){
			var j=i+alen;
			if(document.cookie.substring(i,j)==arg)
				return getCookieVal(j);
				i=document.cookie.indexOf(" ",i)+1;if(i==0)
			break;
		}
		return null;
	};
	function SetCookie(name,value){
		var argv=SetCookie.arguments;
		var argc=SetCookie.arguments.length;
		var expires=(2<argc)?argv[2]:null;
		var path=(3<argc)?argv[3]:null;
		var domain=(4<argc)?argv[4]:null;
		var secure=(5<argc)?argv[5]:false;
		document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
	};
	function ResetCounts(name){
		depth_dbfen=0;
		SetCookie("depth_dbfen",depth_dbfen,expdate,"/",null,false);
		location.reload();
	};
	var expdate=new Date();
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));	//设置COOKIES时间为1年,自己随便设置该时间..
	if(!(depth_dbfen=GetCookie("depth_dbfen")))
	depth_dbfen=0;
	depth_dbfen++;
	SetCookie("depth_dbfen",depth_dbfen,expdate,"/",null,false);
	
	/**
	 * 用户访问的唯一标识
	*/
	function S4(){
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	if(document.cookie.indexOf("guid_dbfen=") == -1){
		guid_dbfen = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
		SetCookie("guid_dbfen",guid_dbfen,expdate,"/",null,false);
	};
	
	/**
	 * 获取用户id
	 * 获取用户session
	 * 获取用户邀请码
	*/
	var strCookie = document.cookie,	//获取cookie字符串 
		arrCookie = strCookie.split("; ");	//将多cookie切割为多个名/值对
	for(var i=0; i<arrCookie.length; i++){ 
		var arr=arrCookie[i].split("=");
		if(arr[0]=="user_id_id"){ 
			user_id_dbfen = arr[1]; 
		};
		if(arr[0]=="ci_session"){ 
			ci_session_dbfen = arr[1]; 
		};
		if(arr[0]=="vfcode"){ 
			vfcode_dbfen = arr[1]; 
		};
		if(arr[0]=="guid_dbfen"){ 
			guid_dbfen = arr[1]; 
		};
	};
	//alert("用户访问的唯一标识：" + guid_dbfen + "\n访问url：" + url_dbfen + "\n来源url：" + refer_dbfen + "\n浏览器类型、版本：" + ua_dbfen + "\n屏幕分辨率：" + screen_dbfen + "\n操作系统：" + os_dbfen + "\n用户id：" + user_id_dbfen + "\n用户session：" + ci_session_dbfen + "\n用户邀请码：" + vfcode_dbfen + "\n访问深度：" + depth_dbfen);
	
	$.post('/index.php/monweb/sendbowinfo',
		{
			guid_dbfen		:	guid_dbfen,
			url_dbfen 		: 	url_dbfen,
			refer_dbfen		:	refer_dbfen,
			ua_dbfen		:	ua_dbfen,
			screen_dbfen	:	screen_dbfen,
			os_dbfen		:	os_dbfen,
			user_id_dbfen	:	user_id_dbfen,
			ci_session_dbfen:	ci_session_dbfen,
			vfcode_dbfen 	:	vfcode_dbfen,
			depth_dbfen		:	depth_dbfen
		}	
	);
	define("com/stat", function(require, exports, module){});
})(jQuery);