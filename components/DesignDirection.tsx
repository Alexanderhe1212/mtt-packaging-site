"use client";
import {useEffect} from 'react';
export default function DesignDirection(){useEffect(()=>{document.documentElement.dataset.direction='colour';return()=>{delete document.documentElement.dataset.direction}},[]);return null}
