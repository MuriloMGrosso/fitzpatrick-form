import { questionsNavigation, attributeContainer, locationQuestion } from "./standard.js";
import { addNewFitzpatrickForm } from "./database.js";

let fitzpatrickForm = {
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

$(document).ready(function() 
{
	questionsNavigation(questions);
	attributeContainer(fitzpatrickForm);
	locationQuestion(isBrazilian, fitzpatrickForm);

    let agreementButton = document.getElementById('agreementButton');
    agreementButton.addEventListener('click', function(){
		calculateSkinType();
		saveData();
	});
});

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
		score += fitzpatrickForm[skinInformation[i]];

	let skinType = score == 0? 1 : Math.ceil(score/6);
	fitzpatrickForm['skinType'] = skinType;

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

function saveData()
{
	fitzpatrickForm['timestamp'] = Date.now();
	let submitCount = parseInt(localStorage.getItem('submitCountFitzpatrick'));
	submitCount = (isNaN(submitCount) || submitCount < 0) 
					? 1 
					: submitCount + 1; 
	localStorage.setItem('submitCountFitzpatrick', submitCount);
	fitzpatrickForm['submitCount'] = submitCount;

	addNewFitzpatrickForm(fitzpatrickForm);
}