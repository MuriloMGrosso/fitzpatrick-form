let questions = [];
let currentQuestionIndex = 0;

export function nextQuestion()
{
	changeQuestion(1);
}

export function prevQuestion()
{
	changeQuestion(-1);
}

export function changeQuestion(index)
{
	let oldQuestion = document.getElementById(questions[currentQuestionIndex]);
	let newQuestion = document.getElementById(questions[currentQuestionIndex + index]);

	currentQuestionIndex += index;

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

export function questionsNavigation(_questions)
{
    questions = _questions;
    currentQuestionIndex = 0;

    let nextButtons = document.getElementsByClassName('nextButton');
    for (var i = 0; i < nextButtons.length; i++)
        nextButtons[i].addEventListener('click', nextQuestion);

    let prevButtons = document.getElementsByClassName('prevButton');
    for (var i = 0; i < prevButtons.length; i++)
        prevButtons[i].addEventListener('click', prevQuestion);
}

function setAttributeValue(value, containerId, dataDict)
{
	let attribute = questions[currentQuestionIndex];
	dataDict[attribute] = value;
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

export function attributeContainer(dataDict)
{
    let containers = document.querySelectorAll('.imageContainer,.textContainer');
    for (var i = 0; i < containers.length; i++)
	{
    	let container = containers[i];
        container.addEventListener('click', function(){ 
			let intValue = parseInt(container.getAttribute('value'));
			let value = isNaN(intValue) ? container.getAttribute('value') : intValue;
			setAttributeValue(value, container.id, dataDict); 
		});
    }
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

function setNationality(isBrazilian ,dataDict)
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
		dataDict['fu'] = null;

		document.getElementById("countyInputDiv").classList.add("disabled");
		document.getElementById("countyInput").disabled = true;
		document.getElementById("countyInputForm").reset();
		dataDict['county'] = null;

		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		document.getElementById("fuSelectDiv").classList.add("disabled");
		document.getElementById("fuSelect").disabled = true;
		document.getElementById("fuSelectForm").reset();
		dataDict['fu'] = null;

		document.getElementById("countyInputDiv").classList.add("disabled");
		document.getElementById("countyInput").disabled = true;
		document.getElementById("countyInputForm").reset();
		dataDict['county'] = null;

		document.getElementById("locationButton").disabled = true;		
	}
}

function setFU(fu, dataDict)
{
	dataDict['fu'] = fu;

	if(fu == 'DF')
	{
		document.getElementById("countyInputDiv").classList.add("disabled");
		document.getElementById("countyInput").disabled = true;
		document.getElementById("countyInputForm").reset();
		dataDict['county'] = null;

		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		document.getElementById("countyInputDiv").classList.remove("disabled");
		document.getElementById("countyInput").disabled = false;

		document.getElementById("locationButton").disabled = true;
	}
}

function setCounty(county, dataDict)
{
	if (county.length > 2)
	{
		dataDict['county'] = county;
		document.getElementById("locationButton").disabled = false;
	}
	else
	{
		dataDict['county'] = null;
		document.getElementById("locationButton").disabled = true;
	}
}

export function locationQuestion(isBrazilian, dataDict)
{
    let isBrazilianButtons = document.getElementsByName('nationalityButton');
	for (var i = 0; i < isBrazilianButtons.length; i++)
	{
		isBrazilianButtons[i].addEventListener('click', function(){ 
			isBrazilian = isBrazilian == this.value
				? null
				: this.value;
			setNationality(isBrazilian, dataDict);
			exclusiveCheckbox($(this));
		});
	}

	document.getElementById('fuSelect').addEventListener('change', function(){ setFU(this.value, dataDict); });

	document.getElementById('countyInput').addEventListener('input', function(){
    	this.value = this.value.replace(/[^a-zA-Zá-úâ-ûãõä-üçÇ' -]/g, '');
		setCounty(this.value, dataDict);
	});

    return dataDict;
}