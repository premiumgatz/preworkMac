#!/bin/bash
# sheet.sh out.jpg files...
out=$1; shift; n=$#; cols=2; rows=$(( (n+1)/2 ))
ffmpeg -v error -y $(for f in "$@"; do echo -n "-i $f "; done) -filter_complex "$(for i in $(seq 0 $((n-1))); do echo -n "[$i]scale=800:-1[s$i];"; done)$(for i in $(seq 0 $((n-1))); do echo -n "[s$i]"; done)xstack=inputs=$n:layout=$(python3 -c "
n=$n;c=$cols;print('|'.join(f'{(i%c)*800}_{(i//c)*450}' for i in range(n)))"):fill=gray" -frames:v 1 $out
