
function draw( ob,shir, vys , grad){
	var rad;
	rad = (grad*Math.PI)/180;
	ctx.save();
	ctx.translate(shir,vys);
	ctx.rotate(rad);
	ctx.drawImage(ob.Im,-(ob.shir/2),-(ob.vysot/2),ob.shir,ob.vysot);
	ctx.restore();
}
function pos(){
	raketa.x=raketa.xc-hero.xc+X/2;
	raketa.y=(raketa.yc-hero.yc)*-1+Y/2;

	oblako.x=oblako.xc-hero.xc+X/2;
	oblako.y=(oblako.yc-hero.yc)*-1+Y/2;

	fon.x=(fon.xc-hero.xc-450)/3;
	fon.y=((fon.yc-hero.yc+450)*-1)/3;
}
document.addEventListener("keydown",down);
document.addEventListener("keyup",up);
function down(event){
	//if(event.keyCode==87)W=1;
	if(event.keyCode==65)A=-1;
	//if(event.keyCode==83)S=-1;
	if(event.keyCode==68)D=1;
	if(event.keyCode==16)Shift=true;
	if(event.keyCode==80){
		if(P==false)P=true;
		else P=false;
		main();
	}
}
function up(eventp){
	//if(eventp.keyCode==87)W=0;
	if(eventp.keyCode==65)A=0;
	//if(eventp.keyCode==83)S=0;
	if(eventp.keyCode==68)D=0;
	if(eventp.keyCode==16)Shift=false;
}
function napr(ob){
	var rad;
	ob.rul();

	if(ob.grad>=0&&ob.grad<=90){
		rad=ob.grad*(Math.PI / 180);
		ob.yc+=Math.cos(rad)*ob.skor;
		ob.xc+=Math.sin(rad)*ob.skor;
	}
	if(ob.grad>90&&ob.grad<=180){
		rad=(ob.grad-90)*(Math.PI / 180);
		ob.xc+=Math.cos(rad)*ob.skor;
		ob.yc-=Math.sin(rad)*ob.skor;
	}
	if(ob.grad>180&&ob.grad<=270){
		rad=(ob.grad-180)*(Math.PI / 180);
		ob.yc-=Math.cos(rad)*ob.skor;
		ob.xc-=Math.sin(rad)*ob.skor;
	}
	if(ob.grad>270&&ob.grad<360){
		rad=(ob.grad-270)*(Math.PI / 180);
		ob.xc-=Math.cos(rad)*ob.skor;
		ob.yc+=Math.sin(rad)*ob.skor;
	}


}

/*function CC(){
		var xx =D+A;
		var yy= W+S;
		var cc="пошел на хуй";
		if(yy==1&&xx==1)cc=45;
		else if(yy==1&&xx==-1)cc=315;
		else if(yy==-1&&xx==1)cc=135;
		else if(yy==-1&&xx==-1)cc=225;
		else if(yy==1)cc=0;
		else if(yy==-1)cc=180;
		else if(xx==1)cc=90;
		else if(xx==-1)cc=270;
		return cc;
}*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var W=0,A=0,D=0,S=0,Shift=false;
var P=false;
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var X=canvas.width;
var Y=canvas.height;
var hero = {
	shir:100,
	vysot:150,
	Im: new Image(),
	x:X/2,
	y:Y/2,
	xc:-50,
	yc:200,
	grad:0,
	skor:7,
	lov:2,
	rul: function(){
	if(A+D!=0||W+S!=0){
		//var a=CC();
		
		if(A+D>0)this.grad+=this.lov;
		else if(A+D<0)this.grad-=this.lov;

		if(this.grad>359)this.grad-=360;
		else if(this.grad<-1)this.grad+=360;
		}
	}

};
var raketa = {
	shir:30,
	vysot:70,
	Im: new Image(),
	x:0,
	y:0,
	xc:0,
	yc:0,
	grad:0,
	skor:5,
	lov:0.5,
	rul: function(){
		var xcx=hero.xc-this.xc;
		var ycy=hero.yc-this.yc
		if(xcx>0&&ycy>=0){
		this.grad=Math.atan(xcx/ycy)*180/Math.PI;
		}
		if(xcx>0&&ycy<0){
		this.grad=Math.atan((ycy*-1)/xcx)*180/Math.PI+90;
		}
		if(xcx<0&&ycy<0){
		this.grad=Math.atan((xcx*-1)/(ycy*-1))*180/Math.PI+180;
		}
		if(xcx<0&&ycy>0){
		this.grad=Math.atan(ycy/(xcx*-1))*180/Math.PI+270;
		}
	}

};
var oblako = {
	shir:500,
	vysot:300,
	Im: new Image(),
	x:900,
	y:0,
	xc:0,
	yc:0,
	grad:0
};
var fon = {
	Im: new Image(),
	x:0,
	y:0,
	xc:0,
	yc:0,
	grad:0
};

hero.Im.src ="img/hero.png";
fon.Im.src ="img/fon.png";
oblako.Im.src ="img/oblako.png";
raketa.Im.src ="img/raketa.png";
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function main(){
	napr(hero);
	napr(raketa);
	pos();
	ctx.drawImage(fon.Im,fon.x,fon.y);
	draw(raketa,raketa.x,raketa.y,raketa.grad);
	draw(hero,hero.x,hero.y,hero.grad);
	draw(oblako,oblako.x,oblako.y,oblako.grad);
	if(P==true)requestAnimationFrame(main);
}
fon.Im.onload=main;

