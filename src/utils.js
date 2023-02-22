////////////////////////////////////
///REUSABLE COMPONENTS / FUNCTIONS
////////////////////////////////////

/**
 * el2 appears in front of el1 at a given distance d, rotated by r.
 * @param {*} el1 -
 * @param {*} el2
 * @param {*} d - distance Vector3
 * @param {*} r - rotation Vector3
 */
function appearInFront(el1, el2, d, r) {
  //find world position of el1
  let el1Position = new THREE.Vector3();
  el1.object3D.getWorldPosition(el1Position);
  let el1Rotation = el1.getAttribute("rotation");
  el2.setAttribute("position", el1Position);
  let el2NewRotation = el1Rotation;
  if (r) {
    el2NewRotation.x += r.x;
    el2NewRotation.y += r.y;
    el2NewRotation.z += r.z;
  }
  el2.setAttribute("rotation", el2NewRotation);

  // push the el2 away from el1 by d
  el2.object3D.translateZ(-d);
}

//should be attached to scene entity, updating the inVR state
AFRAME.registerComponent("change-vr-mode-listener", {
  schema: {
    cameraRig: { type: "selector" },
  },
  init: function () {
    this.el.addEventListener("enter-vr", function (evt) {
      console.log("entering vr");
      // inVR is true if device is connected. Otherwise just fullscreen desktop mode.
      AFRAME.scenes[0].emit("setInVR", {
        inVR: AFRAME.utils.device.checkHeadsetConnected(),
      });
    });
    this.el.addEventListener("exit-vr", function (evt) {
      console.log("exiting vr");
      AFRAME.scenes[0].emit("setInVR", { inVR: false });
    });
  },
});

//snap turn implementation, turning a cameraRig in VR by Pi/3 radians (30 degrees)
AFRAME.registerComponent("snap-turn", {
  schema: {
    cameraRig: { type: "selector" },
  },
  init: function () {
    var data = this.data;
    let turnAngle = Math.PI / 3;
    let previousX = 0;
    const THUMBSTICK_THRESHOLD = 0.9; // 1 is thumb stick all the way to the right, 0 is middle, -1 is all the way left
    this.el.addEventListener("thumbstickmoved", function (evt) {
      if (
        Math.abs(evt.detail.x) > THUMBSTICK_THRESHOLD &&
        Math.abs(previousX) < THUMBSTICK_THRESHOLD
      ) {
        data.cameraRig.object3D.rotateY(
          evt.detail.x < 0 ? turnAngle : -turnAngle
        );
      }
      previousX = evt.detail.x; //save the old x thumbstick value
    });
  },
});
