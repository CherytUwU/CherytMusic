(function IIFE() {
	const list = [
	  {
		id: 1,
		url:
		  "https://cdn.discordapp.com/attachments/869856855151738880/869856906456469534/kaden-quitame-la-ropa-official-lyric-video.mp3",
		author: "Kaden",
		title: "Quitame la ropa",
		cover:
		  "https://i.ytimg.com/vi/2LCxncBwE_s/maxresdefault.jpg"
	  },
	  {
		id: 2,
		url:
		  "https://cdn.discordapp.com/attachments/869856855151738880/872015283479511040/kaden-nada-ya-esta-bien.mp3",
		author: "Kaden",
		title: "Nada ya esta bien",
		cover:
		  "https://i.ytimg.com/vi/gQ4nN-F2h74/maxresdefault.jpg"
	  },
	  {
		id: 3,
		url:
		  "https://cdn.discordapp.com/attachments/869856855151738880/872024643425431572/kaden-me-gusta.mp3",
		author: "Kaden",
		title: "Me gusta",
		cover:
		  "https://i.ytimg.com/vi/TtfjHcGhN4M/maxresdefault.jpg"
	  }
	];
  
	let currentId = 0;
	let isPlaying = false;
	let isLoop = true;
	let isShuffle = false;
	let currentAudio = "music1";
	let timer = null;
	let loopOne = false;
  
	const currentTimeIndicator = document.querySelector(".music-time__current");
	const leftTimeIndicator = document.querySelector(".music-time__last");
	const progressBar = document.getElementById("length");
	const playBtn = document.querySelector("#play");
	const cover = document.querySelector(".cover");
	const title = document.querySelector(".music-player__title");
	const author = document.querySelector(".music-player__author");

		const songId1 = document.getElementById("1")
			
		const songId2 = document.getElementById("2")
			
		const songId3 = document.getElementById("3")
			
  
	const loopBtn = document.getElementById("loop");
	const shuffleBtn = document.getElementById("shuffle");
	const forwardBtn = document.getElementById("forward");
	const backwardBtn = document.getElementById("backward");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");
	const progressDiv = document.getElementById("progress");
  
	function play(e) {
	  if (!isPlaying) {
		// console.log('play');
		e.target.alt = "Pause";
		isPlaying = true;
		document.getElementById(currentAudio).play();
		showTime();
	  } else {
		// console.log('pause');
		e.target.alt = "Play";
		document.getElementById(currentAudio).pause();
		isPlaying = false;
		clearInterval(timer);
	  }
	}
  
	function changeBar() {
	  const audio = document.getElementById(currentAudio);
	  const percentage = (audio.currentTime / audio.duration).toFixed(3);
	  progressBar.style.transition = "";
	  // console.log(audio.currentTime);
  
	  //set current time
	  const minute = Math.floor(audio.currentTime / 60);
	  const second = Math.floor(audio.currentTime % 60);
	  const leftTime = audio.duration - audio.currentTime;
	  currentTimeIndicator.innerHTML =
		("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);
  
	  //set left time
	  const leftMinute = Math.floor(leftTime / 60);
	  const leftSecond = Math.floor(leftTime % 60);
  
	  leftTimeIndicator.innerHTML =
		("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
  
	  //set time bar
	  progressBar.style.width = percentage * 100 + "%";
	}
  
	function showTime() {
	  timer = setInterval(() => changeBar(), 500);
	}
  
	function nextMusic(mode) {
	  playBtn.src =
		"https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
	  playBtn.alt = "Play";
	  document.getElementById(currentAudio).pause();
	  isPlaying = false;
	  clearInterval(timer);
  
	  if (mode === "next") {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
		init();
	  } else {
		currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
		init();
	  }
	}
  
	function shuffle(e) {
	  isShuffle = !isShuffle;
	  if (isShuffle) {
		e.target.parentNode.classList.add("is-loop");
	  } else {
		e.target.parentNode.classList.remove("is-loop");
	  }
	}
  
	function backward() {
	  const audio = document.getElementById(currentAudio);
	  audio.currentTime -= 5;
	  if (!isPlaying) {
		changeBar();
	  }
	}
  
	function forward() {
	  const audio = document.getElementById(currentAudio);
	  audio.currentTime += 5;
	  if (!isPlaying) {
		changeBar();
	  }
	}
  
	function stopMusic() {
	  playBtn.src =
		"https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
	  playBtn.alt = "Play";
	  isPlaying = false;
	}
  
	function goToNextMusic() {
	  let newId = currentId;
	  while (isShuffle && !loopOne && newId === currentId) {
		newId = Math.floor(Math.random() * Math.floor(list.length - 1));
	  }
  
	  if (!isShuffle && !loopOne) {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
	  }
	  if (!isShuffle && loopOne) {
		currentId = currentId;
	  }
  
	  if (isShuffle) {
		currentId = newId;
	  }
	  init();
	  document.getElementById(currentAudio).play();
	}
  
	function loop(e) {
	  const audio = document.getElementById(currentAudio);
  
	  if (!isLoop && !loopOne) {
		isLoop = true;
		loopOne = false;
		// console.log('is loop');
		e.target.parentNode.classList.add("is-loop");
		e.target.src =
		  "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
		audio.loop = false;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	  } else if (isLoop && !loopOne) {
		// console.log('is loop one');
		isLoop = true;
		loopOne = true;
		e.target.parentNode.classList.add("is-loop");
		e.target.src =
		  "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loopone.svg";
		audio.loop = true;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	  } else {
		// console.log('not loop');
		isLoop = false;
		loopOne = false;
		e.target.parentNode.classList.remove("is-loop");
		e.target.src =
		  "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
		audio.loop = false;
		audio.onended = e => stopMusic();
		console.log(isLoop, loopOne);
	  }
	}
  
	function progress(e) {
	  const audio = document.getElementById(currentAudio);
	  //get current position and minus progress bar's x position to get current position in progress bar
	  const pos =
		(e.pageX - progressDiv.getClientRects()[0].x) /
		progressDiv.getClientRects()[0].width;
	  audio.currentTime = pos * audio.duration;
	  changeBar();
	}
  
	function init() {
	  //reset music duration and setup audio
	  const audio =
		document.getElementById(currentAudio) === null
		  ? new Audio()
		  : document.getElementById(currentAudio);
	  audio.src = list[currentId].url;
	  audio.id = currentAudio;
	  document.getElementById(currentAudio) === null
		? document.body.appendChild(audio)
		: "";
  
	  progressBar.style.transition = "none";
	  progressBar.style.width = "0%";
	  document.getElementById(currentAudio).currentTime = 0;
  
	  title.innerHTML = list[currentId].title;
	  author.innerHTML = list[currentId].author;
	  cover.src = list[currentId].cover;
  
	  //set current time
	  audio.addEventListener("loadedmetadata", function() {
		const leftMinute = Math.floor(audio.duration / 60);
		const leftSecond = Math.floor(audio.duration % 60);
		currentTimeIndicator.innerHTML = "00:00";
		leftTimeIndicator.innerHTML =
		  ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
		progressBar.style.transition = "";
	  });
  
	  //set loop
	  document.getElementById(currentAudio).onended = e => goToNextMusic(e);
	}

	function selectSong(mode){
		console.log("Funciona Seleccionar")
		playBtn.src =
		"https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
		playBtn.alt = "Play";
		document.getElementById(currentAudio).play();
		isPlaying = false;
		clearInterval(timer);
	
		if (mode === "0") {
			currentId = 0;
			init();
		} else if (mode === "1"){
			currentId = 1;
			init();
		}

		if (mode === "2") {
			currentId = 2;
			init();
		} else if (mode === "3"){
			currentId = 3;
			init();
		}

		if (mode === "4") {
			currentId = 4;
			init();
		} else if (mode === "4"){
			currentId = 4;
			init();
		}

		if (mode === "5") {
			currentId = 5;
			init();
		} else if (mode === "6"){
			currentId = 6;
			init();
		}

		if (mode === "7") {
			currentId = 7;
			init();
		} else if (mode === "8"){
			currentId = 8;
			init();
		}

		if (mode === "9") {
			currentId = 9;
			init();
		} else if (mode === "10"){
			currentId = 10;
			init();
		}

		if (mode === "11") {
			currentId = 11;
			init();
		} else if (mode === "12"){
			currentId = 12;
			init();
		}

		if (mode === "13") {
			currentId = 13;
			init();
		} else if (mode === "14"){
			currentId = 14;
			init();
		}

		if (mode === "15") {
			currentId = 15;
			init();
		} else if (mode === "16"){
			currentId = 16;
			init();
		}

		if (mode === "17") {
			currentId = 17;
			init();
		} else if (mode === "18"){
			currentId = 18;
			init();
		}

		if (mode === "19") {
			currentId = 19;
			init();
		} else if (mode === "20"){
			currentId = 20;
			init();
		}

		currentId = mode;
	}
  
	playBtn.addEventListener("click", play);
	loopBtn.addEventListener("click", loop);
  
	shuffleBtn.addEventListener("click", shuffle);
	forwardBtn.addEventListener("click", forward);
	backwardBtn.addEventListener("click", backward);
  
	prevBtn.addEventListener("click", e => nextMusic("prev"));
	nextBtn.addEventListener("click", e => nextMusic("next"));
	progressDiv.addEventListener("click", e => {
	  progress(e);
	});

	songId1.addEventListener("click", e => selectSong("0"));
	songId2.addEventListener("click", e => selectSong("1"));
	songId3.addEventListener("click", e => selectSong("2"));
  
	init();
  })();