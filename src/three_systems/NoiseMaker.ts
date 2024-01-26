import { Noise } from "../noise/Perlin";

class NoiseMaker {

  #noise;
  #seed = Math.random();
  #min = 1;
  #max = -1;
  #length;
  #width;

  constructor(length: number, width: number) {
    this.#length = length;
    this.#width = width;

    // @ts-ignore
    this.#noise = new Noise();
  }

  setSeed(val: number) {
    this.#seed = val;
  }

  generatePerlinGrid() {

    this.#noise.seed(this.#seed);

    const outer: number[][] = [];
    for (let i = 0; i < this.#length; i++) {
      const inner = [];
      for (let j = 0; j < this.#width; j++) {
        const value = this.#noise.perlin2(i/10, j/10);
        this.#min = value < this.#min ? value : this.#min;
        this.#max = value > this.#max ? value : this.#max;
        inner.push(value);
      }
      outer.push(inner);
    }

    return outer;
  }

  // passing 0 gives you the min, passing 100 gives you the max;
  getNumberAtPercentile(val: number) {
    const perc = val / 100;
    return ((this.#max - this.#min) * perc) + this.#min;
  }

  getMin() {
    return this.#min;
  }

  getMax() {
    return this.#max;
  }

}

export { NoiseMaker };