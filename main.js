//Setting up canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//Generate random number
function random(min, max) {
    var num = Math.floor(Math.random()*(max - min)) + min;
    return num;
}