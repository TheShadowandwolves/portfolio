import React, { Fragment, memo, useEffect, useRef } from "react";

interface BackgroundProps {
  value: string;
}

// ---------- Matrix Rain (TypeScript) ----------
function r(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function pick<T>(...args: T[]): T {
  return args[r(0, args.length - 1)];
}

function getChar(): string {
  return String.fromCharCode(
    pick(
      r(0x3041, 0x30ff), // kana
      r(0x2000, 0x206f), // punctuation
      r(0x0020, 0x003f)  // basic ascii
    )
  );
}

function loop(fn: () => void, delay: number): { stop: () => void } {
  let stamp = Date.now();
  let rafId = 0;
  let stopped = false;

  const _loop = () => {
    if (stopped) return;
    if (Date.now() - stamp >= delay) {
      fn();
      stamp = Date.now();
    }
    rafId = requestAnimationFrame(_loop);
  };

  rafId = requestAnimationFrame(_loop);

  return {
    stop: () => {
      stopped = true;
      cancelAnimationFrame(rafId);
    },
  };
}

class Char {
  public element: HTMLSpanElement;

  constructor() {
    this.element = document.createElement("span");
    this.mutate();
  }

  mutate() {
    this.element.textContent = getChar();
  }
}

class Trail {
  public list: Char[];
  public options: { size: number; offset: number };
  public body: Array<Char | undefined> = [];

  constructor(list: Char[] = [], options?: Partial<{ size: number; offset: number }>) {
    this.list = list;
    this.options = Object.assign({ size: 10, offset: 0 }, options);
    this.move();
  }

  traverse(fn: (n: Char, i: number, last: boolean) => void) {
    this.body.forEach((n, i) => {
      if (!n) return;
      const last = i === this.body.length - 1;
      fn(n, i, last);
    });
  }

  move() {
    this.body = [];
    const { offset, size } = this.options;

    for (let i = 0; i < size; ++i) {
      const item = this.list[offset + i - size + 1];
      this.body.push(item);
    }

    this.options.offset = (offset + 1) % (this.list.length + size - 1);
  }
}

class Rain {
  public element: HTMLParagraphElement;
  public trail!: Trail;

  private mutators: Array<{ stop: () => void }> = [];
  private dropLoop?: { stop: () => void };

  constructor({ target, row }: { target: HTMLElement; row: number }) {
    this.element = document.createElement("p");
    this.build(row);
    target.appendChild(this.element);
    this.drop();
  }

  private build(row = 20) {
    const root = document.createDocumentFragment();
    const chars: Char[] = [];

    for (let i = 0; i < row; ++i) {
      const c = new Char();
      root.appendChild(c.element);
      chars.push(c);

      if (Math.random() < 0.5) {
        this.mutators.push(loop(() => c.mutate(), r(1000, 5000)));
      }
    }

    this.trail = new Trail(chars, { size: r(10, 30), offset: r(0, 100) });
    this.element.appendChild(root);
  }

  private drop() {
    const trail = this.trail;
    const len = trail.body.length;
    const delay = r(10, 100);

    this.dropLoop = loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        // tail gradient
        c.element.style.color = `hsl(136, 100%, ${(85 / len) * (i + 1)}%)`;

        // head glow
        if (last) {
          c.mutate();
          c.element.style.color = "hsl(136, 100%, 85%)";
          c.element.style.textShadow = "0 0 .5em #fff, 0 0 .5em currentColor";
        } else {
          c.element.style.textShadow = "";
        }
      });
    }, delay);
  }

  destroy() {
    this.dropLoop?.stop();
    this.mutators.forEach((m) => m.stop());
    this.mutators = [];
    this.element.remove();
  }
}

function initMatrixRain(container: HTMLElement, columns = 50, rows = 50) {
  const rains: Rain[] = [];
  for (let i = 0; i < columns; ++i) {
    rains.push(new Rain({ target: container, row: rows }));
  }

  return () => {
    rains.forEach((r) => r.destroy());
    container.innerHTML = "";
  };
}

// ---------- Component ----------
function BackgroundAnimation({ value }: BackgroundProps) {
  const mode = value !== "" ? value : "default";

  const matrixRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (mode !== "matrix") return;

    const el = matrixRef.current;
    if (!el) return;

    // clear old content before starting
    el.innerHTML = "";

    // You can tune these:
    // columns = how many vertical streams
    // rows    = how many chars per stream
    const cleanup = initMatrixRain(el, 45, 45);

    return cleanup;
  }, [mode]);

  return (
    <Fragment>
      {mode === "default" && (
        <div className="background-animation" aria-hidden="true">
          <div className="animated-bg blob-1" />
          <div className="animated-bg blob-2" />
          <div className="animated-bg blob-3" />
        </div>
      )}

      {mode === "matrix" && (
        <main className="matrix-root" aria-hidden="true" ref={matrixRef as any}>
          {/* matrix rain will be injected here */}
        </main>
      )}
    </Fragment>
  );
}

export default memo(BackgroundAnimation);

