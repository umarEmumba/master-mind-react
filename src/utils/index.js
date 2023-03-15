export const masterColors = ["#FFB400", "#FF5A5F", "#8CE071", "#00D1C1", "#007A87", "#7B0051"];
export const rowStatuses = {
    COMPLETED : "completed",
    PENDING : "pending",
}
export const allowedTries = 10;
export const defaultColor = "gray";
export const noOFColorsToChose = 4;
const getcircles = (color) => [...Array(noOFColorsToChose)].map((_)=>{return {color: color}});
export const gameRow = () => {return {
    status : rowStatuses.PENDING,
    circles: getcircles(defaultColor),
}};
export const getDefaultConfigs = () => [...Array(allowedTries)].map((_)=>gameRow());
export const generateRandomArray = (targetArray,noOfChoices) => 
    [...Array(noOfChoices)].map(()=> targetArray[Math.floor(Math.random()*targetArray.length)])
