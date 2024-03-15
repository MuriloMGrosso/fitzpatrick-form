import { addNewUserInformation } from "./index.js";

let userInformation = {
	eyeColor: -1,
	hairColor: -1,
	skinColor: -1,
	freckles: -1,
	skinSunReaction: -1,
	skinTanned: -1,
	skinTannedIntensity: -1,
	skinSensitivity: -1,
	fu: null,
	county: null,
	skinType: -1,
	timestamp: null,
	submitCount: 0,
};
let isBrazilian = null;

let questions = [
	'intro',
	'eyeColor',
	'hairColor',
	'skinColor',
	'freckles',
	'skinSunReaction',
	'skinTanned',
	'skinTannedIntensity',
	'skinSensitivity',
	'location',
	'agreement',
	'result'
];
let currentQuestionIndex = 0;

$(document).ready(function() 
{
	let nextButtons = document.getElementsByClassName('nextButton');
    for (var i = 0; i < nextButtons.length; i++)
        nextButtons[i].addEventListener('click', nextQuestion);

    let prevButtons = document.getElementsByClassName('prevButton');
    for (var i = 0; i < prevButtons.length; i++)
        prevButtons[i].addEventListener('click', prevQuestion);

    let containers = document.querySelectorAll('.imageContainer,.textContainer');
    for (var i = 0; i < containers.length; i++)
	{
    	let container = containers[i];
        container.addEventListener('click', function(){ 
			setAttributeValue(parseInt(container.getAttribute('value')), container.id); 
		});
    }

	let isBrazilianButtons = document.getElementsByName('nationalityButton');
	for (var i = 0; i < isBrazilianButtons.length; i++)
	{
		isBrazilianButtons[i].addEventListener('click', function(){ 
			isBrazilian = isBrazilian == this.value
				? null
				: this.value;
			setNationality();
			exclusiveCheckbox($(this));
		});
	}

	document.getElementById('fuSelect').addEventListener('change', function(){ setFU(this.value); });

	document.getElementById('countyInput').addEventListener('input', function(){
    	this.value = this.value.replace(/[^a-zA-Zá-úâ-ûãõä-üçÇ' -]/g, '');
		setCounty(this.value);
	});

    let agreementButton = document.getElementById('agreementButton');
    agreementButton.addEventListener('click', calculateSkinType);
});

function nextQuestion()
{
	let currentQuestion = document.getElementById(questions[currentQuestionIndex]);
	let nextQuestion = document.getElementById(questions[currentQuestionIndex + 1]);
    currentQuestionIndex++;
	changeQuestion(currentQuestion, nextQuestion);
}

function prevQuestion()
{
	let currentQuestion = document.getElementById(questions[currentQuestionIndex]);
	let prevQuestion = document.getElementById(questions[currentQuestionIndex - 1]);
    currentQuestionIndex--;
	changeQuestion(currentQuestion, prevQuestion);
}

function changeQuestion(oldQuestion, newQuestion)
{
    oldQuestion.setAttribute("hidden", "hidden");
    newQuestion.removeAttribute("hidden");
    backToTop();
}

function backToTop()
{
  	document.body.scrollTop = 0;
  	document.documentElement.scrollTop = 0;
  	document.scrollingElement.scrollTop = 0;
}

function setAttributeValue(value, containerId)
{
	let attribute = questions[currentQuestionIndex];
	userInformation[attribute] = value;
	selectContainer(containerId, `${attribute}Container`, `${attribute}Button`);
	//alert(`${attribute} selecionado: ${value}`);
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

function exclusiveCheckbox($box)
{
	if ($box.is(":checked")) {
	  var group = "input:checkbox[name='" + $box.attr("name") + "']";
	  $(group).prop("checked", false);
	  $box.prop("checked", true);
	} 
	else
	  $box.prop("checked", false);	
}

function setNationality()
{
	if(isBrazilian == 'true')
	{
		document.getElementById("fuSelectDiv").classList.remove("disabled");
		document.getElementById("fuSelect").disabled = false;

		document.getElementById("locationButton").disabled = true;		
	}
	else if(isBrazilian == 'false')
	{
		document.getElementById("fuSelectDiv").classList.add("disabled");
		document.getElementById("fuSelect").disabled = true;
		document.getElementById("fuSelectForm").reset();
		userInformation['fu'] = null;

		document.getElementById("countyInputDiv").classList.add("disabled");
		document.getElementById("countyInput").disabled = true;
		document.getElementById("countyInputForm").reset();
		userInformation['county'] = null;

		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		document.getElementById("fuSelectDiv").classList.add("disabled");
		document.getElementById("fuSelect").disabled = true;
		document.getElementById("fuSelectForm").reset();
		userInformation['fu'] = null;

		document.getElementById("countyInputDiv").classList.add("disabled");
		document.getElementById("countyInput").disabled = true;
		document.getElementById("countyInputForm").reset();
		userInformation['county'] = null;

		document.getElementById("locationButton").disabled = true;		
	}
}

function setFU(fu)
{
	userInformation['fu'] = fu;

	if(fu == 'DF')
	{
		document.getElementById("countyInputDiv").classList.add("disabled");
		document.getElementById("countyInput").disabled = true;
		document.getElementById("countyInputForm").reset();
		userInformation['county'] = null;

		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		document.getElementById("countyInputDiv").classList.remove("disabled");
		document.getElementById("countyInput").disabled = false;

		document.getElementById("locationButton").disabled = true;
	}
}

function setCounty(county)
{
	if (county.length > 2)
	{
		userInformation['county'] = county;
		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		userInformation['county'] = null;
		document.getElementById("locationButton").disabled = true;
	}
}

function calculateSkinType()
{
	let score = 0;
	let skinInformation = [	
		'eyeColor',
		'hairColor',
		'skinColor',
		'freckles',
		'skinSunReaction',
		'skinTanned',
		'skinTannedIntensity',
		'skinSensitivity'];

	for(let i = 0; i < skinInformation.length; i++)
		score += userInformation[skinInformation[i]];

	let skinType = score == 0? 1 : Math.ceil(score/6);
	userInformation['skinType'] = skinType;

	userInformation['timestamp'] = Date.now();
	let submitCount = localStorage.getItem('submitCount') == null 
					? 1 
					: submitCount + 1; 
	localStorage.setItem('submitCount', submitCount);
	userInformation['submitCount'] = submitCount;

	addNewUserInformation(userInformation);

	let romanNum = ['?','I','II','III','IV','V','VI'];
	let skinTypeSunText = [
		"Um erro ocorreu",
		"Sua pele é extremamente sensível ao sol, sempre queima, mas nunca fica bronzeada.",
		"Sua pele é muito sensível ao sol, queima facilmente e fica levemente bronzeada.",
		"Sua pele é sensível ao sol, queima algumas vezes e bronzeia-se uniformemente.",
		"Sua pele é suavemente sensível ao sol, queima levemente, mas sempre fica altamente bronzeada.",
		"Sua pele é resistente ao sol, raramente queima, mas fica muito bronzeada.",
		"Sua pele é muito resistente ao sol, nunca queima e é profundamente pigmentada."
	];
	let skinTypeTimeText = [
		"Tente recarregar a página.",
		"A proteção de sua pele dura menos de 10 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele.",
		"A proteção de sua pele dura de 10 a 20 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele.",
		"A proteção de sua pele dura entre 20 e 30 minutos. Possui risco mediano de queimadura solar, mas alto risco de câncer de pele.",
		"A proteção de sua pele dura cerca 40 minutos. Possui baixo risco de queimadura solar e de câncer de pele.",
		"A proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele.",
		"A proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele."
	];
	let skinTypeRecommendationsText = [
		"",
		"Recomenda-se usar protetor solar com FPS superior a 30. Além disso, procure sempre abrigar-se do sol.",
		"Recomenda-se usar protetor solar com FPS superior a 30. Além disso, procure sempre abrigar-se do sol.",
		"Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.",
		"Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.",
		"Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.",
		"Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas."
	];

	document.getElementById("skinTypeText").innerText = `SUA PELE É DO TIPO ${romanNum[skinType]}`;
	document.getElementById("skinTypeSun").innerText = skinTypeSunText[skinType];
	document.getElementById("skinTypeTime").innerText = skinTypeTimeText[skinType];
	document.getElementById("skinTypeRecommendations").innerText = skinTypeRecommendationsText[skinType];
	document.getElementById("sunScale").src = `img/extras/sun_type_${skinType}.png`;
}