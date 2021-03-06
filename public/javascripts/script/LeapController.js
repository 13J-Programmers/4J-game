
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
      // if (leftHand.type !== "left") return false;
      return (
        (leftHand.palmVelocity[0] < -300) ||
        (leftHand.palmVelocity[0] > 300)
      );
    }
    function doesRightHandMoveRight(rightHand) {
      if (!rightHand || !rightHand.valid) return false;
      // if (rightHand.type !== "right") return false;
      return (
        (rightHand.palmVelocity[0] > 300) ||
        (rightHand.palmVelocity[0] < -300)
      );
    }
    function doHandsMoveOutside(leftHand, rightHand) {
      if (!leftHand || !leftHand.valid) return false;
      if (!rightHand || !rightHand.valid) return false;
      return (
        (leftHand.palmVelocity[0] < -150 && rightHand.palmVelocity[0] > 150) ||
        (leftHand.palmVelocity[0] > 150 && rightHand.palmVelocity[0] < -150)
      );
    }
    function doesHandMoveUp(hand) {
      if (!hand || !hand.valid) return false;
      return (hand.palmVelocity[1] > 600);
    }
    function doHandsTurnWheel(leftHand, rightHand) {
      if (!leftHand || !leftHand.valid) return false;
      if (!rightHand || !rightHand.valid) return false;
      return (
        (leftHand.palmVelocity[1] > 400  && rightHand.palmVelocity[1] < -400) ||
        (leftHand.palmVelocity[1] < -400 && rightHand.palmVelocity[1] > 400)
      );
    }
    function doesHandToggleSwitch(hand) {
      if (!hand || !hand.valid) return false;
      return (hand.palmPosition[0] < 100 && hand.palmVelocity[2] < -500);
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
        if (doesHandToggleSwitch(leftHand) || doesHandToggleSwitch(rightHand)) {
          method = "switch";
        }
        if (doHandsTurnWheel(leftHand, rightHand)) {
          method = "turn";
        }
        if (doHandsMoveOutside(leftHand, rightHand)) {
          method = "both-side";
        }

        if (method) {
          console.log(method);

          canOpenNextDoor = false;
          setTimeout(function () { canOpenNextDoor = true; }, waitTime);

          return callback(method);
        }
      });
  }

  static disable() {
    this.controller.disconnect();
  }
}
