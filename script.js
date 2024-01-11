let eyeColor = 0
let hairColor = 0
let skinColor = 0
let frecklesQuantity = 0
let skinSunReaction = 0
let skinTanned = 0
let skinTannedIntensity = 0
let skinSensitivity = 0

function next(currentId, nextId)
{
	let currentElement = document.getElementById(currentId);
	let nextElement = document.getElementById(nextId);
    
    currentElement.setAttribute("hidden", "hidden");
    nextElement.removeAttribute("hidden");

    backToTop();
}

function selectContainer(id, containerClass, buttonId)
{
	let elements = document.getElementsByClassName(containerClass);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "white";
        elements[i].style.fontWeight = "normal";
    }
	document.getElementById(id).style.backgroundColor = "#ddddcc";
	document.getElementById(id).style.fontWeight = "bold";

	document.getElementById(buttonId).disabled = false;
}

function setEyeColor(value, id)
{
	eyeColor = value;
	selectContainer(id,"imageContainer","eyeColorButton");
	//alert("Cor de olho selecionada: " + value);
}

function setHairColor(value, id)
{
	hairColor = value;
	selectContainer(id,"imageContainer","hairColorButton");
	//alert("Cor de cabelo selecionada: " + value);
}

function setSkinColor(value, id)
{
	skinColor = value;
	selectContainer(id,"imageContainer","skinColorButton");
	//alert("Cor de pele selecionada: " + value);
}

function setFrecklesQuantity(value, id)
{
	frecklesQuantity = value;
	selectContainer(id,"textContainer","frecklesButton");
	//alert("Quantidade de sardas selecionada: " + value);
}

function setSkinSunReaction(value, id)
{
	skinSunReaction = value;
	selectContainer(id,"textContainer","skinSunReactionButton");
	//alert("Reação da pele ao sol selecionada: " + value);
}

function setSkinTanned(value, id)
{
	skinTanned = value;
	selectContainer(id,"textContainer","skinTannedButton");
	//alert("Bronzeamento de pele selecionado: " + value);
}

function setSkinTannedIntensity(value, id)
{
	skinTannedIntensity = value;
	selectContainer(id,"textContainer","skinTannedIntensityButton");
	//alert("Intensidade de bronzeamento selecionada: " + value);
}

function setSkinSensitivity(value, id)
{
	skinSensitivity = value;
	selectContainer(id,"textContainer","skinSensitivityButton");
	//alert("Sensibilidade selecionada: " + value);
}

function calculateSkinType() {
	let score = eyeColor + hairColor + skinColor + frecklesQuantity + 
				skinSunReaction + skinTanned + skinTannedIntensity + skinSensitivity;
	let skinType = score == 0? 1 : Math.ceil(score/6);

	switch(skinType)
	{
		case 1:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO I";
			document.getElementById("skinTypeRecommendations").innerText = "Sua pele é extremamente sensível ao sol, sempre queima, mas nunca fica bronzeada.\n\nA proteção de sua pele dura menos de 10 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele."; 
			break;
		case 2:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO II";
			document.getElementById("skinTypeRecommendations").innerText = "Sua pele é muito sensível ao sol, queima facilmente e fica levemente bronzeada.\n\nA proteção de sua pele dura de 10 a 20 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele."; 
			break;
		case 3:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO III"; 
			document.getElementById("skinTypeRecommendations").innerText = "Sua pele é sensível ao sol, queima algumas vezes e bronzea-se uniformemente.\n\nA proteção de sua pele dura entre 20 e 30 minutos. Possui risco mediano de queimadura solar, mas alto risco de câncer de pele."; 
			break;
		case 4:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO IV";
			document.getElementById("skinTypeRecommendations").innerText = "Sua pele é suavente sensível ao sol, queima levemente, mas sempre fica altamente bronzeada.\n\nA proteção de sua pele dura cerca 40 minutos. Possui baixo risco de queimadura solar e de câncer de pele."; 
			break;
		case 5:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO V";
			document.getElementById("skinTypeRecommendations").innerText = "Sua pele é resistente ao sol, raramente queima, mas fica muito bronzeada.\n\nA proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele."; 
			break;
		case 6:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO VI";
			document.getElementById("skinTypeRecommendations").innerText = "Sua pele é muito resistente ao sol, nunca queima e é profundamente pigmentada.\n\nA proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele."; 
			break;
		default:
			document.getElementById("skinTypeText").innerText = "UM ERRO OCORREU"; 
			document.getElementById("skinTypeRecommendations").innerText = "Tente recarregar a página.";
	}
}

function backToTop() {
  	document.body.scrollTop = 0;
  	document.documentElement.scrollTop = 0;
}
