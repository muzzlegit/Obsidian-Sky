import type { Result } from '#/client/utils/result';
import type { Domain, DomainLayer, KingdomField } from '#/game/domain/game.public';

function exploreField(fieldId: KingdomField['id'], layer: DomainLayer): Result<Domain> {}
