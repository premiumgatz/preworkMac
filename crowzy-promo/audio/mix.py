import subprocess
START=144.823; DUR=29.5
# (file, video_time_of_start, gain_dB)
fx=[('whoosh',4.05-.665,-9),('whoosh',8.15-.665,-10),
    ('swish',10.4-.49,-13),('swish',14.5-.49,-13),('swish',18.6-.49,-13),('swish',20.65-.49,-13),
    ('whoosh',24.85-.665,-11),
    ('click',6.21,-8),('click',13.45,-6),('click',22.76,-6),
    ('success',16.55,-9),('success',22.82,-12),
    ('notif',23.28,-10),('notif',23.79,-11),('notif',24.31,-12)]
args=['ffmpeg','-y','-v','error','-ss',str(START),'-t',str(DUR),'-i','full.wav']
for f,_,_ in fx: args+=['-i',f+'.wav']
fc=[f"[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=-1.5dB,afade=t=in:d=0.25,afade=t=out:st={DUR-1.6}:d=1.6[m]"]
labels=['[m]']
for i,(f,t,g) in enumerate(fx,1):
    ms=int(round(max(t,0)*1000))
    fc.append(f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={g}dB,adelay={ms}|{ms}[f{i}]"); labels.append(f'[f{i}]')
fc.append(''.join(labels)+f"amix=inputs={len(labels)}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.0:LRA=11[out]")
args+=['-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','soundtrack.wav']
subprocess.run(args,check=True)
