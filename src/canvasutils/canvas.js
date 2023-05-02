export function setCtx(pickedCanvas){

    const el = document.getElementById(`${pickedCanvas}`);
    const ctx = el.getContext("2d");
    return ctx;
  }
