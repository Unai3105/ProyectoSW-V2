const fs=require("fs")
async function buscar(){
    let jsonLaLiga= await fetch("https://v3.football.api-sports.io/teams?league=140&season=2022", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "e8932ad7d12560a51d1046dedccd991a"
	}
}).then(r=>r.json()).then(r=>fs.writeFileSync("LaLiga.json",JSON.stringify(r.response)))
//console.log("buscado liga")
}

async function buscar1(){
    let jsonLigue1= await fetch("https://v3.football.api-sports.io/teams?league=61&season=2022", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "e8932ad7d12560a51d1046dedccd991a"
	}
}).then(r=>r.json()).then(r=>fs.writeFileSync("Ligue1.json",JSON.stringify(r.response)))
//console.log(jsonLigue1)
}

async function buscar2(){
    let jsonBun= await fetch("https://v3.football.api-sports.io/teams?league=78&season=2022", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "e8932ad7d12560a51d1046dedccd991a"
	}
}).then(r=>r.json()).then(r=>fs.writeFileSync("Bundes.json",JSON.stringify(r.response)))
console.log(jsonBun)
}

async function buscar3(){
    let jsonPrem= await fetch("https://v3.football.api-sports.io/teams?league=39&season=2022", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "e8932ad7d12560a51d1046dedccd991a"
	}
}).then(r=>r.json()).then(r=>fs.writeFileSync("Premier.json",JSON.stringify(r.response)))
console.log(jsonPrem)
}

async function buscar4(){
    let jsonSerie= await fetch("https://v3.football.api-sports.io/teams?league=135&season=2022", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "e8932ad7d12560a51d1046dedccd991a"
	}
}).then(r=>r.json()).then(r=>fs.writeFileSync("SerieA.json",JSON.stringify(r.response)))
console.log(jsonSerie)
}

let jsonLaLiga=buscar();
setTimeout(function() {
    console.log('This printed after about 1 second');
  }, 1000);
let jsonLigue1=buscar1();
setTimeout(function() {
    console.log('This printed after about 1 second');
  }, 1000);
  let jsonBun=buscar2();
  setTimeout(function() {
    console.log('This printed after about 1 second');
  }, 1000);
  let jsonPrem=buscar3();
  setTimeout(function() {
    console.log('This printed after about 1 second');
  }, 1000);
  let jsonSerie=buscar4();