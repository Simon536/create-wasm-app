import * as wasm from "wasm-fractal-gen";
import { memory } from "wasm-fractal-gen/wasm_fractal_gen_bg";

const canvas = document.getElementById("mandelbrot-canvas");
canvas.height = wasm.size();
canvas.width = wasm.size();

const ctx = canvas.getContext('2d');

const drawPixels = () => {
  const mandelbrot_obj = wasm.MandelbrotImage.new();
  const pixelPtr = mandelbrot_obj.pixels();
  const pixels = new Uint8Array(memory.buffer, pixelPtr, wasm.size() * wasm.size());

  ctx.beginPath();

  for (let row = 0; row < wasm.size(); row++){
      for (let col = 0; col < wasm.size(); col++){
        const idx = wasm.get_index(row, col);
        if (pixels[idx] === wasm.Colour.Black){
          ctx.fillRect(row, col, 1, 1);
          ctx.fillStyle = "#000000";
        }
        if (pixels[idx] === wasm.Colour.Red){
          ctx.fillRect(row, col, 1, 1);
          ctx.fillStyle = "#D02000";
        }
        if (pixels[idx] === wasm.Colour.Pink){
          ctx.fillRect(row, col, 1, 1);
          ctx.fillStyle = "#D000C0";
        }
        //else{
          //ctx.fillRect(row, col, 1, 1);
        //}
      }
  }

  ctx.stroke();
}

drawPixels();
