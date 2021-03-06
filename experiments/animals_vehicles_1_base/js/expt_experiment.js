/*
Timo Flesch, 2016
*/
// function startExperiment() {
// /*
//   here I preload my images to ensure that the trials do not start with a blank screen
// */
//   finishedinstructions = true;
//   // set new variables
//   setExperiment(); //expt_parameters.js
//   // inform participant that task is loading
//   goWebsite(html_loading);

//   // call Jan's function to load data, will automatically proceed with newExperiment()
//   startLoading()
// }

function newExperiment() {
  finishedinstructions = true;
  // clean div
  goWebsite(html_task);
  // set flags
  startedexperiment = true;
  finishedexperiment = false;

  // run the experiment
  edata.exp_starttime = getTimestamp();
  runExperiment(); //expt_run.js
}

function finishExperiment_resize() {
  //instructions screen
  if (!isFullscreen() && $("#startButton").length > 0) {
    document.getElementById("startButton").disabled = true;
  }
  //task screen
  if (!isFullscreen() && startedexperiment && !finishedexperiment) {
    stopExperiment();
    saveExperiment("data/resize");
    goWebsite(html_errscreen);
  } else if (!isFullscreen() && startedinstructions && !finishedinstructions) {
    goWebsite(html_errscreen);
  }
}

function finishExperiment_noresponse() {
  // stop the experiment
  edata.exp_finishtime = getTimestamp();
  stopExperiment();
  // send the data
  saveExperiment("data/noresponse");
  goWebsite(html_errnoresp);
}

function finishExperiment_data() {
  // stop the experiment
  console.log("finished experiment");
  edata.exp_finishtime = getTimestamp();
  //stopExperiment();
  // send the data
  goWebsite(html_sending);
  saveExperiment("data/data");
  // load vericode website and inject group-specific vericode
  gotoVericode();
}

function gotoVericode() {
  webfunc = function (data) {
    document.getElementById("webbodyDiv").innerHTML = data;
    document.getElementById("veriCode").innerHTML = parameters.vericode;
    document.getElementById("veriURL").text =
      "https://app.prolific.co/submissions/complete?cc=" + parameters.vericode;
    document.getElementById("veriURL").href =
      "https://app.prolific.co/submissions/complete?cc=" + parameters.vericode;
    coding.webfile = html_vercode;
  };
  $.post(html_vercode, [], webfunc);
}

function stopExperiment() {
  if (startedexperiment) {
    // set flags
    finishedexperiment = true;
    // remove
    removeFeedback();
    removeStimuli();
    removeInstructions();
    removeCountdown();
    removePaper();
    removeCue();
  }
}

function saveExperiment(path_data) {
  //set the data to be saved
  var path_tmp = "data/tmp";

  var alldata = {
    task: participant_task,
    path: path_tmp,
    id: participant_id,
    rule_taskBlue: JSON.stringify(participant_taskBlue_rule),
    rule_taskOrange: JSON.stringify(participant_taskOrange_rule),
    task_id: JSON.stringify(parameters.task_id),
    key_assign: JSON.stringify(parameters.keyStr),
    sdata: JSON.stringify(sdata),
    edata: JSON.stringify(edata),
    parameters: JSON.stringify(parameters),
  };

  if (finishedexperiment) {
    alldata.move = path_data;
  }
  //send it to the back-end
  logWrite(alldata);
}
