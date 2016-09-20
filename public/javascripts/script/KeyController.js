
window.game = window.game || {}
window.game.KeyController =

class KeyController {
  constructor() {
    //
  }

  static enable() {
    // --- input from Keyboard ---

    // code to check it's keycode
    // document.addEventListener("keydown" , function (e) { console.log(e.keyCode); });

    document.addEventListener("keydown" , function (e) {
      var keyCode = e.keyCode;
      var method;

      switch (keyCode) {
        case 37: /* KEY_CODE_LEFT  */ method = "left";      break;
        case 38: /* KEY_CODE_UP    */ method = "up";        break;
        case 39: /* KEY_CODE_RIGHT */ method = "right";     break;
        case 40: /* KEY_CODE_DOWN  */ method = "down";      break;
        case 66: /* KEY_CODE_B     */ method = "both-side"; break;
        case 83: /* KEY_CODE_S     */ method = "switch";    break;
        case 84: /* KEY_CODE_T     */ method = "turn";      break;
        default: method = "";
      }

      // Prevent from opening a door far from here.
      if (player.position.distanceTo(fieldGenerator.getDoor().position) > 500) return;

      if (fieldGenerator.openDoor(method)) {
        player.moveForward();
        fieldGenerator.generateDoor();
      }
    });
  }

  static disable() {
    // TODO
  }
}
