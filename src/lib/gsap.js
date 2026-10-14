'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { DURATION, EASE } from './motion-tokens'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP)
CustomEase.create('expo.inout.custom', '0.87,0,0.13,1')
CustomEase.create('out.soft', '0.22,1,0.36,1')
gsap.defaults({ ease: EASE.enter, duration: DURATION.md })

export { gsap, ScrollTrigger, SplitText, useGSAP }
