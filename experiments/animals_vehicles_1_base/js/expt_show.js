/* **************************************************************************************

Shows raphael objects (opacity to 1)
original version: Timo Flesch, 2016
updated version: Timo Flesch, 2021
[[timoflesch19 [at] gmail [dot] com]]


************************************************************************************** */
function showTrial() {
  /*
    shows a trial
  */

  // allow answering
  coding.answering = true;
  coding.newblock = false;
  // set response countdown
  startCountdown();

  showStimuli();
}

function showCue() {
  /*
    shwos contextual cue (shop)
  */

  hideFixation(board.fixation);

  board.cue.object.attr({ opacity: 1 });
  board.cue.context.attr({ opacity: 1 });
  // board.cue.text.attr({"opacity":1});
}

function showBlurCue() {
  /*
    shows blurred version of contextual cue (shop)
  */

  board.blurcue.object.attr({ opacity: 1 });
  board.blurcue.context.attr({ opacity: 1 });
}

function showAction(whichAction) {
  /*
  whichAction: [1/0] (accept,reject)
*/

  whichAction ? showAccept() : showReject();
}

function showAccept() {
  /*
  shows that subject accepted stimulus
*/
  showChoiceRect(1);
  // if training, provide feedback

  if (sdata.expt_sessIDX[coding.index] == 1 && coding.task == 0) {
    setTimeout(showFeedbackPos, parameters.feedback_timein);
  }
}

function showReject() {
  /*
  shows that subject did not accept stimulus
*/
  showChoiceRect(0);
  // if training, provide feedback (same holds as earlier)
  if (sdata.expt_sessIDX[coding.index] == 1 && coding.task == 0) {
    setTimeout(showFeedbackNeg, parameters.feedback_timein);
  }
}

function showStimuli() {
  /*
  stimulus presentation interval - shows stim in front of blurred cue
 */

  showBlurCue();
  showKeys();
  board.stimuli.stimulus.image.attr({ opacity: 1 });
  board.stimuli.stimulus.frame.attr({ opacity: 1 });
}

function showKeys() {
  /*
   shows instruction keys
 */
  board.instructions.keys[0].attr({ opacity: 1 });
  board.instructions.keys[1].attr({ opacity: 1 });
}

function showInstructions() {
  /*
    old function: shows key assignment under stimulus rect
  */

  board.instructions.object.attr({ opacity: 1 });
}

// function showFeedback() {
// /*
//   shows feedback (reward + resized stimulus)
// */
//   if(sdata.resp_category[coding.index]){ // if decided to accept
//
//    showFeedbackPos();
//
//
//   } else { // if not decided to accept or no response
//    showShop('empty'); // show empty shop
//    showFeedbackNeg();
//    // setTimeout(showFeedbackNeg,parameters.feedback_timein);
//
//   }
// }

function showChoiceRect(acceptOrReject) {
  /*
  acceptOrReject: [1/0];
  */
  switch (acceptOrReject) {
    case 1:
      // square around chosen val
      if (sdata.expt_keyassignment[coding.index]) {
        board.leftfeedback.rect.attr({ opacity: 1 });
      } else {
        board.rightfeedback.rect.attr({ opacity: 1 });
      }
      break;
    case 0:
      // square around chosen val
      if (sdata.expt_keyassignment[coding.index]) {
        board.rightfeedback.rect.attr({ opacity: 1 });
      } else {
        board.leftfeedback.rect.attr({ opacity: 1 });
      }
      break;
  }
}

function showFeedbackPos() {
  /*
  displays positive feedback (subject decided to accept stimulus)
*/
  hideStimuli();
  // hideBlurCue();
  hideKeys();
  showFixation(board.fixation);
  // updateFeedback();
  board.leftfeedback.object.attr({ opacity: 1 });
  board.rightfeedback.object.attr({ opacity: 1 });
  // square around chosen val
  if (sdata.expt_keyassignment[coding.index]) {
    board.leftfeedback.rect.attr({ opacity: 1 });
  } else {
    board.rightfeedback.rect.attr({ opacity: 1 });
  }
}
function showFeedbackNeg() {
  /*
  displays negative feedback (subject decided not to accept stimulus)
 */
  hideStimuli();
  // hideBlurCue();
  hideKeys();
  showFixation(board.fixation);
  // updateFeedback();
  board.leftfeedback.object.attr({ opacity: 1 });
  board.rightfeedback.object.attr({ opacity: 1 });
  // square around chosen val
  if (sdata.expt_keyassignment[coding.index]) {
    board.rightfeedback.rect.attr({ opacity: 1 });
  } else {
    board.leftfeedback.rect.attr({ opacity: 1 });
  }
}

function showBlock() {
  /*
  displays block break message
 */

  board.block = {};
  board.block.centre = board.paper.centre;
  if (
    (parameters.task_id.slice(0, 1) == "blocked") &
    (parameters.blockiness == 200)
  ) {
    board.block.text = parameters.txt.trainBreakBlocked;
  } else {
    board.block.text = parameters.txt.trainBreakInterleaved;
  }
  board.block.object = drawText(
    board.paper.object,
    board.block.centre,
    board.block.text
  );
  board.block.object.attr({
    "font-size": board.font_medsize,
    fill: parameters.visuals.cols.instrtxt,
  });
  coding.newblock = true;
}

function showFirstTrainingBlockInstructions() {
  /*
    displays training session instructions
  */
  coding.newblock = true;

  board.block = {};
  board.block.centre = board.paper.centre;
  if (
    (parameters.task_id.slice(0, 1) == "blocked") &
    (parameters.blockiness == 200)
  ) {
    board.block.text = parameters.txt.trainInstrBlocked;
  } else {
    board.block.text = parameters.txt.trainInstrInterleaved;
  }
  board.block.object = drawText(
    board.paper.object,
    board.block.centre,
    board.block.text
  );
  board.block.object.attr({
    "font-size": board.font_medsize,
    fill: parameters.visuals.cols.instrtxt,
  });
}

function showTestBlockInstructions() {
  /*
  displays test session instructions
*/

  board.block = {};
  board.block.centre = board.paper.centre;
  board.block.text = parameters.txt.testInstructions;

  board.block.object = drawText(
    board.paper.object,
    board.block.centre,
    board.block.text
  );
  board.block.object.attr({
    "font-size": board.font_medsize,
    fill: parameters.visuals.cols.instrtxt,
  });
  coding.newblock = true;
}
