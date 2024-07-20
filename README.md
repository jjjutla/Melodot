<br />
    <img src="https://github.com/user-attachments/assets/7e6b3290-e34f-4bc5-942e-2f88d1a50f84" width="400" alt=""/>
<br />
</p>
<p align="center"><strong style="font-size: 24px;">Decentralised AI Generated Music.</strong></p>
<p align="center">
    <br />
    <a href="https://www.easya.io/">
        <img src="https://github.com/user-attachments/assets/09cfc307-f04f-4225-8c3b-bc96c47583a6" width="175" alt=""/></a>
    <br />
</p>
<p align="center">
    <a href="https://github.com/jjjutla/melodot/stargazers">
        <img src="https://img.shields.io/github/stars/jjjutla/melodot?style=social" alt="GitHub stars"/>
    </a>
</p>


---




## Inspiration:
Melodot was inspired by the story of [Gregory Coleman](https://en.wikipedia.org/wiki/Gregory_C._Coleman) the drummer in the group 'The Winstons' who is famous for his 4 bar solo that has been sampled over a thousand times and featured in music from JayZ to the Futurama soundtrack. Sadly Gregory wasn't rewarded for his creative genius and died in 2006 homeless on the streets of Atlanta. 

Melodot is the solution to this tragic problem that aims to fractionalise a creators music into the individual beats, notes and syllables to protect the most atomic part of the music, and with the use of the immutable timestamp of the blockchain, NFT's and smart contracts the rights to this Intellectual Property can be sold and transferred allowing for royalties and rewards to go to the original creator and help upcoming artists break into the industry.

## A demo of the application - Click to watch:
This demo shows how u can upload a track to the Parachain and validate it with a proof of creation. It also allows for you to fractionalise your music into the individuals beats and protect the most atomic part of the music and with the use of NFT's and smart contracts the rights to this intellectual property can be sold and transferred allowing for royalties to be created with every transaction. 

[![Watch the video](https://img.youtube.com/vi/1BiVWuq7SzI/maxresdefault.jpg)](https://youtu.be/1BiVWuq7SzI)

------------
## Technicals

- Parachain: As seen in the demo its developed on a Substrate node based off the [template](https://github.com/substrate-developer-hub/substrate-node-template) with modications to the [runtime](https://github.com/jjjutla/Melodot/blob/main/runtime/src/lib.rs) and [pallets](https://github.com/jjjutla/Melodot/blob/main/pallets/template/src/lib.rs). This can be moved to a Parachain template and tested on Rococo by running multiple of these nodes and a collator.
- Security and Storage: All of these nodes are stored on [Web3storage](https://web3.storage) and the [CryptoJS](https://cryptojs.gitbook.io/docs/) library is used to encrypto the files.
- [PolkadotJS API Library](https://polkadot.js.org/docs/): Is used to connect the frontend to the Parachain and allows for the interactions, uploading of files and NFT minting/transfering etc. The frontend is based off the [Substrate](https://github.com/substrate-developer-hub/substrate-front-end-template) frontend template using React and uses the [WavesurferJS](https://www.npmjs.com/package/wavesurfer.js?activeTab=readme) libary so that the full track can be annotated.
- Binary Tree: Once the creator has uploaded the file and stems a Recursive [Binary Tree](https://github.com/jjjutla/Melodot/blob/722b2f91e66493f05ec3fc55c5230aa7b977ed1d/src/utils/binaryTreeGenerator.ts#L5) is used to organise the stems into their individual components this is done by the [ReactD3Tree](https://www.npmjs.com/package/react-d3-tree) Libary.
- NFT: As Substrate does not have a predefined [NFT standard](https://github.com/paritytech/substrate/tree/master/frame/nfts) so the structure of the NFT is defined using a struct. A substrate pallet is used to handle the logic for creating and transferring the NFTs and a mint and transfer function is used to control them.

At the micro level, a single beat, syllable, note or bass is a pieice of Intellectual property worthy of protection. Melodot is designed to secure the creation of metadata behind every part of every song and provide encrypted file distribution to give creators full control over their music assets and include the audio fingerprint of every component as part of a decentralised network.





