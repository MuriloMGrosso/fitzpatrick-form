let eyeColor = 0;
let hairColor = 0;
let skinColor = 0;
let frecklesQuantity = 0;
let skinSunReaction = 0;
let skinTanned = 0;
let skinTannedIntensity = 0;
let skinSensitivity = 0;
let isBrazilian = '';
let uf = '';
let city = '';

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
	selectContainer(id,"eyeColorContainer","eyeColorButton");
	//alert("Cor de olho selecionada: " + value);
}

function setHairColor(value, id)
{
	hairColor = value;
	selectContainer(id,"hairColorContainer","hairColorButton");
	//alert("Cor de cabelo selecionada: " + value);
}

function setSkinColor(value, id)
{
	skinColor = value;
	selectContainer(id,"skinColorContainer","skinColorButton");
	//alert("Cor de pele selecionada: " + value);
}

function setFrecklesQuantity(value, id)
{
	frecklesQuantity = value;
	selectContainer(id,"frecklesContainer","frecklesButton");
	//alert("Quantidade de sardas selecionada: " + value);
}

function setSkinSunReaction(value, id)
{
	skinSunReaction = value;
	selectContainer(id,"skinSunReactionContainer","skinSunReactionButton");
	//alert("Reação da pele ao sol selecionada: " + value);
}

function setSkinTanned(value, id)
{
	skinTanned = value;
	selectContainer(id,"skinTannedContainer","skinTannedButton");
	//alert("Bronzeamento de pele selecionado: " + value);
}

function setSkinTannedIntensity(value, id)
{
	skinTannedIntensity = value;
	selectContainer(id,"skinTannedIntensityContainer","skinTannedIntensityButton");
	//alert("Intensidade de bronzeamento selecionada: " + value);
}

function setSkinSensitivity(value, id)
{
	skinSensitivity = value;
	selectContainer(id,"skinSensitivityContainer","skinSensitivityButton");
	//alert("Sensibilidade selecionada: " + value);
}

function setBrazil(value)
{
	isBrazilian = value;
	if(value == 'N')
	{
		document.getElementById("ufSelectDiv").classList.add("disabled");
		document.getElementById("ufSelect").disabled = true;
		document.getElementById("ufSelectForm").reset();
		uf = '';

		document.getElementById("cityInputDiv").classList.add("disabled");
		document.getElementById("cityInput").disabled = true;
		document.getElementById("cityInputForm").reset();
		city = '';

		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		document.getElementById("ufSelectDiv").classList.remove("disabled");
		document.getElementById("ufSelect").disabled = false;

		document.getElementById("locationButton").disabled = true;
	}

	//alert("É brasileiro?: " + value);
}

$(document).ready(function() {
	$("input:checkbox").on('click', function() {
	  	var $box = $(this);
	  	if ($box.is(":checked")) {
	    	var group = "input:checkbox[name='" + $box.attr("name") + "']";
	    	$(group).prop("checked", false);
	    	$box.prop("checked", true);
	  	} 
	  	else
	    	$box.prop("checked", false);
	});

	$("#ufSelect").change(function() {
		let value = $(this).val();
		uf = value;

		if(value == 'DF')
		{
			document.getElementById("cityInputDiv").classList.add("disabled");
			document.getElementById("cityInput").disabled = true;
			document.getElementById("cityInputForm").reset();
			city = '';

			document.getElementById("locationButton").disabled = false;
		}
		else
		{
			document.getElementById("cityInputDiv").classList.remove("disabled");
			document.getElementById("cityInput").disabled = false;

			document.getElementById("locationButton").disabled = true;
		}

		//alert("UF selecionada: " + value);
	});

	$('#cityInput').keyup(function() {
		let value = $(this).val();

		if (value.length > 2)
		{
			city = value;
			document.getElementById("locationButton").disabled = false;
		}
		else
		{
			city = '';
			document.getElementById("locationButton").disabled = true;
		}
	});
});

function calculateSkinType() {
	let score = eyeColor + hairColor + skinColor + frecklesQuantity + 
				skinSunReaction + skinTanned + skinTannedIntensity + skinSensitivity;
	let skinType = score == 0? 1 : Math.ceil(score/6);

	switch(skinType)
	{
		case 1:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO I";
			document.getElementById("skinTypeSun").innerText = "Sua pele é extremamente sensível ao sol, sempre queima, mas nunca fica bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura menos de 10 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele.";
			document.getElementById("sunScale").src = "Extras/sun_type_1.png";
			break;
		case 2:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO II";
			document.getElementById("skinTypeSun").innerText = "Sua pele é muito sensível ao sol, queima facilmente e fica levemente bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura de 10 a 20 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele.";
			document.getElementById("sunScale").src = "Extras/sun_type_2.png";
			break;
		case 3:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO III"; 
			document.getElementById("skinTypeSun").innerText = "Sua pele é sensível ao sol, queima algumas vezes e bronzea-se uniformemente."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura entre 20 e 30 minutos. Possui risco mediano de queimadura solar, mas alto risco de câncer de pele.";
			document.getElementById("sunScale").src = "Extras/sun_type_3.png";
			break;
		case 4:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO IV";
			document.getElementById("skinTypeSun").innerText = "Sua pele é suavente sensível ao sol, queima levemente, mas sempre fica altamente bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura cerca 40 minutos. Possui baixo risco de queimadura solar e de câncer de pele.";
			document.getElementById("sunScale").src = "Extras/sun_type_4.png";
			break;
		case 5:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO V";
			document.getElementById("skinTypeSun").innerText = "Sua pele é resistente ao sol, raramente queima, mas fica muito bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele.";
			document.getElementById("sunScale").src = "Extras/sun_type_5.png";
			break;
		case 6:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO VI";
			document.getElementById("skinTypeSun").innerText = "Sua pele é muito resistente ao sol, nunca queima e é profundamente pigmentada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele.";
			document.getElementById("sunScale").src = "Extras/sun_type_6.png";
			break;
		default:
			document.getElementById("skinTypeText").innerText = "UM ERRO OCORREU"; 
			document.getElementById("skinTypeSun").innerText = "Tente recarregar a página.";
			document.getElementById("skinTypeTime").innerText = "";
	}
}

function backToTop() {
  	document.body.scrollTop = 0;
  	document.documentElement.scrollTop = 0;
  	document.scrollingElement.scrollTop = 0;
}