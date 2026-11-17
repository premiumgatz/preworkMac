// node render.mjs stills 1,5,10   |  node render.mjs video out.mp4 [fps] [scale]
import { createRequire } from 'module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
import { spawn } from 'child_process';
import path from 'path';
const [mode, arg, fpsArg, scaleArg] = process.argv.slice(2);
const fps = +(fpsArg||60), scale = +(scaleArg||1);
const browser = await chromium.launch({ args:['--disable-web-security','--allow-file-access-from-files','--force-color-profile=srgb'] });
const page = await browser.newPage({ viewport:{width:1920,height:1080}, deviceScaleFactor: scale });
page.on('console', m=>console.log('[page]', m.text())); page.on('pageerror', e=>console.log('[err]', e.message));
await page.goto('file://'+path.resolve('index.html')); await page.evaluate(()=>window.ready);
if (mode==='stills') {
  for (const t of arg.split(',').map(Number)) {
    await page.evaluate(([t])=>render(t, Math.round(t*60)), [t]);
    await page.screenshot({ path:`stills/t_${t.toFixed(2)}.jpg`, type:'jpeg', quality:85 });
  }
} else {
  const END = await page.evaluate(()=>T.END); const N = Math.round(END*fps);
  const W=1920*scale, H=1080*scale;
  const ff = spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-c:v','png','-i','-',
    '-c:v','libx264','-preset','slow','-crf','14','-pix_fmt','yuv420p','-tune','grain','-movflags','+faststart', arg],{stdio:['pipe','inherit','inherit']});
  const t0=Date.now();
  for (let i=0;i<N;i++){ const t=i/fps;
    await page.evaluate(([t,f])=>render(t,f), [t,i]);
    const buf = await page.screenshot({ type:'png' });
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%60===0) console.log(`frame ${i}/${N} ${((Date.now()-t0)/1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r=>ff.on('close',r));
}
await browser.close();
