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
