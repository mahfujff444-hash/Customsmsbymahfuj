const popup = document.getElementById("popup");

const API1 = "https://devbd.my.id/sms.php?key=AM–MRXRPSh2PU";
const API2 = "https://darktube.serv00.net/api?api_key=SMS_6079418217_ec2b63e94e054c563b3eaabdc39246ab";

function sendSMS(){

let provider = document.getElementById("provider").value;
let number = document.getElementById("number").value.trim();
let message = document.getElementById("message").value.trim();

if(number=="" || message==""){
show("সব তথ্য পূরণ করুন","error");
return;
}

popup.className="";
popup.classList.add("success");
popup.style.display="block";
popup.innerHTML="⏳ Sending...";

let url="";

if(provider=="1"){
url=`${API1}&number=${encodeURIComponent(number)}&msg=${encodeURIComponent(message)}`;
}else{
url=`${API2}&number=${encodeURIComponent(number)}&message=${encodeURIComponent(message)}`;
}

fetch(url)
.then(res=>res.text())
.then(data=>{

if(data.toLowerCase().includes("success") || data.toLowerCase().includes("sent")){

show("✅ SMS Sent Successfully","success");

}else{

show("❌ SMS Failed<br>"+data,"error");

}

})
.catch(()=>{

show("❌ Network Error","error");

});

}

function show(text,type){

popup.className="";
popup.classList.add(type);
popup.innerHTML=text;
popup.style.display="block";

setTimeout(()=>{
popup.style.display="none";
},4000);

}

/* Matrix Animation */

const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters=letters.split("");

let fontSize=16;
let columns=canvas.width/fontSize;
let drops=[];

for(let i=0;i<columns;i++) drops[i]=1;

function draw(){

ctx.fillStyle="rgba(0,0,0,.06)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ff66";
ctx.font=fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

let text=letters[Math.floor(Math.random()*letters.length)];

ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>canvas.height && Math.random()>0.975){
drops[i]=0;
}

drops[i]++;

}

}

setInterval(draw,35);

window.onresize=()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

};
