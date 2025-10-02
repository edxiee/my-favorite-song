// src/app/home/home.page.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import type { RangeCustomEvent } from '@ionic/angular'; // for ion-range event typing

type Song = {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  src: string; // audio source
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  song: Song = {
    title: 'Multo',
    artist: 'Cup of Joe',
    album: 'Silakbo',
    coverUrl: 'assets/img/cover.jpg',
    src: 'assets/audio/song.mp3',
  };

  lyrics = `Humingang malalim, pumikit na muna
  At baka-sakaling namamalikmata lang
  Ba't nababahala? 'Di ba't ako'y mag-isa?
  'Kala ko'y payapa, boses mo'y tumatawag pa
  Binaon naman na ang lahat
  Tinakpan naman na 'king sugat
  Ngunit ba't ba andito pa rin?
  Hirap na 'kong intindihin
  Tanging panalangin, lubayan na sana
  Dahil sa bawat tingin, mukha mo'y nakikita
  Kahit sa'n man mapunta ay anino mo'y kumakapit sa 'king kamay
  Ako ay dahan-dahang nililibing nang buhay pa
  Hindi na makalaya
  Dinadalaw mo 'ko bawat gabi
  Wala mang nakikita
  Haplos mo'y ramdam pa rin sa dilim
  Hindi na nananaginip
  Hindi na ma-makagising
  Pasindi na ng ilaw
  Minumulto na 'ko ng damdamin ko
  Ng damdamin ko
  Hindi mo ba ako lilisanin?
  Hindi pa ba sapat pagpapahirap sa 'kin? (Damdamin ko)
  Hindi na ba ma-mamamayapa?
  Hindi na ba ma-mamamayapa?
  Hindi na makalaya
  Dinadalaw mo 'ko bawat gabi
  Wala mang nakikita
  Haplos mo'y ramdam pa rin sa dilim
  Hindi na nananaginip
  Hindi na ma-makagising
  Pasindi na ng ilaw
  Minumulto na 'ko ng damdamin ko
  Ng damdamin ko
  Hindi mo ba ako lilisanin? (Makalaya)
  (Dinadalaw mo 'ko bawat gabi) hindi pa ba sapat pagpapahirap sa 'kin?
  (Wala mang nakikita) hindi na ba ma-mamamayapa?
  (Haplos mo'y ramdam pa rin sa dilim) hindi na ba ma-mamamayapa?`;

  private audio?: HTMLAudioElement;
  isPlaying = false;
  duration = 0;
  currentTime = 0;

  ngOnInit(): void {
    this.audio = new Audio(this.song.src);
    this.audio.preload = 'metadata';

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = Math.floor(this.audio?.duration ?? 0);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.audio?.currentTime ?? 0);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentTime = 0;
    });
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audio?.removeAttribute('src');
    this.audio?.load();
  }

  togglePlay(): void {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  // Handle ion-range change event safely
  seekTo(ev: Event): void {
    if (!this.audio || !this.duration) return;

    const value = (ev as RangeCustomEvent).detail.value;
    const n =
      typeof value === 'number'
        ? value
        : (value?.lower ?? value?.upper ?? this.currentTime);

    this.audio.currentTime = n;
    this.currentTime = n;
  }

  skip(sec: number): void {
    if (!this.audio) return;
    const next = Math.min(Math.max(this.audio.currentTime + sec, 0), this.duration || 0);
    this.audio.currentTime = next;
  }

  formatTime(totalSeconds: number | null | undefined): string {
    const s = Math.max(0, Math.floor(totalSeconds ?? 0));
    const mPart = Math.floor(s / 60);
    const sPart = s % 60;
    return `${mPart}:${sPart.toString().padStart(2, '0')}`;
  }
}
