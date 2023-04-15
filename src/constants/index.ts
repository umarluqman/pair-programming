import truncateAddress from "truncate-eth-address";

export const validatorOptions = [
  {
    id: 1,
    name: truncateAddress("0x76A4161f6539800093640a8964ECa86EFB9bB674"),
    fullAddress: "0x76A4161f6539800093640a8964ECa86EFB9bB674",
  },
  {
    id: 2,
    name: truncateAddress("0xf50a677aE07315089Ec1b5a929beE3E44ceab1fb"),
    fullAddress: "0xf50a677aE07315089Ec1b5a929beE3E44ceab1fb",
  },
];

export const alertOptions = [
  { id: 1, name: "Alert 1" },
  { id: 2, name: "Alert 2" },
  { id: 3, name: "Alert 3" },
  { id: 4, name: "Alert 4" },
];

export const channelOptions = [
  { id: 1, name: "Channel 1" },
  { id: 2, name: "Channel 2" },
  { id: 2, name: "Channel 3" },
  { id: 2, name: "Channel 4" },
];
