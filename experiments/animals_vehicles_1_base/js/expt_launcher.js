/* **************************************************************************************

Launches blocks and trials
original version: Timo Flesch, 2016
updated version: Timo Flesch, 2021
[[timoflesch19 [at] gmail [dot] com]]

based on earlier version of script by jdobalaguer@gmail.com
************************************************************************************** */

function newBlock() {
  /*
    creates a new experiment block
  */
  hideTrial();
  hideCue();
  hideBlurCue();
  hideFeedback();
  hideKeys();
  showBlock();
  saveExperiment();
}

function startBlock() {
  /*
    begins with first trial in new block
  */
  if (coding.newblock) {
    coding.newblock = false;
    hideBlock();
    newTrial();
  }
}

function nextTrial() {
  /*
    changes to next trial
  */

  // INCREMENT TRIAL
  coding.index++;
  coding.trial++;

  // INCREMENT BLOCK
  if (
    coding.trial == parameters.nb_trials_train ||
    (coding.trial == parameters.nb_trials_test) &
      (sdata.expt_sessIDX[coding.index] == 2)
  ) {
    coding.block++;
    coding.trial = 0;
    coding.return = coding.index;
    // END OF EXPERIMENT
    if (coding.block == parameters.nb_blocks + parameters.nb_blocks_test) {
      // empty the canvas
      stopExperiment();
      // get feedback!
      // (calls getHumanFeedback, which itself calls finishExperiment_data())
      goWebsite(html_feedback);
      return;
    }

    // NEW BLOCK
    coding.newblock = true;
    if (sdata.expt_sessIDX[coding.index] == 2) {
      // quit the training phase
      quitTrainingSession();
      // launch the test phase
      launchTestSession();
      return;
    } else {
      newBlock();
      return;
    }
  }

  // NEW TRIAL
  newTrial();
}

function newTrial() {
  /*
  !!most important function, defines what happens during a trial!!
*/

  if (!startedexperiment) {
    return;
  }

  // step 1: remove old crap
  removeCue();
  removeBlurCue();
  removeStimuli(); // remove old stimulus
  removeKeys(); // remove keys
  removeFeedback(); // remove feedback (rects and values)

  // step 2: update content
  updateCue(); //draw new context rect
  updateStimuli(); // draw new stimulus
  updateKeys(); // draw new key assignmenth
  updateFeedback(); // draw new feedback

  // step 3: hide new content
  hideCue();
  hideBlurCue();
  hideStimuli();
  hideKeys();
  hideFeedback();

  // step 4: brief iti, then show trial
  setTimeout(beginTrial, parameters.iti_timeout);
}

function beginTrial() {
  showCue(); // context

  // step 5: show stimulus after timeout, wait for response
  coding.timestamp = getTimestamp();
  board.countdown.stimTimeIn = setTimeout(
    showTrial,
    parameters.stimulus_timein
  );
}

function newTrainingSession() {
  /*
  begins new training session (either blocked or interleaved)
*/

  hideTrial();
  hideFeedback();
  hideKeys();

  showFirstTrainingBlockInstructions();
}

function quitTrainingSession() {
  /*
  finishes training session and asks for feedback
*/

  // hide old exp
  hideTrial();
  hideFeedback();
  hideKeys();
  // save data
  saveExperiment();

  // remove canvas
  removePaper();
}

function launchTestSession() {
  /*
  begins new test session (always interleaved)
*/

  coding.task++;
  goWebsite(html_task);
  addPaper();
  // hideInstructions();
  showTestBlockInstructions();
  saveExperiment();
}
