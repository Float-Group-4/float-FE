export interface Timer {
  type: 'setTimeout' | 'requestAnimationFrame';
  id: number;
}

export function requestInterval(
  callback: (..._: any[]) => void,
  delay: number,
  ...callbackArgs: any[]
): Timer {
  const timer: Timer = { type: 'setTimeout', id: 0 };

  function tick() {
    timer.type = 'requestAnimationFrame';
    timer.id = window.requestAnimationFrame(() => {
      timer.type = 'setTimeout';
      timer.id = window.setTimeout(tick, delay);
      callback(...callbackArgs);
    });
  }

  timer.type = 'setTimeout';
  timer.id = window.setTimeout(tick, delay);
  return timer;
}

export function cancelInterval(timer: Timer): void {
  if (timer.type === 'requestAnimationFrame') {
    window.cancelAnimationFrame(timer.id);
  } else {
    window.clearTimeout(timer.id);
  }
}
