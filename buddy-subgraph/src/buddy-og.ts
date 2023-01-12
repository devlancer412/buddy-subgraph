import { BigInt, ipfs, Bytes, json, Address } from '@graphprotocol/graph-ts';
import {
  DiamondInject as DiamondInjectEvent,
  DiamondReject as DiamondRejectEvent,
  Transfer as TransferEvent,
  UpdatedAttribute as UpdatedAttributeEvent,
} from '../generated/BuddyOG/Buddy';
import { Buddy, Diamond, DiamondSlot } from '../generated/schema';
import { BuddyAttributes, ogIPFSHash } from './constants';

function getOrCreateOGBuddy(id: BigInt): Buddy {
  let entity = Buddy.load('OG' + '-' + id.toString());

  if (!entity) {
    entity = new Buddy('OG' + '-' + id.toString());

    entity.level = BigInt.zero();
    entity.skillScore = BigInt.zero();
    entity.mints = BigInt.zero();

    entity.additionalXRCSGains = 0;
    entity.additionalLuck = 0;
    entity.additionalRecovery = 0;

    entity.upperStrength = BigInt.zero();
    entity.lowerStrength = BigInt.zero();
    entity.coreStrength = BigInt.zero();
    entity.owner = Address.zero().toHexString();

    const path = ogIPFSHash + '/' + id.toString() + '.json';
    let data: Bytes | null = null;
    do {
      data = ipfs.cat(path);
    } while (!data);

    const jsonData = json.fromBytes(data).toObject();
    entity.imageUrl = jsonData.get('image')?.toString() ?? null;

    const traits = jsonData.get('attributes')?.toArray() ?? [];
    for (let i = 0; i < traits.length; i++) {
      switch (
        traits[i]
          .toObject()
          .get('trait_type')
          ?.toString()
      ) {
        case 'XRCS Gains':
          entity.baseXRCSGains =
            traits[i]
              .toObject()
              .get('value')
              ?.toU64() ?? 0;
          break;
        case 'Luck':
          entity.baseLuck =
            traits[i]
              .toObject()
              .get('value')
              ?.toU64() ?? 0;
          break;
        case 'Recovery':
          entity.baseRecovery =
            traits[i]
              .toObject()
              .get('value')
              ?.toU64() ?? 0;
          break;
        case 'Background':
          entity.background =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Skin':
          entity.skin =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Shirt':
          entity.shirt =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Pants':
          entity.pants =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Socks':
          entity.socks =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Shoes':
          entity.shoes =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Hair':
          entity.hair =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Eyes':
          entity.eyes =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Beard':
          entity.beard =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          break;
        case 'Class':
          const className =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          switch (className) {
            case 'Athlete':
              entity.type = 'OGA';
              entity.name = 'OG Athlete #' + id.toString();
              break;
            case 'Champion':
              entity.type = 'OGC';
              entity.name = 'OG Champion #' + id.toString();
              break;
            case 'Olympian':
              entity.type = 'OGO';
              entity.name = 'OG Olympian #' + id.toString();
              break;
            default:
              entity.type = 'OGR';
              entity.name = 'OG Rookie #' + id.toString();
              break;
          }
          break;
        case 'Diamond Slot 1':
          let slotType =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          let slotEntity = new DiamondSlot(id.toString() + '-1');
          slotEntity.slotId = 1;
          slotEntity.buddy = entity.id;
          switch (slotType) {
            case 'Beast Mode':
              slotEntity.type = 'BMDS';
              break;
            case 'Rep Enhancer':
              slotEntity.type = 'REDS';
              break;
            case 'Booster':
              slotEntity.type = 'BDS';
              break;
            case 'Base Attribute':
              slotEntity.type = 'BADS';
              break;
            default:
              slotEntity.type = 'INVALID';
              break;
          }
          slotEntity.save();
          break;
        case 'Diamond Slot 2':
          slotType =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          slotEntity = new DiamondSlot(id.toString() + '-2');
          slotEntity.slotId = 2;
          slotEntity.buddy = entity.id;
          switch (slotType) {
            case 'Beast Mode':
              slotEntity.type = 'BMDS';
              break;
            case 'Rep Enhancer':
              slotEntity.type = 'REDS';
              break;
            case 'Booster':
              slotEntity.type = 'BDS';
              break;
            case 'Base Attribute':
              slotEntity.type = 'BADS';
              break;
            default:
              slotEntity.type = 'INVALID';
              break;
          }
          slotEntity.save();
          break;
        case 'Diamond Slot 3':
          slotType =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          slotEntity = new DiamondSlot(id.toString() + '-3');
          slotEntity.slotId = 3;
          slotEntity.buddy = entity.id;
          switch (slotType) {
            case 'Beast Mode':
              slotEntity.type = 'BMDS';
              break;
            case 'Rep Enhancer':
              slotEntity.type = 'REDS';
              break;
            case 'Booster':
              slotEntity.type = 'BDS';
              break;
            case 'Base Attribute':
              slotEntity.type = 'BADS';
              break;
            default:
              slotEntity.type = 'INVALID';
              break;
          }
          slotEntity.save();
          break;
        case 'Diamond Slot 4':
          slotType =
            traits[i]
              .toObject()
              .get('value')
              ?.toString() ?? '';
          slotEntity = new DiamondSlot(id.toString() + '-4');
          slotEntity.slotId = 4;
          slotEntity.buddy = entity.id;
          switch (slotType) {
            case 'Beast Mode':
              slotEntity.type = 'BMDS';
              break;
            case 'Rep Enhancer':
              slotEntity.type = 'REDS';
              break;
            case 'Booster':
              slotEntity.type = 'BDS';
              break;
            case 'Base Attribute':
              slotEntity.type = 'BADS';
              break;
            default:
              slotEntity.type = 'INVALID';
              break;
          }
          slotEntity.save();
          break;
        default:
          break;
      }
    }

    entity.save();
  }

  return entity;
}

export function handleDiamondInject(event: DiamondInjectEvent): void {
  let slot = DiamondSlot.load(
    event.params.buddyId.toString() + '-' + event.params.slotId.toString()
  );
  if (!slot) {
    return;
  }

  slot.diamond = event.params.diamondId.toString();
  slot.save();
}

export function handleDiamondReject(event: DiamondRejectEvent): void {
  let slot = DiamondSlot.load(
    event.params.buddyId.toString() + '-' + event.params.slotId.toString()
  );
  if (!slot) {
    return;
  }

  slot.diamond = null;
  slot.save();
}

export function handleTransfer(event: TransferEvent): void {
  let buddy = getOrCreateOGBuddy(event.params.tokenId);

  buddy.owner = event.params.to.toHexString();
  buddy.save();
}

export function handleUpdatedAttribute(event: UpdatedAttributeEvent): void {
  let buddy = getOrCreateOGBuddy(event.params.tokenId);

  switch (event.params.attribute) {
    case BuddyAttributes.Level:
      buddy.level = event.params.value;
      break;
    case BuddyAttributes.SkillScore:
      buddy.skillScore = event.params.value;
      break;
    case BuddyAttributes.Mints:
      buddy.mints = event.params.value;
      break;
    case BuddyAttributes.XRCSGains:
      buddy.additionalXRCSGains = event.params.value.toU64();
      break;
    case BuddyAttributes.Luck:
      buddy.additionalLuck = event.params.value.toU64();
      break;
    case BuddyAttributes.Recovery:
      buddy.additionalRecovery = event.params.value.toU64();
      break;
    case BuddyAttributes.UpperBodyStrength:
      buddy.upperStrength = event.params.value;
      break;
    case BuddyAttributes.LowerBodyStrength:
      buddy.lowerStrength = event.params.value;
      break;
    case BuddyAttributes.CoreStrength:
      buddy.coreStrength = event.params.value;
      break;
    default:
      break;
  }

  buddy.save();
}
