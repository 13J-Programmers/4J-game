
window.game = window.game || {}
window.game.LeapController =

class LeapController {
  constructor() {
    //
  }

  static enable(callback) {
    // --- input from LeapMotion ---

    function isLeftHandMoveLeft(leftHand) {
      if (!leftHand || !leftHand.valid) return false;
      if (leftHand.type !== "left") return false;
      return (leftHand.palmPosition[0] < -100 && leftHand.palmVelocity[0] < -200);
    }
    function isRightHandMoveRight(rightHand) {
      if (!rightHand || !rightHand.valid) return false;
      if (rightHand.type !== "right") return false;
      return (rightHand.palmPosition[0] > 100 && rightHand.palmVelocity[0] > 200);
    }

    var controller = new Leap.Controller({enableGestures: true})
      .use('screenPosition')
      .connect()
      .on('frame', function(frame) {
        let hand      = frame.hands[0];
        let otherHand = frame.hands[1];
        if (!hand) return;
        let leftHand  = (hand.type === "left")  ? hand: otherHand;
        let rightHand = (hand.type === "right") ? hand: otherHand;

        let method = ""
        if (isLeftHandMoveLeft(leftHand)) {
          method = "left";
        } else if (isRightHandMoveRight(rightHand)) {
          method = "right";
        }
        if (isLeftHandMoveLeft(leftHand) && isRightHandMoveRight(rightHand)) {
          method = "both-side"
        }

        if (method) {
          console.log(method);
          callback.call(null, method);
        }
      });
  }

  static disable() {
    // TODO
  }
}
