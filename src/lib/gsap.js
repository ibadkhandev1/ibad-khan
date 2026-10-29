'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { useGSAP } from '@gsap/react'
import { DURATION, EASE } from './motion-tokens'

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  CustomEase,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  Physics2DPlugin,
  useGSAP,
)
// snap.out: fast attack, a hair of overshoot, settles flat — a sticker pressed down.
CustomEase.create('snap.out', 'M0,0 C0.12,0.72 0.2,1.06 0.42,1.03 0.62,1 0.8,1 1,1')
// snap.inout: holds, then commits hard — used for route tiles and the menu.
CustomEase.create('snap.inout', '0.76,0,0.18,1')
gsap.defaults({ ease: EASE.enter, duration: DURATION.md })

export { gsap, ScrollTrigger, SplitText, useGSAP }
