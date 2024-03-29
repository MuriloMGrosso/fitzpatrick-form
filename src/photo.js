import { questionsNavigation, attributeContainer, locationQuestion, nextQuestion, changeQuestion, prevQuestion } from "./standard.js";
import { addNewMonkForm } from "./database.js";

let monkForm = {
	skinColor: -1,
	skinColor2: -1,
	forearmPhoto: null,
	photoSkinColor: -1,
	photoSkinColor2: -1,
	light: null,
	cellphone: null,
	sex: null,
	age: -1,
	fu: null,
	county: null,
	timestamp: null,
	submitCount: 0,
};
let isBrazilian = null;

let questions = [
	'intro',
	'brightnessTest',
	'colorTest',
	'skinColor',
	'skinColor2',
	'forearmPhoto',
	'photoSkinColor',
	'light',
	'cellphone',
	'sex',
	'age',
	'location',
	'agreement',
	'end'
];

$(document).ready(function() {
	questionsNavigation(questions);
	attributeContainer(monkForm);

    document.getElementById("skinColorButton").addEventListener('click', function(){ loadSecondSkinColors(); });
    document.getElementById("forearmPhotoButtonBack").addEventListener('click', function(){
		if(monkForm['skinColor'] == 1 || monkForm['skinColor'] == 10)
			changeQuestion(-2);
		else
			changeQuestion(-1);
	});

    document.getElementById("forearmInput").addEventListener('change', function () {
		setForearmImage(this);
    });

	for(let i = 1; i < 11; i++)
	{
		let scale = 1 - i/100;
		document.getElementById(`circleImage${i}`).style.scale = scale;
		// document.getElementById(`circleImageSwatch${i}`).style.scale = scale;
	}

	document.getElementById("ImageColorSlider").addEventListener('input', function () {
		setColorSlider(this.value);
    });

	document.getElementById('cellphoneSelect').addEventListener('change', function(){ setCellphone(this.value); });

	document.getElementById('ageInput').addEventListener('input', function() {
    	if (this.value.length > 1)
    		this.value = this.value.replace(/[^0-9]/g, '');
    	else
    		this.value = this.value.replace(/[^1-9]/g, '');
		setAge(this.value);
	});

	locationQuestion(isBrazilian, monkForm);

	let agreementButton = document.getElementById('agreementButton');
    agreementButton.addEventListener('click', function(){ saveData(); });
});

function loadSecondSkinColors()
{
	let skinColor2Containers = document.getElementsByClassName('skinColor2Container');
	for(let i = 0; i < skinColor2Containers.length; i++)
	{
		skinColor2Containers[i].setAttribute("hidden", "hidden");
        skinColor2Containers[i].style.backgroundColor = "white";
        skinColor2Containers[i].style.fontWeight = "normal";
	}
	document.getElementById('skinColor2Button').disabled = true;

	switch(monkForm['skinColor'])
	{
		case 1:
			monkForm['skinColor2'] = 2;
			nextQuestion();
			break;
		case 10:
			monkForm['skinColor2'] = 9;
			nextQuestion();
			break;
		default:
			let rightColor = document.getElementById("monkSkinTone" + (monkForm['skinColor'] - 1) + "_2");
			let leftColor = document.getElementById("monkSkinTone" + (monkForm['skinColor'] + 1) + "_2");
			rightColor.removeAttribute("hidden");
			leftColor.removeAttribute("hidden");
	}
}

function setForearmImage(inputFile)
{
	let button = document.getElementById("forearmPhotoButton");

	if (inputFile.files.length > 0) {
		let fileItem = inputFile.files.item(0);
		let fileSize = Math.round((fileItem.size / 1024));
		let imageFile = null;

		let reader  = new FileReader();
		reader.onload = function(e)  {
			let images = document.querySelectorAll('.forearmImage');
			for (var i = 0; i < images.length; i++)
				images[i].src = e.target.result;
			monkForm['forearmPhoto'] = e.target.result;
		}
		reader.readAsDataURL(fileItem);

		if (fileSize >= 4096)
		{
			alert("Arquivo muito grande ("+ Math.round((fileSize / 1024)) +"MB), por favor selecione um arquivo com menos de 4MB");
			if(!monkForm['forearmPhoto'])
			{
				document.getElementById('forearmPhotoLabel').innerHTML = '<i>nenhuma imagem selecionada</i>';
				button.disabled = true;
			}
		}
		else
		{
			document.getElementById('forearmPhotoLabel').innerHTML = '<i>imagem <b>' + fileItem.name + '</B> selecionada</i>';
			initializeColorSlider();
			button.disabled = false;
		}
	}
	else if(!monkForm['forearmPhoto'])
	{
		document.getElementById('forearmPhotoLabel').innerHTML = '<i>nenhuma imagem selecionada</i>';
		button.disabled = true;
	}
}

function initializeColorSlider()
{
	let n = monkForm['skinColor'] > 5 ? 1 : 9;
	let value = 10*(n - 1) + 5;
	document.getElementById("ImageColorSlider").value = value;
	setColorSlider(value);
}

function setColorSlider(value)
{
	let n = Math.round((value - 5)/10) + 1;
	let relativeOpacity = 1 - (value%10)/10;

	monkForm['photoSkinColor'] = relativeOpacity >= 0.5 ? n : n + 1;
	monkForm['photoSkinColor2'] = relativeOpacity <= 0.5 ? n : n + 1;

	for(let i = 1; i < 10; i++)
	{
		let currentOpacity = 1;

		if(i < n || i > n + 1)
			currentOpacity = 0;
		else if(i == n)
			currentOpacity = relativeOpacity;

		document.getElementById(`circleImage${i}`).style.opacity = currentOpacity;
		// document.getElementById(`circleImageSwatch${i}`).style.opacity = currentOpacity;
	}
}

function setCellphone(value)
{
	monkForm['cellphone'] = value;
	document.getElementById("cellphoneButton").disabled = false;
}

function setAge(value)
{
	if (value.length > 0 && parseInt(value) <= 120)
	{
		monkForm['age'] = parseInt(value);
		document.getElementById("ageButton").disabled = false;
	}
	else
	{
		monkForm['age'] = -1;
		document.getElementById("ageButton").disabled = true;
	}
}

function saveData()
{
	monkForm['timestamp'] = Date.now();
	let submitCount = parseInt(localStorage.getItem('submitCountMonk'));
	submitCount = (isNaN(submitCount) || submitCount < 0) 
					? 1 
					: submitCount + 1; 
	localStorage.setItem('submitCountMonk', submitCount);
	monkForm['submitCount'] = submitCount;

	addNewMonkForm(monkForm);
}