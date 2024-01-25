let attributes = {
	eyeColor: -1,
	hairColor: -1,
	skinColor: -1,
	freckles: -1,
	skinSunReaction: -1,
	skinTanned: -1,
	skinTannedIntensity: -1,
	skinSensitivity: -1,
};

let isBrazilian = '';
let uf = '';
let city = '';

let questions = ['intro','eyeColor','hairColor','skinColor','freckles','skinSunReaction','skinTanned',
			 'skinTannedIntensity','skinSensitivity','location','agreement','result'];
let currentQuestionIndex = 0;

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

function backToTop() {
  	document.body.scrollTop = 0;
  	document.documentElement.scrollTop = 0;
  	document.scrollingElement.scrollTop = 0;
}

function setAttributeValue(value, containerId)
{
	let attribute = questions[currentQuestionIndex];
	attributes[attribute] = value;
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
	let nextButtons = document.getElementsByClassName('nextButton');
    for (var i = 0; i < nextButtons.length; i++)
        nextButtons[i].addEventListener('click', function(){ nextQuestion(); });

    let prevButtons = document.getElementsByClassName('prevButton');
    for (var i = 0; i < prevButtons.length; i++)
        prevButtons[i].addEventListener('click', function(){ prevQuestion(); });

    let containers = document.querySelectorAll('.imageContainer,.textContainer');
    for (var i = 0; i < containers.length; i++)
    {
    	let container = containers[i];
        container.addEventListener('click', function(){ setAttributeValue(parseInt(container.getAttribute('value')), container.id); });
    }

    let agreementButton = document.getElementById('agreementButton');
    agreementButton.addEventListener('click', function(){ calculateSkinType(); });

    /*Input do tipo checkbox exclusivo (permite apenas uma escolha)*/
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

	document.getElementById('ufSelect').addEventListener('change', function() {
		let value = this.value;
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

	document.getElementById('cityInput').addEventListener('input', function(){
    	this.value = this.value.replace(/[^a-zA-Zá-úâ-ûãõä-üçÇ' -]/g, '');

		if (this.value.length > 2)
		{
			city = this.value;
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
	let score = 0;
	for(let attribute in attributes)
		score += attributes[attribute];
	let skinType = score == 0? 1 : Math.ceil(score/6);

	switch(skinType)
	{
		case 1:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO I";
			document.getElementById("skinTypeSun").innerText = "Sua pele é extremamente sensível ao sol, sempre queima, mas nunca fica bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura menos de 10 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele.";
			document.getElementById("skinTypeRecommendations").innerText = "Recomenda-se usar protetor solar com FPS superior a 30. Além disso, procure sempre abrigar-se do sol.";
			document.getElementById("sunScale").src = "Extras/sun_type_1.png";
			break;
		case 2:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO II";
			document.getElementById("skinTypeSun").innerText = "Sua pele é muito sensível ao sol, queima facilmente e fica levemente bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura de 10 a 20 minutos. Por este motivo, possui alto risco de queimadura solar e de câncer de pele.";
			document.getElementById("skinTypeRecommendations").innerText = "Recomenda-se usar protetor solar com FPS superior a 30. Além disso, procure sempre abrigar-se do sol.";
			document.getElementById("sunScale").src = "Extras/sun_type_2.png";
			break;
		case 3:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO III"; 
			document.getElementById("skinTypeSun").innerText = "Sua pele é sensível ao sol, queima algumas vezes e bronzeia-se uniformemente."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura entre 20 e 30 minutos. Possui risco mediano de queimadura solar, mas alto risco de câncer de pele.";
			document.getElementById("skinTypeRecommendations").innerText = "Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.";
			document.getElementById("sunScale").src = "Extras/sun_type_3.png";
			break;
		case 4:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO IV";
			document.getElementById("skinTypeSun").innerText = "Sua pele é suavemente sensível ao sol, queima levemente, mas sempre fica altamente bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele dura cerca 40 minutos. Possui baixo risco de queimadura solar e de câncer de pele.";
			document.getElementById("skinTypeRecommendations").innerText = "Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.";
			document.getElementById("sunScale").src = "Extras/sun_type_4.png";
			break;
		case 5:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO V";
			document.getElementById("skinTypeSun").innerText = "Sua pele é resistente ao sol, raramente queima, mas fica muito bronzeada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele.";
			document.getElementById("skinTypeRecommendations").innerText = "Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.";
			document.getElementById("sunScale").src = "Extras/sun_type_5.png";
			break;
		case 6:
			document.getElementById("skinTypeText").innerText = "SUA PELE É DO TIPO VI";
			document.getElementById("skinTypeSun").innerText = "Sua pele é muito resistente ao sol, nunca queima e é profundamente pigmentada."; 
			document.getElementById("skinTypeTime").innerText = "A proteção de sua pele pode durar mais de 90 minutos. Possui risco quase nulo de queimadura solar e de câncer de pele.";
			document.getElementById("skinTypeRecommendations").innerText = "Recomenda-se usar protetor solar com FPS superior a 15. Além disso, evite tomar sol entre às 10 e às 16 horas.";
			document.getElementById("sunScale").src = "Extras/sun_type_6.png";
			break;
		default:
			document.getElementById("skinTypeText").innerText = "UM ERRO OCORREU"; 
			document.getElementById("skinTypeSun").innerText = "Tente recarregar a página.";
			document.getElementById("skinTypeTime").innerText = "";
			document.getElementById("skinTypeRecommendations").innerText = "";
	}
}