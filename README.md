<p align="center">
<br />
    <img src="https://github.com/user-attachments/assets/7e6b3290-e34f-4bc5-942e-2f88d1a50f84" width="400" alt=""/>
<br />
</p>
<p align="center"><strong style="font-size: 24px;">Decentralised AI Generated Music.</strong></p>
<p align="center" style="display: flex; justify-content: center; align-items: center;">
    <span style="display: inline-flex; align-items: center; background-color: #1c1c1c; padding: 5px; border-radius: 6px;">
        <img src="https://img.shields.io/github/stars/jjjutla/melodot?style=social" alt="GitHub stars"/>
        <span style="margin: 0 10px; color: white; font-size: 14px;"></span>
        <a href="https://www.easya.io/">
            <img src="https://github.com/user-attachments/assets/09cfc307-f04f-4225-8c3b-bc96c47583a6" alt="EasyA" style="height: 21px;"/>
        </a>
    </span>
</p>

---

### What is Melodot?
Melodot is a decentralized application designed to solve music copyright issues and protect artists' intellectual property. It fractionalizes music into individual beats, notes, and syllables, converting them into NFTs to ensure proper usage and enable royalty payments. Melodot also empowers artists to create truly royalty-free AI-generated music and verify its originality. By using a binary tree structure to break down music assets and employing Meta OSS AudioCraft for AI music generation, the platform conducts similarity analysis with Vector DB. Additionally, Melodot integrates OriginTrail for decentralized storage and provenance tracking, providing a robust solution for managing and safeguarding music rights in the digital era.

### Features
- **Parachain:** Developed on a Substrate node based off the template with modifications to the [runtime](https://github.com/jjjutla/melodot/blob/main/backend/runtime/src/lib.rs) and [pallets](https://github.com/jjjutla/melodot/blob/main/backend/pallets/src/lib.rs). This can be tested on Rococo by running multiple of these nodes and a collator.
- **Binary Tree:** Music files are recursively converted into a [binary tree](https://github.com/jjjutla/melodot/blob/main/frontend/src/utils/binaryTreeGen.ts) to organise the stems into their individual components.
- **Custom Music NFT Standard:** Defined using a struct, a substrate pallet is used to handle the logic for creating and transferring them.
- **PolkadotJS API:** Is used to connect the frontend to the Parachain.
- **AI Generated Music:** Using Meta OSS AudioCraft Text-to-Music Model.
- **Similarity Analysis:** Comparing vectorised binary trees using Vector DB and similarity search.
- **OriginTrail Integration:** For decentralised storage that tracks the origin and updates of the AI music to generate unique music tracks.

![TechnicalArch](https://github.com/user-attachments/assets/97d516fb-e2ee-4e63-8dd1-031e3a98c1af)


### Demo
- [Demo v1 ](https://www.youtube.com/watch?v=1BiVWuq7SzI)(25 Jun 2023)
- [Demo v2](https://youtu.be/hxdMcE9n4cY) (21 July 2024) 

### Images
<img width="1512" alt="img1" src="https://github.com/user-attachments/assets/37c94ec1-5d0e-444d-889a-b66ee9043805">
<img width="1512" alt="img2" src="https://github.com/user-attachments/assets/825331ff-a0a8-4b42-a55c-92ead9d8735c">
<img width="1511" alt="img3" src="https://github.com/user-attachments/assets/8d5ac7a6-026d-4dec-bf24-4909bcfae450">
<img width="1512" alt="img4" src="https://github.com/user-attachments/assets/6ccf153a-d841-4803-a8e2-22b77b1fd419">
<img width="1512" alt="img5" src="https://github.com/user-attachments/assets/4f4b0a4e-36b6-400a-bc2b-dd2540470729">


### Roadmap

- [x] Develop Metadata Layer and Parachain for Artists to Upload Music Assets
- [x] Implement Binary Tree structure for music asset organization
- [x] Create custom NFT standard using Substrate Pallet
- [x] Integrate PolkadotJS API for frontend-parachain connection
- [x] Integrate Meta OSS AudioCraft for AI Music Generation
- [x] Develop similarity analysis system using Vector DB
- [x] Implement OriginTrail integration for decentralized storage and provenance tracking
- [x] Create beta version of the expanded Melodot platform
- [ ] Expand music database by integrating with MusicBrainz API
- [ ] Improve audio fingerprinting system, potentially integrating AcoustID
- [ ] Enhance AI Music Generation to include vocals
- [ ] Implement cover art generation feature using AI
- [ ] Implement ERC-3643 token for artist-fan interactions and rewards
- [ ] Integration with music streaming service and royalty payments
- [ ] Create private rights layer for confidential and commercial songs using XCM/encryption


### Attribution & Research
- [Towards an Open and Scalable Music Metadata Layer](https://arxiv.org/abs/1911.08278)
- [Simple and Controllable Music Generation](https://arxiv.org/pdf/2306.05284)
- [OriginTrail Whitepaper](https://origintrail.io/documents/OriginTrail_Ecosystem_White_Paper_2.0.pdf)

## Contributing & License
Help us build Melodot! Melodot is an open-source software licensed under the [MIT License].

