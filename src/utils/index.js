const masterColors = ["#FFB400", "#FF5A5F", "#8CE071", "#00D1C1", "#007A87", "#7B0051"];
const rowStatuses = {
    COMPLETED : "completed",
    PENDING : "pending",
}
const allowedTries = 10;
const defaultColor = "gray";
const noOFColorsToChose = 4;
const getcircles = (color) => [...Array(noOFColorsToChose)].map((_)=>{return {color: color}});
const gameRow = () => {return {
    status : rowStatuses.PENDING,
    circles: getcircles(defaultColor),
}};
const getDefaultConfigs = () => [...Array(allowedTries)].map((_)=>gameRow());
const generateRandomArray = (targetArray,noOfChoices) => 
[...Array(noOfChoices)].map(()=> targetArray[Math.floor(Math.random()*targetArray.length)])
export {masterColors, defaultColor, getDefaultConfigs, allowedTries, noOFColorsToChose, rowStatuses, generateRandomArray};