
window.game = window.game || {}
window.game.LeapController =

class LeapController {
  constructor() {
    //
  }

  static enable(callback) {
    // --- input from LeapMotion ---

    function doesLeftHandMoveLeft(leftHand) {
      if (!leftHand || !leftHand.valid) return false;
      if (leftHand.type !== "left") return false;
      return (leftHand.palmPosition[0] < -100 && leftHand.palmVelocity[0] < -300);
    }
    function doesRightHandMoveRight(rightHand) {
      if (!rightHand || !rightHand.valid) return false;
      if (rightHand.type !== "right") return false;
      return (rightHand.palmPosition[0] > 100 && rightHand.palmVelocity[0] > 300);
    }
    function doesHandMoveUp(hand) {
      if (!hand || !hand.valid) return false;
      return (hand.palmPosition[1] > 400 && hand.palmVelocity[1] > 400);
    }
    function doHandsTurnWheel(leftHand, rightHand) {
      if (!leftHand || !leftHand.valid) return false;
      if (!rightHand || !rightHand.valid) return false;
      return (
        (leftHand.palmPosition[1]  > 400 && leftHand.palmVelocity[1]  > 400 &&
         rightHand.palmPosition[1] < 400 && rightHand.palmVelocity[1] < -400) ||
        (leftHand.palmPosition[1]  < 400 && leftHand.palmVelocity[1]  < -400 &&
         rightHand.palmPosition[1] > 400 && rightHand.palmVelocity[1] > 400)
      );
    }
    function doesHandToggleSwitch(hand) {
      if (!hand || !hand.valid) return false;
      return (hand.palmPosition[0] < -100 && hand.palmPosition[2] < -10 && hand.palmVelocity[2] < -400);
    }

    // leap detects multiple action per one action.
    // so we make that hands will not be detected within 0.2sec after the door open.
    var waitTime = 200; // 0.2sec
    var canOpenNextDoor = true;

    this.controller = new Leap.Controller({enableGestures: true})
      .use('screenPosition')
      .connect()
      .on('frame', function(frame) {
        if (!canOpenNextDoor) return;

        let hand      = frame.hands[0];
        let otherHand = frame.hands[1];
        if (!hand) return;
        let leftHand  = (hand.type === "left")  ? hand: otherHand;
        let rightHand = (hand.type === "right") ? hand: otherHand;

        let method = ""
        if (doesRightHandMoveRight(rightHand)) {
          method = "right";
        }
        if (doesLeftHandMoveLeft(leftHand)) {
          method = "left";
        }
        if (doesHandMoveUp(hand) || doesHandMoveUp(otherHand)) {
          method = "up";
        }
        if (doesLeftHandMoveLeft(leftHand) && doesRightHandMoveRight(rightHand)) {
          method = "both-side";
        }
        if (doesHandToggleSwitch(leftHand)) {
          method = "switch";
        }
        if (doHandsTurnWheel(leftHand, rightHand)) {
          method = "turn";
        }

        if (method) {
          console.log(method);

          canOpenNextDoor = false;
          setTimeout(function () { canOpenNextDoor = true; }, waitTime);

          callback.call(null, method);
        }
      });
  }

  static disable() {
    this.controller.disconnect();
  }
}
