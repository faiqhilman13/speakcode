import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath.path);

const inputPath = 'public/voiceover.mp3';
const outputPath = 'public/voiceover-with-pause.mp3';
const insertAtSec = 55.5;
const silenceSec = 1;

// Use afade for crossfade instead - simpler approach
// Actually, let's use a different method: generate silence, then concat with -ignore_unknown

console.log(`Creating new audio with 1s pause at ${insertAtSec}s...`);

// Method: use concat protocol with proper audio format
// First create properly formatted files

ffmpeg(inputPath)
  .outputOptions([
    '-t', insertAtSec.toString(),
    '-c', 'copy'
  ])
  .output('public/voiceover-part1.mp3')
  .on('end', () => {
    ffmpeg(inputPath)
      .outputOptions([
        '-ss', insertAtSec.toString(),
        '-c', 'copy'
      ])
      .output('public/voiceover-part2.mp3')
      .on('end', () => {
        // Create silence with matching format
        ffmpeg()
          .input('anullsrc=r=44100:cl=mono')
          .inputFormat('lavfi')
          .duration(silenceSec)
          .outputOptions(['-ar', '44100', '-ac', '1'])
          .output('public/silence.mp3')
          .on('end', () => {
            // Now concat with re-encoding to fix format issues
            ffmpeg()
              .input('public/voiceover-part1.mp3')
              .input('public/silence.mp3')
              .input('public/voiceover-part2.mp3')
              .outputOptions(['-filter_complex', '[0:a][1:a][2:a]concat=n=3:v=0:a=1[out]', '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '128k'])
              .output(outputPath)
              .on('end', () => {
                // Cleanup
                ['public/voiceover-part1.mp3', 'public/voiceover-part2.mp3', 'public/silence.mp3'].forEach(f => {
                  try { fs.unlinkSync(f); } catch(e) {}
                });
                console.log('Done!', outputPath);
              })
              .on('error', (err) => console.error('Final concat error:', err))
              .run();
          })
          .on('error', (err) => console.error('Silence error:', err))
          .run();
      })
      .on('error', (err) => console.error('Part 2 error:', err))
      .run();
  })
  .on('error', (err) => console.error('Part 1 error:', err))
  .run();

import fs from 'fs';
