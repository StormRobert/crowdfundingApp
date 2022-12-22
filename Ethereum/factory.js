import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x616661A638B7acc161BF8cC43597940ecf7f83cB"
);

export default instance;
