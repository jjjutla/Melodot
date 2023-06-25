# Melodot

<img width="247" alt="icon-removebg-preview" src="https://github.com/jjjutla/Melodot/assets/22000925/ec29403e-395e-455e-ba00-dd230257d3fe">


## Inspiration:
Melodot was inspired by the story of Gregory Coleman the drummer in the group The Winstons who is famous for his 4 bar solo that has been sampled over a thousand times and featured in music from JayZ to the Futurama soundtrack. Sadly Gregory wasn't rewarded for his creative genius and died in 2006 homeless on the streets of Atlanta. 

Melodot is the solution to this horrible problem that aims to fractionalise a creators music into the individual beats, notes and syllables and protect the most atomic part of the music, and with the use of NFT's and smart contracts the rights to this intellectual property can be sold and transferred allowing for royalties and rewards to go to the original creator. 

A demo of the application - Click to watch:
This demo shows how u can upload a track to the Parachain and validate it with a proof of creation. It also allows for you to fractionalise your music into the individuals beats and protect the most atomic part of the music and with the use of NFT's and smart contracts the rights to this intellectual property can be sold and transferred allowing for royalties to be created with every transaction. 

[![Watch the video](https://img.youtube.com/vi/1BiVWuq7SzI/maxresdefault.jpg)](https://youtu.be/1BiVWuq7SzI)

------------
## Technicals![Uploading icon-removebg-preview.png…]()

- Parachain: As seen in the demo its developed on a substrrate node which can be mved to a parachain template and tested on Rococo by running multiple of these nodes and a collator 
- Security and Storage: All of these nodes are stored on web3storagr and the CryptoJS library is used to encrypto the files.
- Polkadotjs : API library is used to connect the front end to the parachain and allows for the interactions, uploading of files and NFT minting/transfering etc
	- Frontend: the fron end  is built using react and uses the wavesurfer-js libary so that the full track can be annotated.
	- Binary Tree: Once the creator has uploaded the file and the stems a recursive binary tree is used to organise the stems into their individual components - this is used but the react-d3-tree libary. (A self referencing binary treee is used to split into the individual coponents. At the micro level, a single beat, syllable, note or bass is a pieice of Intellectualt property worthy of protection. Melodot is designed to secure the creation of metadata behind every part of every song and provide encrypted file distribution to give creators full control over their music assets and include the audio fingerprint of every component as part of an open database.)_
