// import "aframe-state-component"; //components are loaded, but state is not registered properly via npm
import "aframe-template-component";
import "aframe-environment-component";
import "./utils";
////////////////////////////////////
// STATE
////////////////////////////////////
window.AFRAME.registerState({
  initialState: {
    inVR: false,
  },
  handlers: {
    setInVR: function (state, action) {
      state.inVR = action.inVR;
    },
  },
});
