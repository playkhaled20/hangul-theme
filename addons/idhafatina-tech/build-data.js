#!/usr/bin/env node
// Regenerates src/assets/js/obsidian/addons-data.js from tech-data.json (run from the theme root or from this folder).
const fs=require('fs'),p=require('path');
const src=p.join(__dirname,'tech-data.json'),dst=p.join(__dirname,'..','..','src','assets','js','obsidian','addons-data.js');
const d=JSON.parse(fs.readFileSync(src,'utf8'));
fs.writeFileSync(dst,'/* Generated from addons/idhafatina-tech/tech-data.json — edit the JSON, then run: node addons/idhafatina-tech/build-data.js */\nexport default '+JSON.stringify(d)+';\n');
console.log('wrote',dst,Object.keys(d).length,'types');
