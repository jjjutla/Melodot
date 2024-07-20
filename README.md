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
- **Parachain:** Developed on a Substrate node based off the template with modifications to the [runtime] and [pallets]. This can be tested on Rococo by running multiple of these nodes and a collator.
- **Binary Tree:** Music files are recursively converted into a [binary tree] to organise the stems into their individual components.
- **Custom Music NFT Standard:** Defined using a [struct], a substrate pallet is used to handle the logic for creating and transferring them.
- **PolkadotJS API:** Is used to connect the frontend to the Parachain.
- **AI Generated Music:** Using Meta OSS AudioCraft Text-to-Music Model.
- **Similarity Analysis:** Comparing vectorised binary trees using Vector DB and similarity search.
- **OriginTrail Integration:** For decentralised storage that tracks the origin and updates of the AI music to generate unique music tracks.

### Demo
- [Demo v1 ](https://www.youtube.com/watch?v=1BiVWuq7SzI)(25 Jun 2023)
- Demo v2 (21 July 2024)

### Images

### Roadmap

### Attribution & Research
- [Towards an Open and Scalable Music Metadata Layer](https://arxiv.org/abs/1911.08278)
- [Simple and Controllable Music Generation](https://arxiv.org/pdf/2306.05284)
- [OriginTrail Whitepaper](https://origintrail.io/documents/OriginTrail_Ecosystem_White_Paper_2.0.pdf)

## Contributing & License
Help us build Melodot!. Melodot is an open-source software licensed under the [MIT License].

