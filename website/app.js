/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=b6bc584082e3fbf424782f3806d936d1&units=metric";

//Get weather data
const getWeatherData = async (url, code, key) => {
	const res = await fetch(baseURL + code + key);
	try {
		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error(err);
	}
};

//Post data
const postData = async (url = "", data = {}) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	try {
		const newData = await res.json();
		return newData;
	} catch (err) {
		console.error(err);
	}
};

//Update UI
const updateUI = async () => {
	const res = await fetch("/all");
	try {
		const finalData = await res.json();

		document.getElementById("date").innerHTML = `Date: ${finalData.date}`;
		document.getElementById("temp").innerHTML = `Temp: ${
			finalData.temp + " &degC"
		}`;
		document.getElementById("content").innerHTML = finalData.content;
	} catch (err) {
		console.error(err);
	}
};

const generateWeatherData = e => {
	const zipCode = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;

	getWeatherData(baseURL, zipCode, apiKey).then(data => {
		postData("/add", {
			date: newDate,
			temp: data.main.temp,
			content: feelings,
		});

		updateUI();
	});
};

const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", generateWeatherData);
