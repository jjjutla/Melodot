import "dotenv/config";
import DKG from "dkg.js";
import fs from "fs";
import { getEmbeddings } from "./helpers/vertex-ai-helper.js";

const yewmakerol = JSON.parse(fs.readFileSync("../utils/yewmakerol.json"));

const dkg = new DKG({
  endpoint: process.env.OT_NODE_HOSTNAME,
  blockchain: {
    name: "otp::testnet",
    publicKey: process.env.WALLET_PUBLIC_KEY,
    privateKey: process.env.WALLET_PRIVATE_KEY,
  },
});

(async () => {

  const creationResult = await dkg.asset.create(yewmakerol, { epochsNum: 5 });
  const { UAL } = creationResult.UAL;

  console.log(`Knowledge asset UAL: ${UAL}`);

  const data = [];
  const id = yewmakerol["@id"];
  for (const section of yewmakerol.sections) {
    for (const subsection of section.subsections) {
      data.push({
        ual:UAL,
        id,
        sectionTitle: section.title,
        subsectionTitle: subsection.title,
        body: subsection.body,
      });
    }
  }

  const allEmbeddings = {};

  for (let i = 0; i < data.length; i += 5) {
    const batch = data.slice(i, i + 5);
    const batchEmbeddings = await getEmbeddings(batch.map((item) => item.body));

    for (let j = 0; j < batchEmbeddings.length; j++) {
      allEmbeddings[i * 5 + j] = {
        metadata: batch[j],
        embedding: batchEmbeddings[j],
      };
    }
  }

  fs.writeFileSync(
    "./embeddings-and-metadata-map.json",
    JSON.stringify(allEmbeddings, null, 2)
  );
})();