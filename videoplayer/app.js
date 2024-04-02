// Get UI 
const getvideoscreen = document.getElementById("videoscreen");

const playbtn = document.getElementById("play");
const prevbtn = document.getElementById("prev");
const nextbtn = document.getElementById("next");
const stopbtn = document.getElementById("stop");

//FOR RANGE
// const getprogress = document.getElementById("progress");

//FOR PROGRESSS CONTAINER
const getprogressctn = document.getElementById('progress-container');
const getprogress = document.getElementById('progress');

const getdisplaytime = document.getElementById('displaytime');
// const getfullscreenbtn = document.getElementById("fullscreen");
const getcontainer = document.querySelector('.container');


const getopnfullscreen = document.querySelector('.openfullscreen');
const getclsfullscreen = document.querySelector('.closefullscreen');

const gettitle = document.getElementById('title');


const videos = ["samplevideo1","samplevideo2"];
let curridx = 0;

loadvideo(videos[curridx]);

function loadvideo(vdo){
    getvideoscreen.src=`./source/${vdo}.mp4`; 
    gettitle.textContent = vdo
}

function playvdo(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    // pause() method came form video api 
    getvideoscreen.play();
}

function pausevdo(){
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');

    // pause() method came form video api 
    getvideoscreen.pause();
}

function playpausevdo(){
    // paused keyword come form video api 
    if(getvideoscreen.paused){
        // getvideoscreen.play();
        playvdo();
    }else{
        // getvideoscreen.pause();
        pausevdo();
    }
}

function nextvdo(){
    curridx++;

    if(curridx > videos.length-1){
        curridx = 0;
    }

    // console.log(curridx);

    loadvideo(videos[curridx]);
    playvdo();
}

function previousvdo(){
    curridx -= 1;

    if(curridx < 0){
        curridx = videos.length-1;
    }

    console.log(curridx);

    loadvideo(videos[curridx]);
    playvdo();
}

function stopvdo(){
    getvideoscreen.currentTime = 0;
    getprogress.width = getvideoscreen.currentTime; //or 0
    pausevdo();
}


function updateprogress(){
//Note:: currentTime come from video api 
    // console.log(getvideoscreen.currentTime);
//Note:: duration come from video api 
    // console.log(getvideoscreen.duration);

    // console.log((getvideoscreen.currentTime / getvideoscreen.duration)* 100);

//FOR RANGE
    // if(getvideoscreen.currentTime === 0){
    //     progress.value = 0;
    // }else{
    //     progress.value = (getvideoscreen.currentTime / getvideoscreen.duration)* 100;
    // }

// FOR PROGRESS CONTAINER
    if(getvideoscreen.currentTime === 0){
        progress.style.width = "0%";
    }else{
        const progresspercent = (getvideoscreen.currentTime / getvideoscreen.duration)* 100;
              progress.style.width = `${progresspercent}%`;
    }

    let getmins = Math.floor(getvideoscreen.currentTime/60);
    // console.log(getmins);
    if(getmins < 10){
        // getmins = "0" + getmins;

        getmins = "0"+String(getmins);
    }

    let getsecs = Math.floor(getvideoscreen.currentTime%60);
    // console.log(getsecs);
    if(getsecs < 10){
        // getsecs = "0" + getsecs;

        getsecs = "0"+getsecs;
    }

    getdisplaytime.innerText = `${getmins}:${getsecs}`;
}

function setprogress(e){
    // console.log('hey');
    // console.log((getprogress.value * getvideoscreen.duration) / 100);

// FOR RANGE
    // getvideoscreen.currentTime = (getprogress.value * getvideoscreen.duration) / 100;

// FOR PROGRESS CONTAINER
    const getelewidth = this.clientWidth;
    // console.log(getelewidth);

    const getclickx = e.offsetX;
    // console.log(getclickx);

    const duration = getvideoscreen.duration;

    getvideoscreen.currentTime = (getclickx / getelewidth) * duration;
}

// const getdoce = document.documentElement;

function openfullscreen(){

    if(getcontainer.requestFullscreen){
        getcontainer.requestFullscreen(); //standed w3school
    }else if(getcontainer.mozRequestFullscreen){
        getcontainer.mozRequestFullscreen(); // firefox
    }else if(getcontainer.webkitRequestFullscreen){
        getcontainer.webkitRequestFullscreen(); //chrome / safari
    }else if(getcontainer.msRequestFullscreen){
        getcontainer.msRequestFullscreen(); //microsoft product , ie , edge
    }

    getopnfullscreen.style.display = "none";
    getclsfullscreen.style.display = "inline-block";
}

function closefullscreen(){

    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.mozCancelFullscreen){
        document.mozCancelFullscreen();
    }else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }

    getopnfullscreen.style.display = "inline-block";
    getclsfullscreen.style.display = "none";
}

playbtn.addEventListener('click',playpausevdo);
nextbtn.addEventListener('click',nextvdo);
prevbtn.addEventListener('click',previousvdo);
stopbtn.addEventListener('click',stopvdo);

// getfullscreenbtn.addEventListener('click',openfullscreen);

getvideoscreen.addEventListener('timeupdate',updateprogress);
getvideoscreen.addEventListener('ended',nextvdo);
getvideoscreen.addEventListener('click',playpausevdo);

//FOR RANGE
// getprogress.addEventListener('click',setprogress);

// FOR PROGRESS CONTAINER 
getprogressctn.addEventListener('click',setprogress);

getopnfullscreen.addEventListener('click',openfullscreen);
getclsfullscreen.addEventListener('click',closefullscreen);



// timeupdate method update each change time 

//Note:: currentTime come from video api 
//Note:: duration come from video api 