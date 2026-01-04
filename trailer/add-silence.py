from pydub import AudioSegment

audio = AudioSegment.from_mp3("public/voiceover.mp3")
silence = AudioSegment.silent(duration=1000)  # 1 second

insert_point = 55000  # 55 seconds in milliseconds
audio = audio[:insert_point] + silence + audio[insert_point:]

audio.export("public/voiceover-with-pause.mp3", format="mp3")
print("Done! Saved to public/voiceover-with-pause.mp3")
