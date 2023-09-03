let rawText = "";
let rawArray = [];
let rewardsArray = [];

let catchingTasks,
  throwingTasks,
  battlingTasks,
  buddyFriendshipTasks,
  itemsTasks,
  miscellaneousTasks = [];

let getSeasonalQuestData = async () => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/Season-Quests.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      // Work with JSON data here
      rawText = data;
      buildArray(rawText);
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};
getSeasonalQuestData();

let buildArray = (text) => {
  let questArray = [];
  rawArray = text.split(/\r?\n|\r|\n/g).slice(2);
  for (let item of rawArray) {
    questArray.push(item.split(" ").slice(1).join(" "));
  }
  buildGroups(questArray);
};
let buildGroups = (questData) => {
  let groupedData = new Map();
  let flag = false;
  for (let data of questData) {
    if (flag && data !== "") {
      groupedData.set([data], ...rewardsArray.slice(-1));
    }
    if (!flag) {
      rewardsArray.push(data.slice(0, -1));
      flag = true;
    }
    if (data === "") {
      flag = false;
    }
  }
  filterGroups(groupedData);
};

let filterGroups = (pairedData) => {
  let filteredData = new Map();
  for (let [key, value] of pairedData) {
    if (value.includes("Pinap") || value.includes("Balls")) continue;
    if (value.includes("Berries") && !value.includes("Golden")) continue;
    if (value === "200 Stardust" || value === "500 Stardust") continue;
    filteredData.set(key, value);
  }
  console.log(filteredData);
};
